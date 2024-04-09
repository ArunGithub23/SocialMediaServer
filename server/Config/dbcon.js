const mongoose=require('mongoose');
const dotenv=require('dotenv')
dotenv.config();
Db_Url=process.env.Db_Url;// connection string

//console.log(Db_Url)


class DatabaseCon{

    constructor(){
        this._connect();

    }

 _connect(){
    mongoose.connect(Db_Url, {
        dbName: 'SocialMediaApp', // Specify the database name here
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    .then(()=>{console.log("database connection succesful")})
    .catch((err)=>{
        console.log("err in database connection",err.message);
    })
}

}

module.exports= new DatabaseCon();