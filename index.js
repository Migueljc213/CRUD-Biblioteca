
//Rotas com express
import express from 'express';
import userRouters from './src/routes/user.routes.js'
import bookRouters from "./src/routes/book.routes.js";
const app = express();

app.use(express.json());
app.use('/users',userRouters);
app.use('/books', bookRouters);
const port = process.env.PORT || 3001
app.listen(port, () => {
    console.log("Serve ligado")
})