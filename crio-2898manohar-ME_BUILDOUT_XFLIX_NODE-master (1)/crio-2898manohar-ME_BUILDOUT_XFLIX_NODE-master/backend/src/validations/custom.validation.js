const videoId = (value, helpers) => {
    if (!value.match(/^[0-9a-fA-F]{24}$/)) { //id is 24character only from 0 to 9 ,a to f and A to F only only hexadecimal
      return helpers.message('"{{#label}}" must be a valid mongo id');
    }
    return value;
  };
  
 const link=(value,helpers)=>{
  if(!value.match(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/)){
    return helpers.message('"{{#label}}" must be a valid youtube link');
  }
  return value;
 }
  module.exports = {
    videoId,
    link
  };
  