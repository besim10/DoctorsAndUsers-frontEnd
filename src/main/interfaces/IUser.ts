import IEvent from "./IEvent";
interface IUser {
  id?: number;
  fullName: string;
  email: string;
  password?: string;
  isDoctor: boolean;
  postedEvents: IEvent[];
}

export default IUser;
