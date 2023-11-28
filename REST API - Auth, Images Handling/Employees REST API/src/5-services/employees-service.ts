import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import EmployeeModel from "../3-models/employee-model";
import { ResourceNotFoundError } from "../3-models/error-model";
import appConfig from "../2-utils/app-config";
import imageHelper from "../2-utils/image-helper";

async function getAllEmployees(): Promise<EmployeeModel[]>{
    // create sql: 
    const sql = `SELECT 
                    EmployeeID AS id,
                    LastName AS lastName,
                    FirstName AS firstName,
                    BirthDate AS birthDate,
                    Country AS country,
                    City AS city,
                    CONCAT('${appConfig.domainName}/api/employees/', PhotoPath) as imageUrl
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
                    City AS city,
                    Photo as photo,
                    CONCAT('${appConfig.domainName}/api/employees/', PhotoPath) as imageUrl
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

    // Save image: 
    const imageName = await imageHelper.saveImage(employee.photo);
    
    const sql = `INSERT INTO employees (LastName,FirstName,BirthDate,Country,City,PhotoPath)
                    VALUES('${employee.lastName}','${employee.firstName}','${employee.birthDate}','${employee.country}','${employee.city}','${employee.imageUrl}')`;

    const info: OkPacket = await dal.execute(sql);

    employee.id = info.insertId;

    // Get image url:
    employee.imageUrl = `${appConfig.domainName}/api/employees/${imageName}`;

    // Remove image from product object because we don't response it back 
    delete employee.photo;

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