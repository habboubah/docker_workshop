# TODO Application Docker Workshop


clone Git repository 
```
git clone https://github.com/habboubah/docker_workshop.git
```

1. A MongoDB database.
2. A Node.js backend application.
3. A React.js frontend application.

the TODO application is divided into two folders, `frontend` and `backend`. 


# Setup the Project in Docker in a network

1. Create new network
```bash
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

output:
    Server running on port 8080
    MongoDB Connected...
```

## frontend Container
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

# Using docker-compose
```bash
docker-compose up -d
http://localhost:3000
docker-compose down
```


# Deploy Containers

We want to Create a container for the frontend and backend and push it to docker hub and then starts using it
Create a account on https://hub.docker.com/ 
Goto Repositories Tab and create new Repository "goals-backend-01" and onw for "goals-frontend-01"

# Without using a tag, since the tag is optional
```
cd backend/
docker build -t goals-backend .
docker images
docker tag goals-backend habboubah/goals-backend-01
docker images

docker login -u habboubah
docker push habboubah/goals-backend-01
```

```
cd frontend/
docker build -t goals-frontend .
docker images
docker tag goals-frontend habboubah/goals-frontend-01
docker images

docker login -u habboubah
docker push habboubah/goals-frontend-01
```

# Using docker-compose
```bash
docker-compose -f docker-compose-dockerhub.yaml up -d
http://localhost:3000
docker-compose down
```


# clean up 
```
docker rm -f $(docker ps -aq)
docker rmi -f $(docker images -q) 
docker system prune -af
```