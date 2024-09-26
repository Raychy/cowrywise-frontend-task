import { User } from "./user";

export interface Photo {
    id: string;
    urls: {
      small: string;
      regular: string;
    };
    alt_description: string | null;
    user: User;
    color: string | null;
  }