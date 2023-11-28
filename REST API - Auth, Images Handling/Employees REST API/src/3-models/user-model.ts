import Joi from "joi";
import RoleModel from "./role-model";
import { ValidationError } from "./error-model";

class UserModel {
    public userId: number;
    public firstName: string;
    public lastName: string;
    public username: string;
    public password: string;
    public roleId: RoleModel;


    public constructor(user: UserModel){
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.password = user.password;
        this.roleId = user.roleId;
    }

    private static validationSchema = Joi.object({
        
        userId: Joi.number().optional().integer().positive(),
        firstName: Joi.string().required().min(2).max(20),
        lastName: Joi.string().required().min(2).max(25),
        username: Joi.string().required().min(4).max(25),
        password: Joi.string().required().min(4).max(25),
        roleId: Joi.number().optional().integer().min(1).max(2)
    });

    public validate(): void {
        const result = UserModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message);
    }

}

export default UserModel;