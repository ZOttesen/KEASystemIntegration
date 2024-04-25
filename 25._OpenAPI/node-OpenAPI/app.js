import express from "express";
const app = express();
import usersRouter from "./routers/usersRouter.js";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';


const swaggerDefinition = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'User API',
            version: '0.0.1',
        },
    },
};

const swaggerOptions = {
    swaggerDefinition,
    apis: ['./routers/*.js'],
};

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJsdoc(swaggerOptions)));

app.use(usersRouter)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port localhost:${PORT}`);
});