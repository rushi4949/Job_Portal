import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Company } from './models/company.model.js';

dotenv.config();

const updateLogos = async () => {
  await mongoose.connect(process.env.MONGO_URL);
  const logos = {
    'Capgemini': '/logos/capgemini.svg',
    'Google': '/logos/google.svg',
    'Microsoft': '/logos/microsoft.svg',
    'Amazon': '/logos/amazon.svg',
    'Infosys': '/logos/infosys.svg',
    'Adobe': '/logos/adobe.svg'
  };
  for (const [title, logo] of Object.entries(logos)) {
    await Company.updateOne({ title }, { $set: { logo, name: title } });
  }
  console.log('Updated company logos successfully!');
  process.exit(0);
};

updateLogos();
