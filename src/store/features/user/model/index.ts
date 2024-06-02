import { IOrder } from '@store/features/order/model';

export interface IRegistrationProps {
  id?: string;
  email: string;
  dateOfBirth: string;
  name: string;
  surname: string;
  tel: string;
  street: string;
  house: string | number;
  floor: string | number;
  entrance: string | number;
  room: string | number;
}

export type TUserRole = 'USER' | 'ADMIN';

export interface IBonus {
  id: string;
  score: string;
  userId: string;
  orderId?: string;
  description?: string;
  createdAt?: Date;
}

export interface IUser {
  id: string;
  role: TUserRole;
  tel: string;
  isActivated: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  bonus: IBonus[];
  order: IOrder[];
  profile: IUserProfile;
}

export interface IUserProfile {
  id: string;
  userId: string;
  email?: string;
  dateOfBirth?: string;
  name?: string;
  surname?: string;
  street?: string;
  house?: string;
  floor?: string;
  entrance?: string;
  room?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
