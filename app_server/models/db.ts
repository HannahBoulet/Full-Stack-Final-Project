import mongoose from 'mongoose';

const connectString = "mongodb+srv://flubbygubby:stuffpaste2015@atlascluster.buif2df.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(connectString);

mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected`);
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error:`, err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected');
});
