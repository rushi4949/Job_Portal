import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Company } from './models/company.model.js';
import { Job } from './models/job.model.js';
import { User } from './models/user.model.js';

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to MongoDB');

    let recruiter = await User.findOne({ role: 'recruiter' });
    if (!recruiter) {
      recruiter = await User.findOne({});
    }

    if (!recruiter) {
      console.error('No user found to associate jobs with.');
      process.exit(1);
    }

    const userId = recruiter._id;

    // Company definitions with reliable logos
    const companiesList = [
      {
        title: 'Capgemini',
        name: 'Capgemini',
        description: 'Capgemini is a global leader in partnering with companies to transform and manage their business through technology.',
        location: 'Pune, India',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Capgemini_201x_logo.svg/320px-Capgemini_201x_logo.svg.png',
        userId,
      },
      {
        title: 'Google',
        name: 'Google',
        description: 'Google LLC is an American multinational technology company focusing on artificial intelligence, search engine technology, cloud computing, and computer software.',
        location: 'Bengaluru, India',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/320px-Google_2015_logo.svg.png',
        userId,
      },
      {
        title: 'Microsoft',
        name: 'Microsoft',
        description: 'Microsoft enables digital transformation for the era of an intelligent cloud and an intelligent edge.',
        location: 'Hyderabad, India',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/320px-Microsoft_logo_%282012%29.svg.png',
        userId,
      },
      {
        title: 'Amazon',
        name: 'Amazon',
        description: 'Amazon is guided by four principles: customer obsession, passion for invention, commitment to operational excellence, and long-term thinking.',
        location: 'Bengaluru, India',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/320px-Amazon_logo.svg.png',
        userId,
      },
      {
        title: 'Infosys',
        name: 'Infosys',
        description: 'Infosys is a global leader in next-generation digital services and consulting, enabling clients in over 50 countries.',
        location: 'Pune, India',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Infosys_logo.svg/320px-Infosys_logo.svg.png',
        userId,
      },
      {
        title: 'Adobe',
        name: 'Adobe',
        description: 'Adobe is the global leader in digital media and digital marketing solutions, changing the world through digital experiences.',
        location: 'Noida, India',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Adobe_Systems_logo_and_wordmark.svg/320px-Adobe_Systems_logo_and_wordmark.svg.png',
        userId,
      },
    ];

    const companyMap = {};

    for (const comp of companiesList) {
      let existing = await Company.findOne({ title: comp.title });
      if (!existing) {
        existing = await Company.create(comp);
      } else {
        existing.name = comp.name;
        if (!existing.logo) existing.logo = comp.logo;
        await existing.save();
      }
      companyMap[comp.title] = existing;
    }

    // Now seed jobs
    const jobsList = [
      {
        title: 'Senior Frontend Developer (React / Next.js)',
        description: 'Lead frontend development for enterprise SaaS platform. Build lightning-fast user interfaces with modern React, TailwindCSS, and state-of-the-art architectures.',
        requirements: ['React.js', 'Redux Toolkit', 'TypeScript', 'Tailwind CSS', 'Next.js', 'REST APIs'],
        salary: 24,
        experienceLevel: 4,
        location: 'Pune, India',
        jobType: 'Full Time',
        position: 3,
        company: companyMap['Capgemini']._id,
        created_by: userId,
      },
      {
        title: 'Full Stack Software Engineer',
        description: 'Design and implement scalable backend microservices and responsive web clients used by millions of global users daily.',
        requirements: ['Node.js', 'Express', 'React', 'MongoDB', 'Redis', 'Docker'],
        salary: 32,
        experienceLevel: 3,
        location: 'Bengaluru, India',
        jobType: 'Full Time',
        position: 5,
        company: companyMap['Google']._id,
        created_by: userId,
      },
      {
        title: 'Cloud & DevOps Architect',
        description: 'Drive Azure cloud infrastructure automation, CI/CD pipelines, Kubernetes cluster management, and security compliance.',
        requirements: ['Azure', 'Kubernetes', 'Terraform', 'CI/CD', 'Docker', 'Python'],
        salary: 28,
        experienceLevel: 5,
        location: 'Hyderabad, India',
        jobType: 'Full Time',
        position: 2,
        company: companyMap['Microsoft']._id,
        created_by: userId,
      },
      {
        title: 'Backend Systems Engineer (AWS / Node)',
        description: 'Architect mission-critical distributed systems handling high transaction volumes with low latency and 99.99% reliability.',
        requirements: ['Node.js', 'Java', 'AWS', 'DynamoDB', 'Microservices', 'Kafka'],
        salary: 35,
        experienceLevel: 4,
        location: 'Bengaluru, India',
        jobType: 'Full Time',
        position: 4,
        company: companyMap['Amazon']._id,
        created_by: userId,
      },
      {
        title: 'Data Scientist & AI Specialist',
        description: 'Apply state-of-the-art deep learning, NLP, and predictive analytics models to solve complex client problems and drive business value.',
        requirements: ['Python', 'PyTorch', 'Machine Learning', 'Pandas', 'SQL', 'NLP'],
        salary: 20,
        experienceLevel: 2,
        location: 'Pune, India',
        jobType: 'Full Time',
        position: 3,
        company: companyMap['Infosys']._id,
        created_by: userId,
      },
      {
        title: 'UI/UX Product Designer',
        description: 'Shape the next generation of creative digital tools. Craft intuitive user journeys, wireframes, design systems, and delightful micro-interactions.',
        requirements: ['Figma', 'User Research', 'Design Systems', 'Prototyping', 'Adobe XD'],
        salary: 22,
        experienceLevel: 3,
        location: 'Remote',
        jobType: 'Full Time',
        position: 2,
        company: companyMap['Adobe']._id,
        created_by: userId,
      },
    ];

    const currentJobCount = await Job.countDocuments();
    if (currentJobCount === 0) {
      await Job.insertMany(jobsList);
      console.log(`Successfully seeded ${jobsList.length} jobs!`);
    } else {
      console.log(`Jobs already exist (${currentJobCount}), skipping insert.`);
    }

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
};

seedData();
