export interface User {
  firstName: string;
  lastName: string;
  email: string;
  photoUrl: string;
  age: number | null;
  gender: string;
  about: string;
  skills: [string];
  location?: {
    type: string;
    coordinates: [number | null, number | null];
  }
  distance?: float
};