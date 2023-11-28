import Joi from "joi";
import { ValidationError } from "./error-model";

class CredentialsModel {
    public username: string;
    public password: string;

    public constructor (credential: CredentialsModel){
        this.username = credential.username;
        this.password = credential.password;
    }

    // Validation Schema: 
    private static validationSchema = Joi.object({
        username: Joi.string().required().min(4).max(50),
        password: Joi.string().required().min(4).max(50),
    });

    public validate(): void{
        const result = CredentialsModel.validationSchema.validate(this);
        if(result.error?.message) throw new ValidationError(result.error.message);
    }

}

export default CredentialsModel;