import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import EmployeeModel from "../3-models/employee-model";
import { ResourceNotFoundError } from "../3-models/error-model";

async function getAllEmployees(): Promise<EmployeeModel[]>{
    // create sql: 
    const sql = `SELECT 
                    EmployeeID AS id,
                    LastName AS lastName,
                    FirstName AS firstName,
                    BirthDate AS birthDate,
                    Country AS country,
                    City AS city
                FROM employees`;

    // Get employees from database:
    const employees = await dal.execute(sql);

    return employees;

}

async function getOneEmployee(id: number): Promise<EmployeeModel[]>{
    // create sql: 
    const sql = `SELECT 
                    EmployeeID AS id,
                    LastName AS lastName,
                    FirstName AS firstName,
                    BirthDate AS birthDate,
                    Country AS country,
                    City AS city
                FROM employees
                Where EmployeeID = ${id}`;

    // Get employees from database:
    const employees = await dal.execute(sql);

    const employee = employees[0];

    console.log(employee);
    if(!employee) {
        throw new ResourceNotFoundError(id);
    }
    return employee;

}

async function addEmployee(employee: EmployeeModel): Promise<EmployeeModel> {
    
    employee.validate();
    
    const sql = `INSERT INTO employees (LastName,FirstName,BirthDate,Country,City)
                    VALUES('${employee.lastName}','${employee.firstName}','${employee.birthDate}','${employee.country}','${employee.city}')`;

    const info: OkPacket = await dal.execute(sql);

    employee.id = info.insertId;
    return employee;
}

async function updateEmployee(employee: EmployeeModel): Promise<EmployeeModel> {
    employee.validate();
    
    const sql = `UPDATE employees SET 
                    LastName = '${employee.lastName}',
                    FirstName = '${employee.firstName}',
                    BirthDate = '${employee.birthDate}',
                    Country = '${employee.country}',
                    City = '${employee.city}'
                WHERE EmployeeID = ${employee.id}`;

    const info: OkPacket = await dal.execute(sql);

    // If product id not exist
    if(info.affectedRows === 0) throw new ResourceNotFoundError(employee.id);

    return employee;
}

async function deleteEmployee(id: number): Promise<void> {
    const sql = `DELETE FROM employees WHERE EmployeeID = ${id}`;

    const info: OkPacket = await dal.execute(sql);

}




export default {
    getAllEmployees,
    getOneEmployee,
    addEmployee,
    updateEmployee,
    deleteEmployee
}