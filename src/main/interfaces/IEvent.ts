import IUser from "./IUser";
export default interface IEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  userId?: number;
  normalUser?: IUser;
  doctorId?: number;
  doctor?: IUser;
  doctorPostedId?: number;
  doctorPosted?: IUser;
  status: string;
}
