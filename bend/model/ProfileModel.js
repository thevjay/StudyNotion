const mongoose=require('mongoose')

//Define the Profile schema
const profileSchema=new mongoose.Schema({
    gender:String,
    dateOfBirth:String,
    about:{
        type:String,
        trim:true,
    },
    contactNumber:{
       type: Number,
       trim:true,
    }
})

// Export the Profile model
module.exports = mongoose.model("Profile", profileSchema);