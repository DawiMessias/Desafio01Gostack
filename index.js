const express = require("express");
const server = express();

server.use(express.json());

server.listen(3000);


const projects = [];


// mostrar o número de requisições
server.use((req, res, next) => {
    console.count("Número de requisições chamadas");

    return next();
})
// Middlewares
// Global 
function CheckProjectExist(req, res, next) {
    const { id } = req.params;
    const project = projects.find(p => p.id == id);

    if (!project) {
        return res.status(400).json({ error: 'Projeto não encontrado'});
    }
    return next();
}   



//lista todos os projetos
server.get('/projects', (req, res) => {
    return res.json(projects)
})


//Cadastra novo projeto
server.post('/projects', (req, res) => {
    const { id, title } = req.body;

    const project = {
        id,
        title,
        task: []
    };   

    projects.push(project);

    return res.json(project).status(201);  
})

// armazenar tarefa
server.post('/projects/:id/tasks', CheckProjectExist, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;


    const project = project.find(p => p.id == id);

    project.tasks.push(title)

    return res.json(project);
});



// altera id
server.put('/projects/:id', CheckProjectExist, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;

    const project = projects.find(p => p.id == id);

    project.title = title;

    return res.json(project);   
}) 

// remove id
server.delete('/projects/:id', CheckProjectExist, (req, res) => {
    const { id } = req.params;

    projects.splice(id)

    return res.send(projects);

    
})


