const Model = require('./mongoDb_atlas/schema_model')
const asyncWrapper = require('./middleware/async')
const { createCustomError } = require('./middleware/error-handler')


const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Model.find()
    res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Model.create(req.body)
    res.status(201).json({ task })
})

const getSingleTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Model.findOne({ _id: taskID })
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }

    res.status(200).json({ task })
})
const deleteTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params
    const task = await Model.findOneAndDelete({ _id: taskID })
    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }
    res.status(200).json({ task })
})
const updateTask = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params

    const task = await Model.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
    })

    if (!task) {
        return next(createCustomError(`No task with id : ${taskID}`, 404))
    }

    res.status(200).json({ task })
})

module.exports = {
    getAllTasks,
    createTask,
    getSingleTask,
    updateTask,
    deleteTask,
}
