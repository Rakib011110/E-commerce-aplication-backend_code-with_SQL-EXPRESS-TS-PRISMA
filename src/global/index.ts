import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    export interface Request {
      user?: JwtPayload | (string & { userId: string });

      id?: JwtPayload | string;
    }
  }
}
