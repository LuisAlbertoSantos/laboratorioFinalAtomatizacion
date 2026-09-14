import { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiLoginTech {
  [x: string]: any;
  // Inyección de dependencias de Playwright
  private request: APIRequestContext;
  private baseUrl: string;

  constructor(request: APIRequestContext, baseUrl: string = 'https://techstore-demo-05ad.onrender.com') {
    this.request = request; // Permite usar el cliente HTTP de Playwright
    this.baseUrl = baseUrl;
  }

  // Método dedicado exclusivamente a la acción del Login
  async login(credentials: { username?: string; password?: string }): Promise<APIResponse> {
    return await this.request.post(`${this.baseUrl}/api/auth/login`, {
      headers: { 'Content-Type': 'application/json' },
      data: credentials,
      timeout: 60000
    });
  }
}