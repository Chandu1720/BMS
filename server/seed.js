const mongoose = require('mongoose');
const User = require('./models/User');

const MONGO_URI = 'mongodb://localhost:27017/bms';

mongoose.connect(MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

const createUser = async () => {
  try {
    // Delete existing user if it exists
    await User.deleteOne({ email: 'chandu@bms.com' });
    console.log('Existing user deleted (if any)');

    const user = new User({
      email: 'chandu@bms.com',
      password: 'Chandu@123',
    });
    await user.save();
    console.log('User created successfully');
  } catch (err) {
    console.error(err.message);
  }
  mongoose.connection.close();
};

createUser();