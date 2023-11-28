import express, { NextFunction, Request, Response } from "express";
import StatusCode from "../3-models/status-code";
import employeesService from "../5-services/employees-service";
import EmployeeModel from "../3-models/employee-model";

// Create the router part of express:
const router = express.Router();

router.get("/employees", async (request: Request, response: Response, next:NextFunction) => {
    try{
        const employees = await employeesService.getAllEmployees();
    
        response.json(employees);
    }
    catch(err: any) {
        next(err);
    }
});

router.get("/employees/:id([0-9+])",async (request: Request, response: Response, next: NextFunction) => {
    try{
        const id = +request.params.id;
    
        const employee = await employeesService.getOneEmployee(id);
    
        response.json(employee);
    }
    catch(err: any) {
        next(err);
    }
});

router.post("/employees",async (request: Request, response: Response, next: NextFunction) => {
    try{
        const employee = new EmployeeModel(request.body);
    
        const addedEmployee = await employeesService.addEmployee(employee);
        
        response.status(StatusCode.Created).json(addedEmployee);
    }
    catch(err: any) {
        next(err);
    }
});

router.put("/employees/:id([0-9+])",async (request: Request, response: Response, next: NextFunction) => {
    try{
        request.body.id = +request.params.id;
    
        const employee = new EmployeeModel(request.body);
    
        const updatedEmployee = await employeesService.updateEmployee(employee);
    
        response.json(updatedEmployee);
    }
    catch(err: any) {
        next(err);
    }
});

router.delete("/employees/:id([0-9+])",async (request: Request, response: Response, next: NextFunction) => {
    try{
        const id = +request.params.id;
        
        await employeesService.deleteEmployee(id);
        
        response.sendStatus(StatusCode.NoContent);        
    }
    catch(err: any) {
        next(err);
    }
});


export default router;