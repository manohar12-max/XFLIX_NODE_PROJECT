const express=require("express")
const router=express.Router()
const validate=require("../middlewares/validate")
const validation=require("../validations/video.validation")
const videoController=require("../controllers/video.controller")

console.log("in router")
router.get("/",validate(validation.searchVideo),videoController.getVideos) //all about query params

router.get("/:videoId",validate(validation.getVideo),videoController.getVideoById)
router.post("/",validate(validation.postVideo),videoController.postVideo)
router.patch("/:videoId/votes",validate(validation.patchVotes),videoController.changeVotes)
router.patch("/:videoId/views",validate(validation.updateViews),videoController.changeViews)

module.exports=router