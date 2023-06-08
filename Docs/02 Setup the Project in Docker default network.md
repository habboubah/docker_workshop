
# Setup the Project in Docker using docker default network

For communication from localhost to a containers we use localhost:port_number 
For communication between containers using docker default network use "host.docker.internal"


For communication between containers (using the docker default network) localhost:port_number will not works(since it runs in a container and not run localhost), 
"host.docker.internal" should be used instead Also we still need to publish the ports

1. MongoDB Container

we still needs to publish the ports for mongodb, since both  mongodb and the backend in the default docker networks
and the backend will use  "host.docker.internal": port_number to reach the mongodb container

```bash
docker run \
    --name mongodb \
    --rm \
    -d \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=password \
    -p 27017:27017 \
    mongo
```

Check the status and logs of our MongoDB container:

```bash
docker ps
docker logs mongodb
```

2. Backend Container

create a Dockerfile file in backend folder
```
FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 8080

CMD ["npm", "start"]
```

create .dockerignore file
```
node_modules
Dockerfile
.git
```

add new dependency
```bash
cd backend
npm install nodemon
```

add a script to package.json
```bash
"start": "nodemon app.js"
```


Biuld the backend Image
```bash
cd backend/
docker build -t goals-backend .
docker images
```

Run the container
URL is localhost because we run the containers in docker default network and they communicate using localhost:portnumber
```bash
docker run \
    -d \
    --rm \
    --name backend \
    -p 8080:8080 \
    -e MONGODB_USERNAME=admin \
    -e MONGODB_PASSWORD=password \
    -e URL=host.docker.internal \
    goals-backend
```

```bash
docker ps 
docker logs backend
```

## frontend Container
create a Dockerfile file
```
FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
```

create .dockerignore file
```
node_modules
Dockerfile
.git
```

react needs to be run in interactive mode -it, -it and -d can works together 
```bash
cd frontend/
docker build -t goals-frontend .
```
```bash
docker run \
    --name frontend \
    --rm \
    -d \
    -it \
    -p 3000:3000 \
    goals-frontend
```
```bash
docker ps 
docker logs frontend
```
http://localhost:3000




# clean up 
```
docker stop backend
docker stop frontend
docker stop mongodb
```