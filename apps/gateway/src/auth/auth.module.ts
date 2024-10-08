import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { GoogleStrategy } from './google.strategy';
import { OAuth2Strategy } from './oauth2.strategy';
import { IntrospectionStrategy } from './introspection.strategy';
import { FacebookStrategy } from './facebook.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: jwtConstants.expiresIn },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    GoogleStrategy,
    FacebookStrategy,
    OAuth2Strategy,
    IntrospectionStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
