const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const { url, title, techs } = request.body;
    const repository = { id: uuid(), url, title, techs, likes: 0 };
    repositories.push(repository);
    response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
    const { url, title, techs } = request.body;
    const { id } = request.params;

    console.log(id);

    const alterPos = repositories.indexOf(repository => repository.id == id);

    let alter;
    url == true ? alter.url = url : '';
    title == true ? alter.title = title : '';
    techs == true ? alter.techs = techs : '';

    console.log(alter);

    repositories[alterPos] = alter;
    response.json(alter);

});

app.delete("/repositories/:id", (request, response) => {
    // TODO
});

app.post("/repositories/:id/like", (request, response) => {
    // TODO
});

module.exports = app;