# First Init NestJS using Nx and Pnpm
```sh
npx create-nx-workspace <project-name> --preset=nest --packageManager=pnpm
```

# Create Applications
```sh
npx nx g @nx/nest:app <app-name>
```

# Create Libraries
```sh
npx nx g @nx/nest:lib <lib-name>
```

# Add Microservice Dependency
```sh
pnpm add @nestjs/microservices
```

# Add RabbitMQ Dependency
```sh
pnpm add amqplib amqp-connection-manager
```

# Add Drizzle and Postgres Dependency for ORM
```sh
pnpm add drizzle-orm postgres
pnpm add -D drizzle-kit
```

# Add NestJS - Mailer and Ejs Dependency
```sh
pnpm add @nestjs-modules/mailer nodemailer ejs
```

# Add Passport and Passport-Local Dependency
```sh
pnpm add @nestjs/passport passport passport-local
pnpm add -D @types/passport-local
```

# Add JWT Dependency
```sh
pnpm add @nestjs/jwt passport-jwt
pnpm add -D @types/passport-jwt
```

# Add Google OAuth Dependency
```sh
pnpm add passport-google-oauth20
pnpm add -D @types/passport-google-oauth20
```
