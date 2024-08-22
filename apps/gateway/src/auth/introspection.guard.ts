import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class IntrospectionGuard extends AuthGuard('introspection') implements CanActivate {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }
}
