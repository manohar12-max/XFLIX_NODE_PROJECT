const mongoose=require("mongoose")
const validator = require("validator");
const values=require("../utils/values")
const genres=values.genres
const contentRating=values.contentRatings

const videoSchema= mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true //trim means begining blank spaces would be trimed
    },
    videoLink:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    contentRating:{
        type:String,
        required:true,
        trim:true,
        validate:(value)=> {
            if(!contentRating.includes(value)){
               throw new Error("Invalid rating")
            }
        }
    },
    genre:{
        type:String,
        required:true,
        trim:true,
        validate:(value)=> {
            if(!genres.includes(value)){
               throw new Error("Invalid genre")
            }
        }
    },
    releaseDate:{
        type:String,
        required:true,
        trim:true,
    },
    previewImage:{
        type:String,
        required:true,
    },
    votes:{
        upVotes:{
            type:Number,
            default:0,
        },
        downVotes:{
            type:Number,
            default:0,
        }
    },
    viewCount:{
        type:Number,
        default:0,
    }
})

const Video =new  mongoose.model("Videos",videoSchema)

module.exports.Video=Video