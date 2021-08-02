const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');

const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successfuly!'));

// READ JSON FILE
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8')
);

// IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfuly loaded!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// DELETE ALL DATA FROM DATABASE
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfuly deleted!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

// console.log(process.argv);
