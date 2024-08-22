import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-strategy';
import axios from 'axios';

@Injectable()
export class IntrospectionStrategy extends PassportStrategy(
  Strategy,
  'introspection'
) {
  private introspectionUrl: string;
  private clientId: string;
  private clientSecret: string;

  constructor() {
    super();
    this.introspectionUrl =
      'https://keycloak.luyleun-dev.kunapheap.com/realms/luyleun/protocol/openid-connect/token/introspect';
    this.clientId = 'luyleun-client';
    this.clientSecret = 'ub9UatlI0ffVwa3EIoPYen0u03YSt2Y3';
  }

  async authenticate(req: any) {
    this.validate(req, (err, user) => {
      if (err || !user) {
        return this.fail(err || { message: 'Unauthorized' }, 401);
      }
      this.success(user);
    });
  }

  async validate(req: any, done: (err: any, user: any) => void) {
    const token = this.extractToken(req);
    if (!token) {
      return done({ message: 'No token provided' }, false);
    }

    try {
      const introspectionResult = await this.introspectToken(token);

      if (!introspectionResult.active) {
        return done({ message: 'Token is inactive' }, false);
      }

      return done(null, introspectionResult);
    } catch (err) {
      return done(err, false);
    }
  }

  private extractToken(req: any): string | null {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return null;
    const [type, token] = authHeader.split(' ');
    return type === 'Bearer' ? token : null;
  }

  private async introspectToken(token: string): Promise<any> {
    const response = await axios.post(
      this.introspectionUrl,
      new URLSearchParams({
        token,
        client_id: this.clientId,
        client_secret: this.clientSecret,
      }).toString(),
      {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }
    );
    return response.data;
  }
}
