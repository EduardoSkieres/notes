import { IUser } from './user.inteface';

export class User implements IUser {
  uid!: string;
  email!: string;
  displayName!: string;
  photoURL!: string;
  emailVerified!: boolean;
}
