var mongoose=require("mongoose");
const noteSchema=mongoose.Schema(
    {
       name:String,
        text:String,
        password:String,
        fontfamily:String,
        fontsize:String,
        italic:Boolean,
        underline:Boolean,
        alignment:String,
        time: { type: Date, default: Date.now } 
    }

);
module.exports=mongoose.model("notes",noteSchema);