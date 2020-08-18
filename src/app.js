const express = require("express");
const cors = require("cors");
const { uuid, isUuid } = require("uuidv4");
const { response } = require("express");

const app = express();

app.use(express.json());
app.use(cors());
app.use('/repositories/:id', validateId);

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

    if (!title || !url || !techs) {
        return response.status(400).json({ likes: 0 })
    }

    const alterPos = repositories.findIndex(repository => repository.id == id);

    const alter = {
        id,
        url,
        title,
        techs
    }

    repositories[alterPos] = alter;

    response.json(alter);

});

app.delete("/repositories/:id", (request, response) => {
    const { url, title, techs } = request.body;
    const { id } = request.params;

    const alterPos = repositories.findIndex(repository => repository.id == id);

    repositories.splice(alterPos, 1);
    response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;
    const likePos = repositories.findIndex(repository => repository.id == id);

    repositories[likePos].likes += 1;

    response.json(repositories[likePos]);
});

function validateId(request, response, next) {
    const { id } = request.params;
    if (!isUuid(id)) {
        return response.status(400).json({ error: 'Invalid Id' });
    } else {
        next();
    }
}

module.exports = app;