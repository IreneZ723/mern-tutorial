const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')
const User = require('../models/userModel')
// @desc Get goals
// @route GET /api/goals
//@access Private (after adding authentication)
const getGoals =asyncHandler(async (req,res) =>{
    const goals = await Goal.find({user: req.user.id})
    res.status(200).json({goals})
})
// @desc Set goals
// @route POST /api/goals
//@access Private (after adding authentication)
const setGoal =asyncHandler( async(req,res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field');
    }
    const goal  = await Goal.create({
        text: req.body.text,
        user:req.user.id
    })
    //console.log(req.body)
    res.status(200).json({goal})
}
)
// @desc update goals
// @route PUT /api/goals/:id
//@access Private (after adding authentication)
const updateGoal =asyncHandler(async (req,res) =>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal Not Found!')
    }
   
    //check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the goal user
    if(goal.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{new: true})
    res.status(200).json(updatedGoal)})
// @desc delete goals
// @route DELETE /api/goals/:id
//@access Private (after adding authentication)
const deleteGoal = asyncHandler(async(req,res) =>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal Not Found!')
    }
    const user = await User.findById(req.user.id)
    //check for user
    if(!user){
        res.status(401)
        throw new Error('User not found')
    }

    // make sure the logged in user matches the goal user
    if(goal.user.toString() !== user.id){
        res.status(401)
        throw new Error('User not authorized')
    }
    await goal.remove();
    res.status(200).json({message: `Delete goal ${req.params.id}`})}) 

module.exports = {getGoals,setGoal,updateGoal,deleteGoal}