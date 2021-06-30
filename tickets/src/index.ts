import mongoose from 'mongoose';
import app, { PORT } from './app';

const start = async () => {
  try {
    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY not defined!');
    }

    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI not defined!');
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.log('Error : ', error);
  }
};

app.listen(PORT, () => {
  console.log(
    `Auth Service v${process.env.npm_package_version} started on PORT: ${PORT}`
  );
});

start();
