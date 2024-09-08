## Pinbooru-API
REST API for Pinbooru client applications.

Test cases are modeled after the db seed.

Docker postgres:
```docker run --name postgres_container -e POSTGRES_PASSWORD=qwert -d -p 6500:5432 -v postgres_data:/var/lib/postgresql/data postgres```

Run commands:
```console
//Run Server
npx ts-node server.ts

//Update DB Schema
npx prisma migrate dev --name init

//Seed DB 
npx prisma db seed 

//Reset + Seed DB
npx prisma migrate reset

//Run tests
npm test
```