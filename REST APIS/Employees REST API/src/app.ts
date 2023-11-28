import express from "express";
import appConfig from "./2-utils/app-config";
import employeesController from "./6-controllers/employees-controller";

const server = express();

server.use(express.json());

server.use("/api", employeesController)

server.listen(appConfig.prot, () => console.log("Listening on https://loacalhost:" + appConfig.prot));
