import React from "react";
import Box from "@mui/material/Box";
import { useNavigate, Link } from "react-router-dom";
import { Avatar, Button, Stack, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress, Grid } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import {config }from "../App"
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import "./Upload.css"





const Upload=(props)=>{
  const {openPopup,setOpenPopup }=props

 const [isLoading,setIsLoading]=useState(false)

  const [formData,updateFormData]=useState({"videoLink":"","title":"","genre":"","contentRating":"","releaseDate":"","previewImage":""})
 
 const onValueChange=(e)=>{
  let name=e.target.name;
  let value=e.target.value;
  if(name==="releaseDate"){
    var today = new Date(value);
       
    var month = today.toLocaleString('default', { month: 'long' });
    var year=today.getFullYear()
    var date=today.getDate()
    value=`${date} ${month} ${year}`
  }
  updateFormData({...formData,[name]:value})
  
 }
 const uploadVid=async(form)=>{
  console.log(form)
  if(!validate(form)){
    setIsLoading(false)
    return 
  }
  try{
    await axios.post(`${config.endpoint}`,{"videoLink":form.videoLink,"title":form.title,"genre":form.genre,"contentRating":form.contentRating,"releaseDate":form.releaseDate,"previewImage":form.previewImage}); 
   setIsLoading(false)
    setOpenPopup(false)
    return
  }
  catch(err){
    setIsLoading(false)
  console.log(err)
  return
  }

 }
 const validate=(form)=>{
  if(!form.videoLink){
    console.log("videoLink required")
return false
  }
  else if(!form.title){
    console.log("title required")
    return false
  }
  else if(!form.genre){
    console.log("genre required")
    return false
  }
  else if(!form.contentRating){
    console.log("contentRating required")
     
    return false
  }
  else if(!form.releaseDate){
    console.log("releaseDate required")
    return false
  }else if(!form.previewImage){
    console.log("previewImage required")
      return false
  }
  return true
 }

 
 const onUploadSubmit=async(e)=>{
  e.preventDefault();
  setIsLoading(true)
  uploadVid(formData)
 }
  

    return(
    
<Dialog open={openPopup} 
    maxWidth="md"   >
        
<Box className="Form-Box">
<h3>Upload Video</h3> 
<p className="cross" onClick={()=>{setOpenPopup(false)}}>x</p>   
<FormControl className="form-info">
<Stack spacing={2}>
  <input type="text"  id="videolink" name="videoLink" placeholder="Valid video link"  value={formData.videoLink} required onChange={(e)=>{onValueChange(e)}}/>
  <label for="videoLink">The link will be used to drive the video</label>
  <input type="text"  id="thumbnaillink" name="previewImage" placeholder="Thumbnail image link" value={formData.previewImage} required  onChange={(e)=>{onValueChange(e)}}/>
  <label for="previewImage">The link will be used to preview the Thumbnail image </label>
  <input type="text"  id="title" name="title" placeholder="Title" value={formData.title} required  onChange={(e)=>{onValueChange(e)}}/>
  <label for="title">The title will be representatve text for the video</label>
  <select name="genre" id="genre-select" required  onChange={(e)=>{onValueChange(e)}} >
    <option  disabled selected className="disabled">Genre</option>
    <option value="Education">Education </option>
    <option value="Sports">Sports</option>
    <option value="Comedy">Comedy</option>
    <option value="Lifestyle">Lifestyle</option>
</select>
  <label for="genre">Genre will help you in categorizing the video</label>
  <select name="contentRating" id="age-select" required  onChange={(e)=>{onValueChange(e)}} >
    <option  disabled selected className="disabled">Suitable Age for the clip</option>
    <option value="Anyone">Anyone </option>
    <option value="7+">7+</option>
    <option value="12+">12+</option>
    <option value="16+">16+</option>
    <option value="18+">18+</option>
</select>
  <label for="contentRating">This will help you to filter videos on age group suitability </label>
  <input type="date" id="date" name="releaseDate" className="disabled"  onChange={(e)=>{onValueChange(e)}}/>
  <label for="releaseDate">This will be used to sort the videos</label>
  {
    !isLoading ?(<Button className="Upload-Button"onClick={onUploadSubmit}>Upload Video</Button>):( <CircularProgress className="circular"/>)
  }
   <Button className="Cancel" onClick={()=>{setOpenPopup(false)}}>Cancel</Button>
  </Stack>

</FormControl>

</Box>
</Dialog>

    )
}
export default Upload;