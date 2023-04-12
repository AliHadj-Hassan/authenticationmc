import { IUser } from "./user.interface";

export interface IResponse {
    status: number;
    message: string;
    res: IUserResponse | null;
    errors: { [key: string]: any } | null;
}
export interface IUserResponse {
    token: string;
    user: IUser;
}
  