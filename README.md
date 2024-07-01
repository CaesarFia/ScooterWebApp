# Scooter Web App

## Setting up the project

Well if you are reading this, you probably have the project cloned on your local machine. If not you should do that first.

### Installing dependencies

To install the dependencies, you should use npm and install the dependencies using the `npm ci` command to install the dependencies from the `package-lock.json` file.

Because we are not hosting you will have to serve a Postgres database on your local machine. A docker-compose file is provided to launch a Postgres database on localhost:5432 with the username `postgres` and a password you define. To configure the password write the password in the `.secrets/postgres_password` file. To start the database, run the docker-compose file with the command `docker-compose up -d` (or `docker compose up -d` if you are using a modern version of Docker).

Often times a .env file is used to store environment variables for the Node.js server. This file is ignored by git and will not be pushed to the repository. You should create a `.env` file in the root of the project and add the `POSTGRES_PASSWORD` variable to it. This variable should be set to the password you defined in the `.secrets/postgres_password` file.

After you have configure the database and added the password to the `.env` file you can run the `npm run dev` command to start the server.

## Developing

Once you've created a project and installed dependencies, start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

If you change the schema of the database you will need to run the `npm run generate` command to create a new migration file. This will create a new file in the `migrations` folder that you can run with the `npm run migrate` command.

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
