# Task alert project for HUST ITSS-2 course

## System requirements

- Docker >= 20.10
- Docker compose plugin
- Node >= 18.0

## Setup and Configuration

1. Start docker container:

```bash
make devup
```

This will create a `.env` file in the root directory. You can configure environment variables in this file according to your needs.

2. Install dependencies:

```bash
make devinstall
```

3. Migrate and seed dummy data

```bash
make prisma-generate
make prisma-migrate
make prisma-seed
```

## Usage

To start the application locally, use the following command:

```sh
make devrun
```

The application will be accessible at:

- Web: [http://localhost:3000](http://localhost:3000)
- Api: [http://api.localhost:3000/](http://api.localhost:3000/api/)
- Traefik: [http://traefik.localhost:3000](http://traefik.localhost:3000)

Stop application:

```sh
make devdown
```
