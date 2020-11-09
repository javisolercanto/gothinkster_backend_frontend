# on-Cinema
A project based on gothinkster. Adapted by Javier Soler Cantó to work with series and movies data.

<hr/>

## Run the project (Locally)
To the run the project, first we need to clone the repo. To start the backend on `rest/` we need all the necessary dependencies declared on package.json.
```
npm install
```
Now we can run the rest api
```
npm run dev
```
For the `graphql` api it's the same process at `graphql/`.

To run the frontend side:
```
npm install
gulp
```

## Run the project (Docker)
To run the project with Docker-Compose we need to positionate on the project root directory and execute:
```
docker-compose up -d
docker-compose up --build
```
This docker-compose execute the API side. To execute the frontend side:
```
npm install
gulp
```
*Be aware of change the app.js routes on rest and graphql for mongo service*

## Features
| ELEMENT | PROVIDED BY|
| ----- | ---- |
| Home | REST |
| Series | REST |
| Movies | GRAPHQL |
| Profile | REST & GRAPHQL |
| Login | REST & PASSPORT (GitHub & Google) |

## Technologies
- NodeJS
- AngularJS 1.5
- GraphQL
- Docker
- Mongo

## Libraries
- JWT
- Toastr
- FakerJS
- Gulp
- Swagger
- PassportJS
- WebPack

## Backend Documentation
We can accede to api res documentation using swagger by:
```
localhost:3000/api-doc/#/
```
To accede to the graphql documentation simply:
```
localhost:3002/grapqhl
```

## Generate data
We can generate random data using faker. To generate data we use rest site and acceeding to:
```
localhost:3000/seed/series/:qty
```
We can generate random series. The same as users side with:
```
localhost:3000/seed/users/:qty
```

![Javier Soler Cantó Logo](https://raw.githubusercontent.com/javisolercanto/logos/master/logo_negro.png?token=AK2MCFIVZM3NDUIOUE7HNO27WLSNO