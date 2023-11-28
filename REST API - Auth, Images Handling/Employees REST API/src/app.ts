import express from "express";
import appConfig from "./2-utils/app-config";
import employeesController from "./6-controllers/employees-controller";
import authController from "./6-controllers/auth-controller";
import routeNotFound from "./4-middleware/route-not-found";
import catchAll from "./4-middleware/catch-all";
import expressFileUpload from "express-fileupload";

const server = express();

server.use(express.json());

// Support File Upload:
server.use(expressFileUpload());

server.use("/api", employeesController);
server.use("/api", authController);

server.use("*",routeNotFound);

server.use(catchAll);

server.listen(appConfig.prot, () => console.log("Listening on https://loacalhost:" + appConfig.prot));
