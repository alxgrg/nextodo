# Nextodo

A simple todo list.

## Description

This is a basic todo list app, with authentication, I made as a practice project. It was made with NextJs, NextAuth for email magic-link authentication, TailwindCSS for styles, Prisma and Postgres for all things DB and FeatherIcons for SVG icons. Oh and I made that terrible logo with Inkscape, but we won't talk about that...

### Built With

- [NextJs](https://nextjs.org/)
- [NextAuth](https://next-auth.js.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind](https://tailwindcss.com/)
- [FeatherIcons](https://feathericons.com/)

### Installing locally

```bash
# installation
$ git clone https://github.com/alxgrg/nextodo.git
$ cd nextodo
$ npm install

#Set up your .env variables (assuming you have your own Postgres DB set up locally already)
DATABASE_URL=
EMAIL_SERVER=
EMAIL_FROM=

#Run Prisma migration
npx prisma migrate dev --name init

# development mode
$ npm run dev

```

## Author

Alex George
[Email](mailto:alxmgrg@gmail.com)
