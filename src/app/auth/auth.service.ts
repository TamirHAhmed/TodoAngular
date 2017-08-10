import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {

    private _isAuthorized: boolean;
    public HasAdminRole: boolean;
    public UserData: any;

    private actionUrl: string;
    public headers: Headers;
    private storage: any;


    constructor(private _http: Http,  private _router: Router) {

        this.actionUrl =  'http://localhost:5001/api/Todo';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.storage = sessionStorage; //localStorage;

        if (this.retrieve('_isAuthorized') !== '') {
            this._isAuthorized = this.retrieve('_isAuthorized');
        }
    }

    public IsAuthorized(): boolean {
        if (this._isAuthorized) {
            if (this.isTokenExpired('authorizationDataIdToken')) {
                console.log('IsAuthorized: isTokenExpired');
                this.ResetAuthorizationData();
                return false;
            }

            return true;
        }

        return false;
    }



    public GetTokenAccess(): any {
        return this.retrieve('authorizationData');
    }

    public ResetAuthorizationData() {
        this.store('authorizationData', '');
        this.store('authorizationDataIdToken', '');

        this._isAuthorized = false;
        this.HasAdminRole = false;
        this.store('_isAuthorized', false);
    }

    public SetAuthorizationData(token: any, id_token: any) {
        if (this.retrieve('authorizationData') !== '') {
            this.store('authorizationData', '');
        }

        var date = new Date();
        var numberOfDaysToAdd = 10;
        date.setDate(date.getDate() + numberOfDaysToAdd);

        this.store('authorizationData', token);
        this.store('authorizationDataIdToken', id_token);
        this._isAuthorized = true;
        this.store('_isAuthorized', true);

        this.getUserData()
            .subscribe(data => {
                this.UserData = data;
            });
    }

    public Authorize() {
        this.ResetAuthorizationData();

        console.log('BEGIN Authorize, no auth data');
        let nonce = 'N' + Math.random() + '' + Date.now();
        let state = Date.now() + '' + Math.random();

        let authorizationUrl = 'http://localhost:5000/connect/authorize';
        let redirect_uri = 'http://localhost:3000';
        let client_id = 'angular.client';
        let response_type = 'id_token token';
        let scope = 'openid profile data';
        this.store('authStateControl', state);
        this.store('authNonce', nonce);

        let url =
            authorizationUrl + '?' +
            'response_type=' + encodeURI(response_type) + '&' +
            'client_id=' + encodeURI(client_id) + '&' +
            'redirect_uri=' + encodeURI(redirect_uri) + '&' +
            'scope=' + encodeURI(scope)
            + '&' +
            'nonce=' + encodeURI(nonce) + '&' +
            'state=' + encodeURI(state);

        window.location.href = url;
    }

    public AuthorizedCallback() {
        console.log('BEGIN AuthorizedCallback, no auth data');
        this.ResetAuthorizationData();

        //retrieve object from hash, id_token, access token, etc...
        let hash = window.location.hash.substr(1);
        let result: any = hash.split('&').reduce(function (result: any, item: string) {
            let parts = item.split('=');
            result[parts[0]] = parts[1];
            return result;
        }, {});

        let token = '';
        let id_token = '';
        let authResponseIsValid = false;
        if (!result.error) {

            if (result.state !== this.retrieve('authStateControl')) {
                console.log('AuthorizedCallback incorrect state');
            } else {

                token = result.access_token;
                id_token = result.id_token;

                this.store('authorizationData', token);

                let dataIdToken: any = this.getDataFromToken(id_token);

                // validate nonce
                if (dataIdToken.nonce !== this.retrieve('authNonce')) {
                    console.log('AuthorizedCallback incorrect nonce');
                } else {
                    this.store('authNonce', '');
                    this.store('authStateControl', '');

                    authResponseIsValid = true;
                    console.log('AuthorizedCallback state and nonce validated, returning access token');
                }
            }
        }

        if (authResponseIsValid) {
            this.SetAuthorizationData(token, id_token);
            this._router.navigate(['/dashboard']);
        } else {
            this.ResetAuthorizationData();
            this._router.navigate(['/forbidden']);
        }
    }

    public Logoff() {
        let authorizationUrl = 'http://localhost:5000/connect/endsession';
        let post_logout_redirect_uri = 'http://localhost:3000';
        let id_token_hint = this.retrieve('authorizationDataIdToken');

        let url =
            authorizationUrl + '?' +
            'id_token_hint=' + encodeURI(id_token_hint) + '&' +
            'post_logout_redirect_uri=' + encodeURI(post_logout_redirect_uri);

        this.ResetAuthorizationData();

        window.location.href = url;
    }

    public HandleError(error: any) {
        console.log(error);
        if (error.status == 403) {
            this._router.navigate(['/Forbidden']);
        } else if (error.status == 401) {
            this.ResetAuthorizationData();
            this._router.navigate(['/Forbidden']);
        }
    }

    private isTokenExpired(token: string, offsetSeconds?: number): boolean {
        let tokenExpirationDate = this.getTokenExpirationDate(token);
        offsetSeconds = offsetSeconds || 0;

        if (tokenExpirationDate == null) {
            return false;
        }

        // Token expired?
        return !(tokenExpirationDate.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)));
    }

    private getTokenExpirationDate(token: string): Date {
        let decoded: any;
        decoded = this.getDataFromToken(this.retrieve(token));

        if (!decoded.hasOwnProperty('exp')) {
            return null;
        }

        let date = new Date(0); // The 0 here is the key, which sets the date to the epoch
        date.setUTCSeconds(decoded.exp);

        return date;
    }

    private urlBase64Decode(str: string) {
        let output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }

        return window.atob(output);
    }

    private getDataFromToken(token: any) {
        let data = {};
        if (typeof token !== 'undefined') {
            let encoded = token.split('.')[1];
            data = JSON.parse(this.urlBase64Decode(encoded));
        }

        return data;
    }

    private retrieve(key: string): any {
        let item = this.storage.getItem(key);

        if (item && item !== 'undefined') {
            return JSON.parse(this.storage.getItem(key));
        }

        return;
    }

    private store(key: string, value: any) {
        this.storage.setItem(key, JSON.stringify(value));
    }

    public getUserData = (): Observable<string[]> => {
        this.setHeaders();
        return this._http.get('http://localhost:5000/connect/userinfo', {
            headers: this.headers,
            body: ''
        }).map(res => {
            return res.json();
        });
    }

    public setHeaders() {

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        let token = this.GetTokenAccess();

        if (token !== '') {
            this.headers.append('Authorization', 'Bearer ' + token);
            return this.headers;
        }

        return null;
    }
}