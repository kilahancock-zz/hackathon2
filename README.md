# Hackathon base project

This project is here to help you get started quickly on developing a new project. To get started simply run `./init` in the project root. This script will allow you to pick from supported project templates and optionally provide a remote repo url to push the newly initialized project to.

From there simply call `docker-compose up` to start all base components.

By default every project has a frontend, backend, and MySQL server. The MySQL database can be seeded with DDL/DML by placing `.sql` files in the `sql` folder. These scripts will only run when the container is created. You can force the recreation of the container by:
1. Stopping your services (Ctrl-C)
2. Running `docker rm $(basename $(pwd))_mysql_1` in the project root 
3. Running `docker-compose up`

## Repos that are pulled in when initializing

#### Backend:
1. https://github.com/RedVentures/hackathon-node-base
2. https://github.com/RedVentures/hackathon-go-base

#### Frontend:
1. https://github.com/RedVentures/hackathon-react-base
2. https://github.com/RedVentures/hackathon-vue-base


## Installing a new npm package
1. Change directory into the folder that needs a new npm package and run your standard `npm installl XX --save`
2. Rebuild the docker image `docker-compose build --no-cache`
3. Find  `docker ps -a`  and remove the container `docker rm CONTAINERID`
4. Run project with new npm packages `docker-compose up`