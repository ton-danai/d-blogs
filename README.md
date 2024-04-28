# D-blogs

## Framework on projects
1. React by Vite (Typescript)
2. NestJs (Typescript)
3. Tailwind (CSS)

## Project structure
 `api` - Nestjs  
 `web` - React  
 `db` - Database script , and store data
 
 ## How to run on local machine
1. Make sure your machine install docker , docker-compose
2. Go to project directory
    ```
     docker-compose up --build -d
    ```
    - Website run on http://localhost:5173
    - API run on http://localhost:3000
    - Database   
        `Host` : localhost  
        `Post` : 5173   
        `Username` : postgresql  
        `Password` : sertis     
        `DB` : postgres
 