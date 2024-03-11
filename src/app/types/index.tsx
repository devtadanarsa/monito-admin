export type Pet = {
  id: string;
  image: string;
  name: string;
  size: Size;
  price: string;
  gender: Gender;
  additional: string[];
};

type Size = ["Small", "Medium", "Large"];
type Gender = ["Male", "Female"];
