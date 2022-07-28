import NextAuth from 'next-auth';

import EmailProvider from 'next-auth/providers/email';
import GithubProvider from 'next-auth/providers/github';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    jwt: true,
  },
});
