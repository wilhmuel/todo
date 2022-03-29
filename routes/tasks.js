const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

//GET ALL TASKS
router.get('/', (req, res) => {
    const tasks = Task.find();
    tasks.then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({ message: err });
    });
});

//GET SPECIFIC TASK
router.get('/:postId', (req, res) => {
    const task = Task.findById(req.params.postId);
    task.then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({ message: err });
    });
});

//SUBMIT A TASK
router.post('/', (req, res) => {
    const task = new Task({
        name: req.body.name,
        status: req.body.status
    });

    task.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err });
        });
});

//CHANGE A TASK
router.patch('/:postId', (req, res) => {
    const oneup = Task.updateOne(
        { _id: req.params.postId },
        { $set: {name: req.body.name, status: req.body.status} }
    );
    oneup.then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({ message: err });
    });
});

//DELETE A TASK
router.delete('/:postId', (req, res) => {
    const removedTask = Task.deleteOne({ _id: req.params.postId });
    removedTask.then(data => {
        res.json(data);
    })
    .catch(err => {
        res.json({ message: err });
    });
});
module.exports = router;