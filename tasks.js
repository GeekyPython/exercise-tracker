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
        const content = req.body;
        const user = await Tasks.find({_id: userID});

        if(!user)
        {
            return res.status(404).send(`No user with id: ${userID}`);
        }

        content.date = req.body.date ? new Date(req.body.date).toDateString() : new Date().toDateString();
        user[0].exercises.push(content);
        const updatedUser = await Tasks.create(user);
        await Tasks.findByIdAndUpdate(userID,updatedUser);
        const {_id,username} = await Tasks.findById(userID);
        const {duration,description} = content;
        const date = content.date ? content.date : new Date().toDateString();

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
        let limitedList = [...exercises];

        const from = new Date(req.query.from);
        const to = new Date(req.query.to);

        if(from!="Invalid Date" && to!="Invalid Date")
        {
            limitedList = limitedList.filter(elem => {
                let temp = new Date(elem.date);
                return temp.getTime()>=from.getTime() && temp.getTime()<=to.getTime();
            })
        }

        const limit = req.query.limit ? req.query.limit : limitedList.length;
        limitedList = limitedList.splice(0,limit);
        return res.status(200).json({username,count,_id,log: limitedList});
    }

    catch(err)
    {
        console.log(err);
        res.status(500).json({msg: err});
    }
    
}

module.exports = {showUsers,addUser,addExercise,showUserLogs};