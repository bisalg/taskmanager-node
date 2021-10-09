const mongoose = require('mongoose')

const ConnectionDB = (uri) => {
    return mongoose.connect(uri, { //if no database exits with this name, mongoose will create one
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    }).then(() => console.log('connected to MongoDB Atlas'))
}

module.exports = ConnectionDB;