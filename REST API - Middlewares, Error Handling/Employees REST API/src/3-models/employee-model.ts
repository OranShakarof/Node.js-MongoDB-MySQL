import Joi from "joi";
import { ValidationError } from "./error-model";

class EmployeeModel {
    public id: number; 
    public firstName: string;
    public lastName: string;
    public birthDate: string;
    public country: string;
    public city: string;

    public constructor(employee: EmployeeModel){
        this.id = employee.id;
        this.firstName = employee.firstName;
        this.lastName = employee.lastName;
        this.birthDate = employee.birthDate;
        this.country = employee.country;
        this.city = employee.city;
    }

    static validationSchema = Joi.object({
        id: Joi.number().integer().positive().optional(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(4).max(25),
        birthDate: Joi.string().required(),
        country: Joi.string().required().min(2).max(25),
        city: Joi.string().required().min(2).max(25),
    });

    public validate(): void {
        const result = EmployeeModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message);
    }

}

export default EmployeeModel;