import { OkPacket } from "mysql";
import dal from "../2-utils/dal";
import { UnauthorizedError, ValidationError } from "../3-models/error-model";
import UserModel from "../3-models/user-model";
import cyber from "../2-utils/cyber";
import CredentialsModel from "../3-models/credentials-model";

async function register(user: UserModel): Promise<string>{
    // Validation: 
    user.validate();

    // Is username taken:
    if(await isUsernameTaken(user.username)) throw new ValidationError(`username ${user.username} is already exits`);

    // SQL:
    const sql = `INSERT INTO users(firstName,lastName,username,password,roleId)
                 VALUES('${user.firstName}',
                        '${user.lastName}',
                        '${user.username}',
                        '${user.password}',
                        ${user.roleId})`;

    // Execute
    const info: OkPacket = await dal.execute(sql);

    // Set back now id:
    user.userId = info.insertId;

    const token = cyber.getNewToken(user);

    return token;

}


async function login(credentials: CredentialsModel): Promise<string> {
    // Validation: 
    credentials.validate();

    // SQL: 
    const sql = `SELECT * FROM users WHERE username = '${credentials.username}' AND password = '${credentials.password}'`

    // Execute: 
    const users = await dal.execute(sql);

    const user = users[0];

    // If no such a user:
    if(!user) throw new UnauthorizedError("Incorrect username or password.");

    // Generate new token: 
    const token = cyber.getNewToken(user);

    // Return token:
    return token

}


async function isUsernameTaken(username: string): Promise<boolean> {

    // Create an sql
    const sql = `SELECT COUNT(*) AS count FROM users WHERE username = '${username}'`;

    const result = await dal.execute(sql);
    const count = result[0].count;
    return count > 0;
    
}

export default {
    register,
    login
};