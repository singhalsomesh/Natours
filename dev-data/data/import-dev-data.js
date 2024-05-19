const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../modals/tourModal');

dotenv.config({ path: './../../config.env' });

// Check if the DATABASE environment variable is loaded
const db = process.env.DATABASE;
if (!db) {
    console.error('Error: DATABASE environment variable is not set.');
    process.exit(1);
}
console.log(typeof db);

mongoose.set('strictQuery', false);

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("Database connected successfully");
}).catch((err) => {
    console.error('Database connection error:', err);
    process.exit(1);
});

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
  );

const importData = async () => {
    try{
        await Tour.create(tours);
        console.log("tours created successfully");
    }catch(err){
        console.log(err);
    }
    process.exit();
}  

const deleteData = async () => {
    try{
        await Tour.deleteMany();
        console.log("tours deleted successfully");
    }catch(err){
        console.log(err);
    }
    process.exit();
}  

if (process.argv[2] === '--import') {
    importData();
}else if (process.argv[2] === '--delete') {
    deleteData();
}

console.log(process.argv);