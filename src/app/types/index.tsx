export type Pet = {
  id: string;
  image: string;
  name: string;
  size: string;
  age: number;
  color: string;
  location: string;
  price: number;
  gender: string;
  vaccinated: boolean;
  dewormed: boolean;
  microchip: boolean;
  additional: string[];
};

export interface DecodedToken {
  id: string;
  name: string;
  email: string;
  iat: number;
  exp: number;
}
