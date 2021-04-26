# SDA starter template

This web starter template is based on Spring, PostgreSQL, React, React router and Axios. Check the following links for documentation and guides:

- [Spring](https://spring.io/projects/spring-boot)
- [PostgreSQL](https://www.postgresql.org)
- [React](https://reactjs.org)
- [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [Axios](https://github.com/axios/axios)

## Setup
Our development environment for a full-stack web application will consist of three main parts:

1. Database (Postgres).
2. Backend server (Spring).
3. Frontend development server (React).

### Prerequisites
- `docker` and `docker-compose`.
- `nodejs`.

### Starting the database
In the root folder, run
```
docker-compose up
```

### Starting the backend server
Open the root folder and run
```
./gradlew bootRun
```

### Starting the frontend development server
The frontend application is in the directory `frontend`. From there, run 
```
npm install
```
to install all the dependencies needed for the project.

Then start the frontend application by running
```
npm start
```

### Inviting collaborators
The following should be done by one person in each group.

Now that you have a repo, you can start inviting your group members as collaborators so that they can work
with you on your repo. Go to `Settings` -> `Manage Access` and then add your group members via their usernames.

### Task
You will find your task in [`Task.md`](Task.md)

These are the endpoints for the posts API that should exist:
| HTTP Method | HTTP Path | Action |
| ------------|-----------|--------|
| `GET`    | `/posts`      | return all posts. |
| `GET`    | `/posts/{id}` | return a specific post based on the provided id.|
| `POST`   | `/posts`      | create a new post.|
| `PUT`    | `/posts/{id}` | update the given post.|
| `DELETE` | `/posts/{id}` | delete the given post.|

These are the endpoints for the comments API that should exist:
| HTTP Method | HTTP Path | Action |
| ------------|-----------|--------|
| `GET`    | `/comments/{postId}`      | return all comments for a specific post. |
| `POST`   | `/comments/{postId}`      | create a new comment.|
| `PUT`    | `/comments/{id}` | update the given comment.|
| `DELETE` | `/comments/{id}` | delete the given comment.|
