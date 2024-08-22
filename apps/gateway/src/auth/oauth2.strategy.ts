import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-oauth2';

@Injectable()
export class OAuth2Strategy extends PassportStrategy(Strategy, 'oauth2') {
  constructor() {
    super(
      {
        authorizationURL:
          'https://keycloak.luyleun-dev.kunapheap.com/realms/luyleun/protocol/openid-connect/auth',
        tokenURL:
          'https://keycloak.luyleun-dev.kunapheap.com/realms/luyleun/protocol/openid-connect/token',
        clientID: 'luyleun-client',
        clientSecret: 'ub9UatlI0ffVwa3EIoPYen0u03YSt2Y3',
        callbackURL: 'http://localhost:3000/api/auth/oauth2/callback',
        scope: 'profile',
      },
      async (
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: VerifyCallback
      ) => {
        return this.validate(accessToken, refreshToken, profile, done);
      }
    );
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback
  ) {
    try {
      const user = {
        accessToken,
        refreshToken,
        profile,
      };
      return done(null, user);
    } catch (err) {
      return done(err, false);
    }
  }
}
