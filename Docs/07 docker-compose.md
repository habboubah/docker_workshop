# docker-compose
 
# clean up 
```
docker stop backend
docker stop frontend
docker stop mongodb
```

```bash
docker-compose up -d
http://localhost:3000
docker-compose down

docker-compose up
docker-compose up -d // to works in detached mode
docker-compose up -d --build // images will only be build once, and it will not build it again if the image found so use --build to force it to build the image
docker-compose down
docker-compose build // will only build the images
```

# Add a docker-compose.yaml in thr root of your project 
```bash
version: "3.8"
services:
  mongodb:
    image: 'mongo'
    container_name: mongodb
    volumes: 
      - data:/data/db
    environment: 
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password
  backend:
    build: ./backend
    container_name: backend
    ports:
      - '8080:8080'
    volumes: 
      - logs:/app/logs
      - ./backend:/app
      - /app/node_modules
    environment: 
      MONGODB_USERNAME: admin
      MONGODB_PASSWORD: password
      URL: mongodb
    depends_on:
      - mongodb
  frontend:
    container_name: frontend
    build: ./frontend
    ports: 
      - '3000:3000'
    volumes: 
      - ./frontend/src:/app/src
    stdin_open: true
    tty: true
    depends_on: 
      - backend

volumes: 
  data:
  logs:
```