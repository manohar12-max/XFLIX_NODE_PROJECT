//const Joi=require("joi")
const validate = require("../middlewares/validate")
const value=require("../utils/values")
const customValidator=require("../validations/custom.validation")

const Joi=require("joi").extend((joi) =>({
    base:joi.array(), //any joi fuction what it to be like eduction,comedy to be an array so make it in array in value
    coerce:(value)=>({
      value:value.split ? value.split(","): value 
    }),
    type:"stringArray"
}))



const getVideo={
    params:Joi.object().keys({
     videoId:Joi.string().custom(customValidator.videoId)
    })
}

const searchVideo={
   query: Joi.object().keys({
    title:Joi.string(),
    genres:Joi.stringArray().items(Joi.string().valid(...value.genres,"All")),
    contentRating:Joi.string().valid(...value.contentRatings,"All"),
    sortBy:Joi.string().valid(...value.sortBy)
})
} 

const postVideo={ 
   
    body:Joi.object().keys({
        videoLink:Joi.string().required().custom(customValidator.link),
        title:Joi.string().required(),
        genre:Joi.string().required().valid(...value.genres),
        contentRating:Joi.string().required().valid(...value.contentRatings),
        releaseDate:Joi.string().required(),
        previewImage:Joi.string().uri()
    })
}

const patchVotes={
    params:Joi.object().keys({
        videoId:Joi.string().custom(customValidator.videoId)
       }),
    body:Joi.object().keys({
       vote:Joi.string().required().valid(...value.updateVoteType),
       change:Joi.string().required().valid(...value.changeVoteType)
    })
}
const updateViews={
    params:Joi.object().keys({
        videoId:Joi.string().custom(customValidator.videoId)
       }),
       //we dont need body over here once seen means seen
}

module.exports={
    searchVideo,
    getVideo,
    postVideo,
    patchVotes,
    updateViews
}