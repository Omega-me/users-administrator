export interface User {
  id: number;
  name: string;
  username?: string;
  address: {
    city?: string;
  };
  email: string;
}
