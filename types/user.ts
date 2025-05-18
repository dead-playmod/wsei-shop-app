export type UserToken = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: Gender;
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: Role;
};

export type Address = {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: Coordinates;
  country: string;
};

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Bank = {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
};

export type Company = {
  department: string;
  name: string;
  title: string;
  address: Address;
};

export type Crypto = {
  coin: string;
  wallet: string;
  network: string;
};

export type Gender = 'female' | 'male';

export type Hair = {
  color: string;
  type: Type;
};

export type Type = 'Curly' | 'Straight' | 'Wavy' | 'Kinky';

export type Role = 'admin' | 'moderator' | 'user';
