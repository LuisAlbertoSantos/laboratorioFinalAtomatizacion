import { APIRequestContext, request as playwrightRequest } from '@playwright/test';

interface LoginResponse {
  token: string;
}

export class AuthService {
  private request?: APIRequestContext;
  private baseURL: string;

  constructor(request?: APIRequestContext, baseURL?: string) {
    this.request = request;
    this.baseURL = baseURL || "https://techstore-demo-05ad.onrender.com";
  }

  async getToken(username: string, pass: string): Promise<string> {
    // Si no hay un request inyectado, creamos uno temporal para el login
    const req = this.request || (await playwrightRequest.newContext());
    
    const loginResponse = await req.post(`${this.baseURL}/api/auth/login`, {
      data: {
        username: username,
        password: pass,
      },
    });

    if (!loginResponse.ok()) {
      throw new Error(`Error en el login. Status: ${loginResponse.status()}`);
    }

    const loginData = (await loginResponse.json()) as LoginResponse;
    
    // Si creamos el contexto temporal, lo cerramos
    if (!this.request) {
      await req.dispose();
    }

    return loginData.token;
  }
}