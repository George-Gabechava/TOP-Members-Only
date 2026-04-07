import "express-session";

declare global {
  namespace Express {
    interface User {
      id: number;
      first_name: string;
      last_name: string;
      username: string;
      password: string;
      membership_status: boolean;
      admin_status: boolean;
    }
  }
}

declare module "express-session" {
  interface SessionData {
    messages: string[];
  }
}

export {};
