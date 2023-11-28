import jwt from "jsonwebtoken";
import { ForbiddenError, UnauthorizedError } from "../3-models/error-model";
import UserModel from "../3-models/user-model";
import RoleModel from "../3-models/role-model";

// Token Secret Key:
const tokenSecretKey = "Maccabi-Tel-Aviv-Fanatics";

function getNewToken(user: UserModel): string{
    
    // Container for user object inside the token: 
    const container = { user };

    // Expiration:
    const options = { expiresIn: "3h"};

    // Create Token:
    const token = jwt.sign(container,tokenSecretKey,options);

    return token;
}

function verifyToken(token: string): void{
    if(!token) throw new UnauthorizedError("Missing JWT token.");
    try{
        console.log(jwt.verify(token, tokenSecretKey));
    }
    catch(err: any){
        throw new UnauthorizedError(err.message);
    }
}

function verifyAdmin(token: string): void{
    // Verify legal token:
    verifyToken(token);

    // Get container: 
    const container = jwt.verify(token,tokenSecretKey) as {user: UserModel};

    // Extract user: 
    const user = container.user;

    if(user.roleId !== RoleModel.Admin) throw new ForbiddenError("You are not admin.");
}

export default {
    getNewToken,
    verifyToken,
    verifyAdmin
}