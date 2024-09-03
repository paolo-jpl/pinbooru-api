## Pinbooru-API
REST API for Pinbooru client applications

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
```