const Tasks = require('./models/schema');


const showUsers = async (req,res) =>
{
    try
    {
        const users = await Tasks.find({});
        return res.status(200).json(users);
    }

    catch(err)
    {
        res.status(500).json({msg: err});
    }
}

const addUser = async (req,res) =>
{
    try
    {
        const user = await Tasks.create(req.body);
        return res.status(201).json(user);
    }

    catch(err)
    {
        res.status(500).json({msg: err});
    }
}

const addExercise = async (req,res) =>
{
    try
    {
        const userID = req.params._id;
        const user = await Tasks.find({_id: userID});

        if(!user)
        {
            return res.status(404).send(`No user with id: ${userID}`);
        }

        user[0].exercises.push(req.body);
        const updatedUser = await Tasks.create(user);
        await Tasks.findByIdAndUpdate(userID,updatedUser);
        const {_id,username} = await Tasks.findById(userID);
        const {duration,description,date} = req.body;

        return res.status(201).json({username,duration,description,date,_id});
    }

    catch(err)
    {
        console.log(err);
        res.status(500).json({msg: err});
    }
}

const showUserLogs = async (req,res) => 
{
    try
    {
        const data = await Tasks.findById(req.params._id);
        const {username,_id,exercises} = data;
        const count = exercises.length;
        /*const content = data.map(usr => {
            const {username,_id,exercises} = usr;
            const count= usr.exercises.length;
            return {username,_id,count,log: exercises}
        })*/

        res.status(200).json({username,count,_id,log: exercises});
    }

    catch(err)
    {
        res.status(500).json({msg: err});
    }
    
}

module.exports = {showUsers,addUser,addExercise,showUserLogs};