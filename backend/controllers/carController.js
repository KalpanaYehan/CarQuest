import{Car} from '../models/basicModel.js'

export const createCar = async (req, res) => {
    try{
        if(!req.body.model||
            !req.body.brand||
            !req.body.publishYear||
            !req.body.price||
            !req.body.mileage||
            !req.body.img||
            !req.body.condition||
            !req.body.description

        ){
            return res.status(400).send({message:'send all required field',})
        }
        const newCar ={
            model: req.body.model,
            brand: req.body.brand,
            publishYear: req.body.publishYear,
            price: req.body.price,
            mileage: req.body.mileage,
            img: req.body.img,
            condition:req.body.condition,
            description:req.body.description
        }
        const car = await Car.create(newCar)
        return res.status(210).send(car)
    
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message});

    }
}

// export const getCars = async(req,res)=>{
//     try{
//         const cars = await Car.find({})
//         return res.status(200).json({
//             count:cars.length,
//             data:cars
            
//         })
        
//     }
//     catch(error){
//         console.log(error.message);
//         res.status(500).send({message:error.message})
//     }
// }

export const getCars = async(req,res)=>{
    try{
        const cars = await Car.find({})
        return res.status(200).json({ 
            message:"success",
            count:cars.length,
            data:cars
    })
    }catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
}

export const getCarById = async (req, res) => {
    try{
        const{id} =req.params
        const car = await Car.findById(id)
        return res.status(200).json(car);

        
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
}

export const updateCarById = async (req, res) => {
    try{
        if(!req.body.model||
            !req.body.brand||
            !req.body.publishYear||
            !req.body.price||
            !req.body.mileage||
            !req.body.img||
            !req.body.condition||
            !req.body.description

        ){
            return res.status(400).send({message:'send all required field',})
        }
       
        const{id}=req.params
        const result = await Car.findByIdAndUpdate(id,req.body)
        if(!result){
            res.status(404).send({message:"Book not found"})
        }
        return res.status(200).send({message:"successfully updated"})
        
    }
    catch(error){
        console.log(error.message);
        res.status(500).send({message:error.message})
    }
}


export const deleteCarById = async (req, res) => {
    try{
        const {id}=req.params;
        const result = await Car.findByIdAndDelete(id)
        

        if(!result){
            res.status(404).json({message:"Book not found"})
        }
        return res.status(200).send({message:'Deleted successfully'})
    }
    catch(error){
        console.log(error)
        res.status(500).send({message:error})
    }
}
