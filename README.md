# Stuart - API 

![Infrastructure diagram](assets/1-stuart-api-infrastructure.jpg)

This README.md file shows step by step how to install and run The Stuart API.

## Stack:

- Apollo Server
- GraphQL
- Node.js
- MongoDB
- Docker
- Docker Compose 

## Requirements:

There are two (2) different methods to install and run this app:

  1. **Docker way:** Using Docker pre-built images with docker-compose (**recommended, more quick, straightforward and less painful)
  2. **Localhost way:** Bare metal install, first you should to install and set-up all the stack on your  host (Node.js, npm, MongoDB, dependencies) before to being able to run the API.

## Instalation method #1  - Docker way: 

### Server requirements for method 1 (docker way):

You should first install

- Docker >= 19.03.12
- Docker-compose >= 1.26.2

### Cloning the repository from Github:

```
# git clone https://github.com/lacroixDj/stuart-api.git
# cd stuart-api/
```
### App & .Env Setup (Docker way):

We need proceed to configure our ENV variables in order to connect the app with our  MongoDB **STUART-API-DB**:

- Use .env.example  template file as starting point, the app works well with the defaults values provided, with some exceptions

```
# cp .env.example .env 
```

### Build & Run docker services containers

If you have already the docker environment installed and running, and also you have cloned the repo, run the following commands inside the project folder:

```
# sudo docker-compose up --build -d db_mongo api_graphql 
```

Wait until the build process get completed.
Once the build images has been completed, then containers will run in detached (-d) mode.

If everything is OK, at the end you should see an output similar tho this:

```
...
> Creating network "stuart-api_apinetwork" with driver "bridge"
> Creating stuart-api_db_mongo_1 ... done
> Creating stuart-api_api_graphql_1 ... done
```

That's it! ;) pretty easy... Isn't it? (that's the reason people love docker) 

If you succeed in the docker way, then skip the following steps and jump over the usage instructions - Yes! Skip and Take me to [Using the API](#Using the API):

## Instalation method #1  - Localhost way: 

### Server requirements for method 2 (directly in your host):

You must install:

- Node.js ^12.xx.xx (LTS version)
- npm ^6.xx.xx (LTS version including with node)
- MongoDB ^4.xx.xx  (LTS Community version)

### Setup and enabling Authentication on MongoDB:

Once you have installed all the required environment, we must secure MongoDB connection, following the next steps:

- Connect to your **MongoDB** instance:
```
$ mongo --host localhost --port 27017 
```

- Switch to the **admin** Database:
```
> use admin; 
```

- Create the user administrator, lets call him **root**. 
- Change example **pwd** by your own secure password or leave it as it by default.
- Save the credential in a secure place. 
```
> db.createUser(
  {
    user: "root",
    pwd: "myR0o7sUp3rS3CUreP4ssW0rd.",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
  }
)
```

- Shut down the **mongod** instance. For example, from the mongo shell, run the following command:
```
> db.adminCommand( { shutdown: 1 } ) 
```

- Disconnect from the mongo shell, you can also pess **(CTRL+D)** or **(CTRL+C)**:
```
> exit 
```

- Re-start the **MongoDB** instance with access control:
- **Troubleshooting:** in some cases you must run the command  as sudo or administrator.
```
$ mongod --auth --port 27017  --dbpath "<path to data directory>" 
```

- Connect and authenticate as the user administrator **root**:
- Enter the **root** password when prompted (or your own password if you have changed it): **myR0o7sUp3rS3CUreP4ssW0rd** 
```
$ mongo --port 27017 -u "root" --authenticationDatabase "admin" -p 
```

- Create limited user **"stuart_db_user"** needed for **"STUART-API-DB"** database. 
- Change example **"xyz123"** by your own secure password or leave it as it by default. 
- Take note of this password because we will use it later.
```
> use API-CRM-DB
> db.createUser(
  {
    user: "stuart_db_user",
    pwd: "xyz123",
    roles: [ { role: "readWrite", db: "STUART-API-DB" }]
  }
) 
```
- After creating the **stuart_db_user**, disconnect from the mongo shell.

- Test the new created user by connecting and authenticate as **stuart_db_user**:
- Enter the **stuart_db_user** password when prompted (or your own password if you have changed it): **xyz123**
```
$ mongo --port 27017 -u "stuart_db_user" --authenticationDatabase "STUART-API-DB" -p
```

- Let's insert a test document as **stuart_db_user**:
```
> use STUART-API-DB
> db.test.insert( { msg: "hello world"} )
```
- If everything went **OK**, you should see the following message:
```
> WriteResult({ "nInserted" : 1 })
```
- **Great!** We have done with the intial **MongoDB** setup, you can disconnect from the mongo shell.

### Cloning the repository from Github:

```
# git clone https://github.com/lacroixDj/stuart-api.git
# cd stuart-api/
```

### App & .Env Setup (Localhost way):

We need proceed to configure our ENV variables in order to connect the app with our  MongoDB **STUART-API-DB**:

- Use .env.example  template file as starting point, teh app works well with the defaults values provided, with some exceptions

```
# cp .env.example .env 
```

- Due we are running the app withour Docker Change the value **DOCKER_SETUP=true** to -> **DOCKER_SETUP=false**

- You also will need  to change the value of **MONGO_HOST=db_mongo** to -> **MONGO_HOST=localhost** 

Now we need to install  the app dependecies using **npm install**:

```
# cd api-graphql/
# npm install 
```

Once the app is installed lets run our API ;)! 

```
# npm start 
```
#
# Using the API:

Whatever the installation method was chosen if everything went **OK**  then we could be able to explore our API

## GraphQL Playground (API Explorer):

### Features

- Syntax highlighting.
- Intelligent type ahead of fields, arguments, types, and more.
- Real-time error highlighting and reporting for queries and variables.
- Automatic query and variables completion.
- Automatically adds required fields to queries.
- Documentation explorer, search, with markdown support.
- Query History using local storage
- Run and inspect query results using _any_ promise that resolves JSON results. HTTPS or WSS not required.
- Supports full GraphQL Language Specification.
- Queries, Mutations, Subscriptions, etc

## API "Main" Methods:

### Creating a Courier:

### Update a Courier Capacity:

### Increasing a Courier Capacity:

### Decreasing a Courier Capacity:

## API "Aditional" Methods:
