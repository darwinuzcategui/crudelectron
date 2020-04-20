const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/productodb", {
        useNewUrlParser: true,
        useUnifiedTopology: true


    })
    .then(db => console.log("Base datos Local conectado"))
    .catch(err => console.log(err));