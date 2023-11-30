const mongoose = require('mongoose');
const taskModel = require('../model/task');

const createTaskHandler = async (req, res) => {

    try{
        const body = req.body;

        const Task = new taskModel(body);

        await Task.save();
    }catch(error){
        console.log(`Error occured : ${error.message}`);
        res.status(500).json({ error : error.message });
    }
}

const getAllTaskHandler = async (req, res) => {

    try{
        const tasks = await taskModel.find({}).sort({ createdAt : -1 });
        res.json(tasks);
    }catch(error){
        console.error(`Error occured : ${error.message}`);
        res.status(500).json({ Error : error.message });
    }
}

const getTaskByID = async (req, res) => {

    try{
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error('No such task');
        }

        const task = await taskModel.findById(id);
        
        if(!task){
            throw new Error('No such task');
        }

        res.json(task);

    }catch(error){
        console.error(`Error occured : ${error.message}`);
        res.status(404).json({ Error : error.message });
    }
}

const deleteTask = async (req, res) => {

    try{
        const { id } = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error('No such task');
        }

        const task = await taskModel.findOneAndDelete({ _id : id });
        
        if(!task){
            throw new Error('No such task');
        }

        res.json(task);
    
    }catch(error){
        console.error(`Error occured : ${error.message}`);
        res.status(404).json({ Error : error.message });
    }

} 

const updateTask = async (req, res) => {

    try{
        const { id } = req.params;
        const body = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)){
            throw new Error('No such task');
        }

        const task = await taskModel.findOneAndUpdate({ _id : id }, { ...body });
        
        if(!task){
            throw new Error('No such task');
        }

        res.json(task);
    
    }catch(error){
        console.error(`Error occured : ${error.message}`);
        res.status(404).json({ Error : error.message });
    }
    

}
module.exports = {
    createTaskHandler,
    getAllTaskHandler,
    getTaskByID,
    deleteTask,
    updateTask,
}
