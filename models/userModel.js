const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:{
        type: String,
        require: [true, "Please Add your name"]
    },
    email:{
        type: String,
        require: [true, "Please Add your Email"],
        unique: [true, "Email address already exist"]
    },
    password:{
        type: String,
        require: [true, "Please Add your Number"]
    },

},
{
    timestamps: true,
}
)


module.exports = mongoose.model("Users", userSchema)