# Deploy Containers

We want to Create a container for the frontend and backend and push it to docker hub and then starts using it
Create a account on https://hub.docker.com/ 
Goto Repositories Tab and create new Repository "goals-backend-01" and onw for "goals-frontend-01"

## Without using a tag, since the tag is optional
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

## with tags
```
docker tag goals-backend habboubah/goals-backend:1.0
docker images

docker push habboubah/goals-backend:1.0
```
```
docker tag goals-frontend habboubah/goals-frontend:1.0
docker images

docker push habboubah/goals-frontend:1.0
```