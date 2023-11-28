import express, { Request, Response,NextFunction } from "express";
import employeesService from "../5-services/employees-service";
import { request } from "http";

// Create the router part of express:
const router = express.Router();

router.get("/employees", async (request: Request, response: Response, next:NextFunction) => {
    const employees = await employeesService.getAllEmployees();

    response.json(employees);
});

router.get("/employees/:id",async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;

    const employee = await employeesService.getOneEmployee(id);

    response.json(employee);
});

router.post("/employees",async (request: Request, response: Response, next: NextFunction) => {
    const employee = request.body;

    const addedEmployee = await employeesService.addEmployee(employee);

    response.status(201).json(addedEmployee);
});

router.put("/employees/:id",async (request: Request, response: Response, next: NextFunction) => {
    request.body.id = +request.params.id;

    const employee = request.body;

    const updatedEmployee = await employeesService.updateEmployee(employee);

    response.json(updatedEmployee);
});

router.delete("/employees/:id",async (request: Request, response: Response, next: NextFunction) => {
    const id = +request.params.id;

    await employeesService.deleteEmployee(id);

    response.sendStatus(204);
});


export default router;