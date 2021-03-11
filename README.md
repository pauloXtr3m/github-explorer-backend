# Github Explorer backend
Backend of Github Explorer application

## Routes
###`POST /notes`
Create a note

Body params:
```
{
    user_id: string;
    content: string;
}
```

###`GET /notes/:user_id`
Get a list of notes created in that github `user_id`

## Setup

### Create docker container to run mongoDB
This project uses MongoDB to store the notes created in application

```docker run --name mongodb -p 27017:27017 -d -t mongo```

### Create redis container
This project uses Redis to cache requests

```docker run --name redis -p 6379:6379 -d -t redis```

### Environment

Rename `.env.example` file to `.env`.

### Setup orm

Rename the file `ormconfig.example.json` to `ormconfig.json`.

If you have created your databases with another configuration, you have to update this file. 

### Download dependencies

```yarn install```

### Run

```yarn dev:server```