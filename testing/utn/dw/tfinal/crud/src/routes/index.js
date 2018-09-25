const express = require('express');
const router = express.Router();
//Requiero a task para ver qué esquema de datos necesito
const Task = require('../models/task');

router.get('/', async (req, res) => {
    //res.send('Hola mundo');
    const tasks = await Task.find();
    res.render('index', {
        tasks // es lo mismo que poner tasks: tasks
    }); //renderizamos el ejs y mostramos esa vista
});

//ruta para agregar datos del form
router.post('/agregar', async (req, res) => {
    // console.log(new Task(req.body)); (ya no lo muestro por consola, lo crearé como objeto)
    const task = new Task(req.body);
    await task.save();
    //res.send('Recibido');
    res.redirect('/'); //para que redireccione al home y que salga listado
});

router.get('/turn/:id', async(req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.status = !task.status; //el status es igual a lo contrario del status?
    await task.save();
    res.redirect('/');
});

router.get('/editar/:id', async(req, res) => {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.render('editar', {
        task
    });
});

router.post('/editar/:id', async(req, res) => {
    const { id } = req.params;
    await Task.update({ _id: id }, req.body);
    res.redirect('/');
});

router.get('/borrar/:id', async (req, res) => {
    const { id } = req.params;
    await Task.remove({ _id: id });
    res.redirect('/'); //para que redireccione al home y que salga listado
});

//al final exporto
module.exports = router;