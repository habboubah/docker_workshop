# Docker Workshop: From Local Execution to Deployment


This comprehensive Docker workshop is designed to walk you through running and deploying an application composed of three main services:

1. A MongoDB database.
2. A Node.js backend application.
3. A React.js frontend application.

the TODO application is divided into two folders, `frontend` and `backend`. We will be working primarily within Visual Studio Code's built-in terminal to execute Docker commands.


## Local Execution

Before we dive into Docker, let's start by running the application on our local environment.

### Step 1: Setting up MongoDB

We'll use Docker to run a MongoDB instance locally. This command pulls the MongoDB image from Docker Hub and runs it as a new container:

```bash
docker run \
    --name mongodb \
    --rm \
    -d \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=password \
    mongo
```

Check the status and logs of our MongoDB container:

```bash
docker ps
docker logs mongodb
```

### Step 2: Running the Backend Service

First, install dependencies:

```bash
npm install
```

Next, set up the necessary environment variables and update the MongoDB connection string in your `mongoose.connect()` method:

```bash
export MONGODB_USERNAME=admin
export MONGODB_PASSWORD=password
export URL=localhost
echo $MONGODB_USERNAME
echo $MONGODB_PASSWORD
echo $URL
node app.js
```

Your `mongoose.connect()` should look like this:
```javascript
mongoose.connect(`mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.URL}:27017/course-goals?authSource=admin`);
```

Start the application. You should see a "MongoDB Connected..." message:

```bash
node app.js
```

### Step 3: Running the Frontend Service

Install dependencies and start the application:

```bash
npm install
npm start
```

Navigate to `http://localhost:3000/` in your browser.

### Step 4: Testing the Application

To ensure that our application is running as expected, check the logs for the MongoDB container:

```bash
docker logs mongodb
```

You should see a "Connection accepted" message.