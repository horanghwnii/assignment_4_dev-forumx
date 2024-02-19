import { User } from '@prisma/client';
import { Omit } from '@prisma/client/runtime/library';
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../../config';
import prismaClient from '../../prisma/client.prisma';

class AuthService {
  async signUp(
    req: Request<{ email: string; password: string }>,
    res: Response<Omit<User, 'encryptedPassword'>>,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;
      if (!email.trim()) throw new Error('No email');
      if (!password.trim()) throw new Error('No password');

      const encryptedPassword = await bcrypt.hash(password, 12);

      const user = await prismaClient.user.create({
        data: { email, encryptedPassword },
        select: {
          id: true,
          email: true,
          createdAt: true,
          post: true,
          like: true,
        },
      });

      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async logIn(
    req: Request<{ email: string; password: string }>,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;
      if (!email) throw new Error('No email');
      if (!password) throw new Error('No password');

      const user = await prismaClient.user.findUnique({
        where: { email },
        include: { post: true, like: true },
      });
      if (!user) return res.sendStatus(404);

      const isVerified = await bcrypt.compare(password, user.encryptedPassword);
      if (!isVerified) return res.sendStatus(401);

      const accessToken = jwt.sign({ email }, JWT_SECRET_KEY, {
        subject: email,
      });

      res.json(accessToken);
    } catch (e) {
      next(e);
    }
  }
}

const authService = new AuthService();

export default authService;
