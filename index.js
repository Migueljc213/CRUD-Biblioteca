
//Rotas com express
import express from 'express';
import userRouters from './src/routes/user.routes.js'
const app = express();

app.use(express.json());
app.use(userRouters);

app.listen(3001, () => {
    console.log("Serve ligado")
})