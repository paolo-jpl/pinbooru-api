## Pinbooru-API
REST API for Pinbooru client applications.

Test cases are modeled after the db seed.

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