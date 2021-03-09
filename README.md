# Github Explorer backend
Backend of Github Explorer application

## Setup

### Create docker container to run mongoDB
This project uses MongoDB to store the notes created in application

```docker run --name mongodb -p 27017:27017 -d -t mongo```

### Create redis container
This project uses Redis as cache

```docker run --name redis -p 6379:6379 -d -t redis```

### Download dependencies

```yarn install```

### Setup orm

Rename the file `ormconfig.example.json` to `ormconfig.json`.

If you created your databases with another configuration, you have to update this file. 

### Run

```yarn dev:server```