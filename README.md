# Forkie (Task Manager) Installation Guide
------

This document gives the instructions to install and run locally the official Forkie App with all
its required dependencies. **NOTE:** If you run the application locally there will not be any
register. Please visit [the official app](https://forkie.herokuapp.com) if you want to test it for
real.

### Requirements
To successfully run the application locally you must have the following software installed in your 
computer. In case you don't, please install it before you continue. **NOTE:** You can build our app 
without the recommended software, but please be sure of what you do.
1. [Docker](https://www.docker.com/).
2. [Docker-compose](https://docs.docker.com/compose/install/).
3. Unix-like terminal.

### Steps:
1. Open a terminal, clone the repository and navigate to its root directory.
```bash
git clone https://github.com/richardmoonw/TaskManager.git
cd route_to_path
```

2. Verify if the active variables for the database in config/database.yml are the ones for 
development.

3. If it is your first time building and running the application type the following (if not, go ahead with the
next step).
```bash
docker-compose up --build
```

4. In case you have built the container before, run the following (if you did the third step, this one is not 
required).
```bash
docker-compose up
```

5. Open a new terminal window and list all the containers.
```bash 
docker container ls
```

6. Copy the CONTAINER ID of taskmanager_web, and execute bash in it.
```bash
docker exec -ti <CONTAINER_ID> bash
```

7. Once you are in the container terminal. Execute the following. **NOTE:** In case you are asked to 
overwrite something, just confirm.
```bash
rails db:migrate RAILS_ENV=development
bundle exec rails webpacker:install
bundle exec rails webpacker:install:react
rails generate react:install
```

8. Verify if config/webpacker.yml has the following line
```
resolved_paths: ['app/assets', 'engine/foo/app/assets']
```

9. Open the app in your browser and enjoy :)

### Accounts:
In this section you can find the credentials to access to the application.

* Employee 1:
mario.andres@hotmail.com
UserPass123

* Employee 2:
ricardo@hotmail.com
UserPass2

* Employee 3:
cindyt@hotmail.com
UserPass123

* Project Manager:
danv@hey.com
MyPassword123

**NOTE:** The PM has some special privileges over the employees. They can create, delete and edit projects. 
Nevertheless, all the users can change their role in the profile screen.
