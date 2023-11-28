import express from "express";
import appConfig from "./2-utils/app-config";
import productsController from "./6-controllers/products-controller";
import dal from "./2-utils/dal";
import routeNotFound from "./4-middleware/route-not-found";
import catchAll from "./4-middleware/catch-all";

// Create the server: 
const server = express();

// Support request.body as JSON:
server.use(express.json());

// Route requests to our controllers:
server.use("/api", productsController);

server.use("*", routeNotFound);
server.use(catchAll);

// Run server: 
server.listen(appConfig.port, async () => {
    // Connect once to mongoDB:
    await dal.connect();

    console.log("Listening on http://localhost:" + appConfig.port)
});
