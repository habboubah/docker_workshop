# Adding Volumes to mongodb

The problem if I remove the mongodb container and build it again the data will be lost 
So we use a named Volume using "-v data:/data/db", named volume will survive container shutdown

In this example the data will be Lost because we donot use a volume
```bash
docker ps
docker stop mongodb

docker run \
    --name mongodb \
    --rm \
    -d \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=password \
    --network goals \
    mongo
```

```bash
docker ps
docker stop mongodb

docker run \
    --name mongodb \
    --rm \
    -d \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=password \
    --network goals \
    -v data:/data/db \
    mongo

docker stop mongodb
docker run \
    --name mongodb \
    --rm \
    -d \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=password \
    --network goals \
    -v data:/data/db \
    mongo
```
