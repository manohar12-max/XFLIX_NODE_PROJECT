const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const {videoService}=require("../services")

const getVideoById=catchAsync(async(req,res)=>{
    const video=await videoService.getVideosById(req.params.videoId)
    res.status(200).send(video)
})



const getVideos=catchAsync(async (req,res)=>{
  //below line means if req.query.title is present? if yes then req.query.title : else ""
    const title=req.query.title ? req.query.title:""
    const genres=req.query.genres ? req.query.genres:["All"]
    const contentRating=req.query.contentRating ? req.query.contentRating:"All"
    const sortBy=req.query.sortBy ? req.query.sortBy:"releaseDate"

    const videos=await videoService.getVideos(title,genres,contentRating,sortBy)
    res.status(200).send({videos:videos})
})

const postVideo=catchAsync(async(req,res)=>{
    const video=await videoService.addVideo(req.body)
    res.status(httpStatus.CREATED).send(video)
})

const changeVotes=catchAsync(async(req,res)=>{
   
    await videoService.patchVotes(req.params.videoId,req.body.vote,req.body.change);
    res.status(204).send()
})

const changeViews=catchAsync(async(req,res)=>{
    await videoService.updateViews(req.params.videoId);
    res.status(204).send()
})

module.exports={
    getVideos,
    getVideoById,
    postVideo,
    changeVotes,
    changeViews
}