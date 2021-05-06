# LandingPage

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

## Backend - API

These are the endpoints for the posts API that should exist:

### User Routes

| HTTP Method | HTTP Path | Action |
| ------------|-----------|--------|
| `GET`    | `/users`      | return loggedIn User. |
| `GET`    | `/users/{userName}` | return false if userName not found, True if userName found case sensitive|
| `POST`   | `/users`      | Sets firstLogIn to true on User profile.|
| `PUT`    | `/users` | Update the given User, this route is used to add Avatar and Bio as well.|
| `DELETE` | `/users` | Delete logged in user.|

### Group Routes

| HTTP Method | HTTP Path | Action |
| ------------|-----------|--------|
| `GET`    | `/groups`      | return all groups. |
| `GET`    | `/groups/{groupId}` | return a group by given groupId|
| `POST`   | `/groups`      | Create a new group.|
| `POST`   | `/groups/{groupId}`      | Join a group.|
| `POST`   | `/groups/{groupId}/topics/{topicId}`      | Join a topic.|
| `PUT`    | `/groups` | Update group tile, group description, group rules or group avatar only.|
| `DELETE` | `/groups/{id}` | -To Be implemented |
| `DELETE` | `/groups/{groupId}/topics/{topicId}` | Leave topic. |

### Post Routes

| HTTP Method | HTTP Path | Action |
| ------------|-----------|--------|
| `GET`    | `/posts`      | return all posts. |
| `GET`    | `/posts/{postId}` | return a specific post based on the provided id.|
| `POST`   | `/posts/{groupId}`      | create a new post on a given Group.|
| `PUT`    | `/posts/{postId}` | update the given post.|
| `DELETE` | `/posts/{postId}` | delete the given post.|

### Post Likes and Dislikes Routes

| HTTP Method | HTTP Path | Action |
| ------------|-----------|--------|
| `GET`    | `/posts/{postId}/dislikes` | returns all dislikes on a post.|
| `POST`   | `/posts/{postId}/dislikes`      | create a dislike on a given post|
| `DELETE` | `/posts/dislikes/{Id}` | delete the given dislike.|

### Comment Routes

| HTTP Method | HTTP Path | Action |
| ------------|-----------|--------|
| `GET`    | `/comments/{postId}`      | return all comments for a specific post. |
| `POST`   | `/comments/{postId}`      | create a new comment on the given post.|
| `PUT`    | `/comments/{commentId}` | update the given comment.|
| `DELETE` | `/comments/{commentId}` | delete the given comment.|

### Comment Like and Dislikes Routes

| HTTP Method | HTTP Path | Action |
| ------------|-----------|--------|
| `GET`    | `/comments/{commentId}/dislikes`      | return all dislikes for a specific comment. |
| `POST`   | `/comments/{commentId}/dislikes`      | create a dislike on the given comment.|
| `DELETE` | `/comments//dislikes/{Id}` | delete the given dislike.|

### Topic Routes

| HTTP Method | HTTP Path | Action |
| ------------|-----------|--------|
| `GET`    | `/topics/{postId}`      | return all topics. |
| `POST`   | `/topics`      | create all generic topics.|

