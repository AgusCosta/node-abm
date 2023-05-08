# node-challenge

The API will create an admin user on first start up.

The GET user list endpoint is not authentication required => GET http://localhost:3000/user

The POST/PUT to create and update user are protected

# Authentication => POST http://localhost:3000/auth with

{
    "username": "admin",
    "password": "adminPass123"
}

RESPONSE => { token: "jwt-token" } 

To create and edit users add to the request headers => "authentication" : "jwt-token"

# CREATE a new user POST http://localhost:3000/user

{
		firstName: string,
		lastName: string,
		address: string,
		profilePic: File (allowed files type .JPG .JPEG)
}

# EDIT a new user POST http://localhost:3000/user

Simply add the _id parameter of a created user to the create body, if the user exists it will be updated.
