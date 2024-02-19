declare namespace Express {
  interface Request {
    user?: { email: string; encryptedPassword: string };
  }
}
