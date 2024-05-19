//const fs = require('fs');
const Tour = require('./../modals/tourModal');

/*
const readTours = fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`,'utf-8');
const tours = JSON.parse(readTours)

exports.checkID = (req,res,next,val) => {
    console.log(`check id ${val}`)
    const tour = tours.find(tour => tour.id === val * 1);
    if(!tour){
        return res.status(404).json({
            status:'Failed',
            message : "Tour not found with id:"+req.params.id
        })
    }
    next();
}

exports.checkBody = (req,res,next) => {
    let name = req.body.name;
    let price = req.body.price;
    if(!name || !price){
        return res.status(404).json({
            status:'Failed',
            message : "Tour must have name and price"
        })
    }
    next();
}
*/

exports.getAllTour = async (req,res)=>{
    try{
        let requestParam = {...req.query};
        let excludeQuery = ["page","sort","fields","limit"];
        excludeQuery.forEach(el => delete requestParam[el]);

        let queryObject = JSON.stringify(requestParam);
        queryObject = queryObject.replace(/\b(gte|gt|lte|lt)\b/g,match => `$${match}`)

        let query = Tour.find(JSON.parse(queryObject));
        
        //sorting
        if(req.query.sort){
            const sortBy = req.query.sort.split(',').join(' ');
            query.sort(sortBy);
        }else{
            query.sort('-createdAt');
        }

        //field limiting
        if (req.query.fields) {
            let requestedFields = req.query.fields.split(',').join(' ');
            let hasExclusion = requestedFields.split(' ').some(field => field.trim().startsWith('-'));
            if (hasExclusion) {
                query.select('-__v');
                query.select(`${requestedFields}`);
            } else {
                query.select(requestedFields);
            }
        } else {
            query.select('-__v');
        }

        //pagination
        if (req.query.page){
            const page = req.query.page * 1 || 1;
            const limit = (req.query.limit && req.query.limit * 1) || 10;
            const skipResult = (page - 1) * limit;
            query.skip(skipResult).limit(limit); 
        }

        const tours = await query;
        res.status(201).json({
            status:'success',
            requestTime : req.requestTime,
            results: tours.length,
            message:'Tours fetch successfully',
            data : {
                tours
            } 
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
} 

exports.getTour = async (req,res)=>{
    try{
        const tour = await Tour.findById(req.params.id);
        res.status(200).json({
            status : "success",
            data : {
                tour
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

exports.updateTour = async (req,res)=>{
    try{
        const tour = await Tour.findByIdAndUpdate(req.params.id,req.body,{
            new: true,
            runValidators: true
        })
        res.status(200).json({
            status : "success",
            data: {
                tour
            }
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

exports.deleteTour = async (req,res)=>{
    try{
        await Tour.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status : "success",
            message: "tour with id="+req.params.id+" is deleted successfully"
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }
}

exports.createTour = async (req,res) => {
         try{
            const newTour = await Tour.create(req.body);
            res.status(201).json({
                message:"tour added successfully",
                data:{
                    tour : newTour
                }
            })
         }catch(err){
            res.status(400).json({
                status: 'failed',
                message: err.message
            })
         }
 }