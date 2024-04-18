# Model-View-Controller (MVC): MVC Gaming Dashboard


## Description
The Katekyo Hitman Reborn (based of a show) game blog allows all user whom have a great interest in KHR express their love and converse with other users about this game. This application follows the MWC paradigm, utilizing Handlebars.js, Sequelize as the ORM to ensure database management and express-session to authenticate the user.

By doing so, this will enhance the user's experiences ensuring there is no breach in privacy when sharing their thoughts and love for this game.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Usage](#usage)


## Technology Used
- SQL
- Dotenv
- Javascript
- Express
- Handlebars
- Sequelize 


## User Story

```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```

## Acceptance Criteria

```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```

## Usage
- Upon cloning the project onto your local machine, open the integrated terminal and fun the command 'npm install'
- Then you must set up your own '.env' variable to be able to run the schema and seed your database.
- The commannds to run and create schema and seed are respectively:
    - source db/schme.sql
    - npm run seed
- Once completed, you are able to run the command:
    - 'npm run start'
- You will be able to access the localhost, in which you will be able access the blogpost

## Deployed URL
- Deployed URL: https://mahabahubba.github.io/MVC-Gaming-Dashboard/
- Video WalkThrough Link: https://www.youtube.com/watch?v=Z7CVvh01uQ0
