const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./model/User');

const MONGO_URI = 'YOUR_MONGODB_CONNECTION_STRING';

const createAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    const existingAdmin = await User.findOne({
      email: 'admin@shopnest.com'
    });

    if (existingAdmin) {
      existingAdmin.role = 'admin';
      await existingAdmin.save();

      console.log('Existing user is now an admin.');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      'Admin@12345',
      10
    );

    const admin = await User.create({
      name: 'ShopNest Admin',
      email: 'admin@shopnest.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Admin created successfully!');
    console.log('Email: admin@shopnest.com');
    console.log('Password: Admin@12345');

    process.exit(0);

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

createAdmin();