# Exercise Tracker

This is the boilerplate for the Exercise Tracker project. Instructions for building your project can be found at https://www.freecodecamp.org/learn/apis-and-microservices/apis-and-microservices-projects/exercise-tracker

## Mongo db con moongoose

https://mongoosejs.com/

npm install npm install mongoose --save

## Estructura de carpetas

https://www.developerupdates.com/blog/folder-structure-for-nodejs-and-expressjs-project

## Despliegue y hospedaje

https://app.netlify.com/
https://codeinsightacademy.com/blog/devops/how-to-deploy-express-app-on-netlify/

### Alternativas para Nodejs

https://blog.logrocket.com/heroku-alternatives-deploy-node-js-app/
https://dashboard.render.com/

### Hospedaje de la base de datos MongoDB

https://cloud.mongodb.com/
500MB
## Varios archivos en Nodejs
https://nodejs.org/api/esm.html

## Requisitos

### Rutas

- POST `/api/users`
  - Recibe un un formaulario con un campo `username`
  - guarda en la coleccion **Users**
    - _id autogenerado
    - username:string
  - muestra un json:
  ```json
  {
    "username": "yuyiuiy",
    "_id": "66579d71f3f0350013ad1ba0"
  }
  ```
- GET `/api/users`
  - Retorna la lista de todos usuarios en forma de array
- POST `/api/users/:_id/exercises` 
    - Recibe un formalario con los campos `description`, `duration`, `date`
    - Guarda en la coleccion **Exercices**:
        - _id autogenerado
        - description: string
        - duration: number
        - date: Date, new Date("<YYYY-mm-dd>")
        - _id usuario 
    - Muestra un JSON:
    ```json
    {
    "_id": "6655b818f3f0350013ad1aba",
    "username": "enriqueanton",
    "date": "Thu Mar 03 2985", 
    "duration": 43,
    "description": "35243"
    }
    ```
    - Hay que busccar en la coleccion **Users** el **username**
    - Hay que pasar el date a formato string `date.toDateString()` 
- GET `/api/users/:_id/logs?[from][&to][&limit]`
    - Retorna un JSON con los ejercicios de un usuario
    - buscamos todos los ejercicios que pertenezan al usuario con el id `req.params.id` 
    ```json
    {
    "_id": "6655b818f3f0350013ad1aba",
    "username": "enriqueanton",
    "count": 2,
    "log": [
        {
        "description": "mates",
        "duration": 43,
        "date": "Fri Feb 21 1986"
        },
        {
        "description": "fisica",
        "duration": 54,
        "date": "Thu Feb 21 1985"
        }
    ]
    }
    ```
    - Se muestra un json con el id del usuario 
    - username
    - count: numero de  ejercicios
    - "log": array con los  ejercicios donde no se muestran los id  
    - Se puede filtrar de forma opcional con los parametros 
        - from: desde una fecha hasta otra en formato yyyy-mm-dd 
        - to:
        - limit: cantidad e exercicios que se quieren mostrar
        - los recogemos mediante `req.query`: En `/api/users/6655b818f3f0350013ad1aba/logs?from=1983-12-11&to=1986-12-11&limit=2` tenemos
            - `req.params.id= 6655b818f3f0350013ad1aba`
            - `req.query.from=1983-12-11`
            - `req.query.to=1986-12-11`
            - `req.query.limit=2`

