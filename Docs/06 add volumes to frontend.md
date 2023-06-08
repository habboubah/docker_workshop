# Adding Volumes to backend

we add a bindmount to the Frontend
run the frontend, you still need her to publish the port because you need to access it from the host 
here you donot need the "--network goals" because the react app run on the browser and cannot use the network 
    
```bash
docker stop frontend
docker build -t goals-frontend .

docker run \
    -d \
    -it \
    --rm \
    --name frontend \
    -p 3000:3000 \
    -v /$(PWD)/src:/app/src \
    --network goals \
    goals-frontend

docker ps
docker logs frontend
```

http://localhost:3000/

# Test 
In frontend\src\App.js change 
<h1 className="header">Todo List</h1>
to 
<h1 className="header">Todo List:</h1>

the changes on windows donot show automatically, you need to restart the container 

```bash
docker restart frontend
```