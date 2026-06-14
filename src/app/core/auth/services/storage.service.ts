import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  setToken(token: string): void {
    if(isPlatformBrowser(this.platformId)){
      localStorage.setItem("token", token);
    }
  }

  getToken(): string | null {
    if(isPlatformBrowser(this.platformId)){
      return localStorage.getItem("token");
    }
    return null;
  }

  removeToken(): void {
    if(isPlatformBrowser(this.platformId)){
      localStorage.removeItem("token");
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
