const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const {Video}=require("../models")
const values=require("../utils/values")

const getVideosById=async(videoId)=>{
  const video= await Video.findById({_id:videoId})
  if(!video){
    throw new ApiError(httpStatus.NOT_FOUND,"Video not found")
  }
  return video
}

const getVideos=async (title,genres,contentRating,sortBy)=>{
    //title match will give regex of title 
    //like for top=> it will give topper,topnotch,topbot all the video including top
    //i is for options consider as case insesnsitive

   const titleMatch={title:{$regex :title ,$options:"i"}} 
  
   const contentRatings=getContentRating(contentRating)
   //contentRatings we get the arrays from query params eg [12+ ,16+]
   //$in tells mongoose to get contentRatings ["+12" ,"+16"]
   const contentRatingMatch={contentRating:{$in:contentRatings} }
  
   let genreMatch={genre:{$in:genres}}
      if(genres.includes("All")){
            genreMatch=null
      } 
      
      
      const videos= await Video.find({
        ...titleMatch,
        ...contentRatingMatch,
        ...genreMatch
      })
     if (!videos){
      throw new ApiError(httpStatus.NOT_FOUND,"Video not found")
     }
  
const sortedVideos=videoSorter(videos ,sortBy)

return sortedVideos

}

const videoSorter=(videos,sortBy)=>{
   videos.sort((video1,video2)=>{
    let v1=video1[sortBy];
    let v2=video2[sortBy]
    if(sortBy==="releaseDate"){
     v1=new Date(v1).getTime();
     v2=new Date(v2).getTime();
    }
   console.log(v1,v2)
    if(v1>v2){
        return -1
    }
    else{
        return 1
    }

   })
return videos;
}



const getContentRating=(contentRating)=>{
const contentRatings=[...values.contentRatings] //copying array
if(contentRating=="All" || contentRating=="Anyone" ){
    return contentRatings
}
const contentRatingIndex=contentRatings.indexOf(contentRating)
return contentRatings.splice(contentRatingIndex)
// const newarray=contentRatings.slice(contentRatingIndex)
//   const duplicateArray=contentRatings.filter(ele => !newarray.includes(ele))
// duplicateArray.push(contentRating)

// return duplicateArray
}

const addVideo=async(body)=>{
  const data =await Video.create(body)
 
  if(!data){
    throw new ApiError(httpStatus.NOT_FOUND,"video not found")
  }
  return data
}

const patchVotes=async(videoId,voteType,changeType)=>{
  const video= await getVideosById(videoId)
 
  let newVoteType="";
  if (voteType==="upVote"){
    newVoteType="upVotes"
  }
  else{
    newVoteType="downVotes"
  
  }
  let previousVotes=video.votes[newVoteType]
  if(changeType==="increase"){
    previousVotes +=1
  }
  else{
    previousVotes -=1
  }
    
  previousVotes=Math.max(previousVotes,0)//this does not let previous value less than 0
   video.votes[newVoteType]=previousVotes
    console.log(video)
    await video.save()
  return
} 
const updateViews=async (videoId)=>{
  const video=await getVideosById(videoId)
   video.viewCount +=1
   await video.save();
  console.log(video)
   return
}


module.exports={
    getVideos,
    getVideosById,
    addVideo,
    patchVotes,
    updateViews
}