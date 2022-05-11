const asyncHandler = require('express-async-handler')
// @desc Get goals
// @route GET /api/goals
//@access Private (after adding authentication)
const getGoals =asyncHandler(async (req,res) =>{
    res.status(200).json({message: 'Get goals'})
})
// @desc Set goals
// @route POST /api/goals
//@access Private (after adding authentication)
const setGoal =asyncHandler( async(req,res) =>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field');
    }
    //console.log(req.body)
    res.status(200).json({message: 'Set goal'})
}
)
// @desc update goals
// @route PUT /api/goals/:id
//@access Private (after adding authentication)
const updateGoal =asyncHandler(async (req,res) =>{res.status(200).json({message: `Update goal ${req.params.id}`})})
// @desc delete goals
// @route DELETE /api/goals/:id
//@access Private (after adding authentication)
const deleteGoal = asyncHandler(async(req,res) =>{res.status(200).json({message: `Delete goal ${req.params.id}`})}) 

module.exports = {getGoals,setGoal,updateGoal,deleteGoal}