# Todo Angular v4

This is a simple front-end for a todo app developed in .NET Core along side Identity Server 4. It has authorization and authentication with link guards along with simple CRUD operations.


# Features

  - Using authentication token generated from Identity Server 4 for authorization
  - Using link guards to protect components that requrire authorization
  - Adding Todo list items using user id from claims in token.
  - CRUD operations for todo list.

### Installation

Look at the angular official guide first, as this one doesn't deviate much from it and is meant for beginners as a simple boilerplate.

First: download the .NET Core project titled "TodoCore" from the following 
link: https://github.com/TamirHAhmed/TodoCore

Second: Using command system, navigate to the folders of "TodoCore" and "TodoAPI", and in each one run the command:
```
dotnet run <app name>
```
after that just do a 

```
npm start
```

on this project, and everything should work as expected.

### Notes

This is meant only for demonstration purposes and as a simple boilerplate for beginners to use, do not use this code for production.

Please check damienbod's github for more complete examples on this subject:
https://github.com/damienbod/AspNet5IdentityServerAngularImplicitFlow



### Projects connected to this one

Todo Core:
Asp.net core web api + identity server projects that serves as backend and authorization server respectively.

link: https://github.com/TamirHAhmed/TodoCore

Todo Angular:
Front end for the todo app using angular v4
link: https://github.com/TamirHAhmed/TodoAngular

Todo React Native (Coming soon):
Cross platform mobile app using react native - redux - redux persists.

#### Contribute

Everyone are welcome to contribute this simple boilerplate to have the basics of security integrated with authentication/authorization tokens.
