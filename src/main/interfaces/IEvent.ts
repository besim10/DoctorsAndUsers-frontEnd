import IUser from "./IUser";
export default interface IEvent {
  id: number;
  title: string;
  start: string;
  end: string;
  userId: number;
  doctorId: number;
  normalUser: IUser;
  doctor: IUser;
}
