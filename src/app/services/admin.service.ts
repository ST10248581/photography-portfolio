import { Injectable } from '@angular/core';

/** Change this PIN to secure admin access */
export const ADMIN_PIN = '1234';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private authenticated = false;

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  authenticate(pin: string): boolean {
    if (pin === ADMIN_PIN) {
      this.authenticated = true;
      return true;
    }
    return false;
  }

  logout(): void {
    this.authenticated = false;
  }
}
