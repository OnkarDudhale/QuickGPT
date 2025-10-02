import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import connectDB from './configs/db.js';
import userRouter from './routes/userRoutes.js';
import chatRouter from './routes/chatRoute.js';
import messageRouter from './routes/messageRoute.js';


const app = express();
await connectDB();

//Middleware
app.use(cors())
app.use(express.json())

//Routes
app.get('/', (req, res) => {
    res.send('server is live');
})
app.use('/api/user', userRouter);
app.use('/api/chat', chatRouter);
app.use('/api/message',messageRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log('server is running on port ' + port);
})