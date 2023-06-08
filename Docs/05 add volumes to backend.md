# Adding Volumes to backend

-v logs:/app/logs: temp folder as named volume, the logs writen by container are not overriden by mount bind because it has a longer container path /app/logs, /app
-v C:/User/Ahmad/Desktop/App/backend:/app: bind mount
-v /app/node_modules : anonymous volume, so the existing node_modules should stay there and not overritten by not exisiting folder with bind mount 
we add "logs:/app/logs" to keep the logs after restarts
We need it for live source update 


In this example the data will be Lost because we donot use a volume

Run the commands inside the backend folder terminal
```bash
docker stop backend
docker build -t goals-backend .

docker run \
    -d \
    --rm \
    --name backend \
    -p 8080:8080 \
    -e MONGODB_USERNAME=admin \
    -e MONGODB_PASSWORD=password \
    -e URL=mongodb \
    -v /app/node_modules \
    -v "//c/Users/Ahmad/workspace/docker_workshop/backend":/app \
    --network goals \
    goals-backend

or
docker run \
    -d \
    --rm \
    --name backend \
    -p 8080:8080 \
    -e MONGODB_USERNAME=admin \
    -e MONGODB_PASSWORD=password \
    -e URL=mongodb \
    -v /app/node_modules \
    -v /$(PWD):/app \
    --network goals \
    goals-backend

or
docker run -d --rm --name backend -p 8080:8080 -e MONGODB_USERNAME=admin -e MONGODB_PASSWORD=password -e URL=mongodb -v /app/node_modules -v "//c/Users/Ahmad/workspace/docker_workshop/backend":/app --network goals goals-backend

or
docker run -d --rm --name backend -p 8080:8080 -e MONGODB_USERNAME=admin -e MONGODB_PASSWORD=password -e URL=mongodb -v logs:/app/logs -v /app/node_modules -v /$(PWD):/app --network goals goals-backend

docker logs backend -f
change in backend\app.js console.log('DELETED GOAL'); to console.log('DELETED GOAL works'); and save it and add delete a goal in the backend and check of this works 

```

# Test
change in backend\app.js
 console.log(`Created new todo with id: ${newTodo._id}`);
to 
  console.log(`Created new todo with id: ${newTodo._id} !!!!`);


the changes on windows donot show automatically, you need to restart the container 

```bash
docker restart backend
docker logs backend -f
```