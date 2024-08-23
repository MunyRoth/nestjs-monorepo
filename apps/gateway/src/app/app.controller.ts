import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AppService } from './app.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { AuthService } from '../auth/auth.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { IntrospectionGuard } from '../auth/introspection.guard';
import { CombinedGuard } from '../auth/combined.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @Get('data')
  getData() {
    return this.appService.getData();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('auth/refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    return this.authService.refresh(refreshToken);
  }

  @Get('auth/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return 'Google login';
  }

  @Get('auth/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Request() req) {
    return req.user;
    // return this.authService.login(req.user);
  }

  @Get('auth/facebook')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuth() {
    return 'Facebook login';
  }

  @Get('auth/facebook/callback')
  @UseGuards(AuthGuard('facebook'))
  async facebookAuthRedirect(@Request() req) {
    return req.user;
    // return this.authService.login(req.user);
  }

  @Get('auth/oauth2')
  @UseGuards(AuthGuard('oauth2'))
  async loginOAuth2() {
    return 'OAuth2 login';
  }

  @Get('auth/oauth2/callback')
  @UseGuards(AuthGuard('oauth2'))
  async loginOAuth2Redirect(@Request() req) {
    return req.user;
    // return this.authService.login(req.user);
  }

  @Get('protected')
  @UseGuards(CombinedGuard)
  getProtectedResource(@Request() req) {
    return { message: 'This is a protected resource', user: req.user };
  }

  @Get('introspection')
  @UseGuards(IntrospectionGuard)
  getIntrospectionProtectedResource(@Request() req) {
    return { message: 'This is an introspection protected resource', user: req.user };
  }

  @Get('jwt')
  @UseGuards(JwtAuthGuard)
  getJwtProtectedResource(
    @Request() req: { user: { userId: number; username: string } }
  ) {
    return { message: 'This is a JWT protected resource', user: req.user };
  }
}
