
# Setup the Project in Docker in a network

For communication between containers in same network we use the container_name instead localhost:port_number

1. add network
```
docker network ls
docker network create goals
docker network ls
```

2. MongoDB Container
we donot needs to publish the Ports since both the mongodb and the backend in the same network, and the backend will reach it using the container_name

```bash
docker run \
    --name mongodb \
    --rm \
    -d \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=password \
    --network goals \
    mongo
```

Check the status and logs of our MongoDB container:

```bash
docker ps
docker logs mongodb
```

3. Backend Container

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
URL is now mongodb
we still needs to bulish the 8080, because the fronted run on the browser 
```bash
docker run \
    -d \
    --rm \
    --name backend \
    -p 8080:8080 \
    -e MONGODB_USERNAME=admin \
    -e MONGODB_PASSWORD=password \
    -e URL=mongodb \
    --network goals \
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
you still need her to publish the port because you need to access it from the host 
here you donot need the "--network goals" because the react app run on the browser and does not need to use the network 

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