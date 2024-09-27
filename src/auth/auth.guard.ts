import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request)

    const ownerID = this.extractOwnerIdFromRequest(request);

    if (ownerID) {
      request.body.ownerID = ownerID;
      return true;
    }

    return false;
  }

  extractOwnerIdFromRequest(request: any): number | null {
    const authHeader = request.headers['authorization'];
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1];
    try {
      const decoded = this.jwtService.decode(token) as { sub: number };
      return decoded.sub || null;
    } catch (error) {
      return null;
    }
  }
}
