import type { APIRequestContext, APIResponse } from '@playwright/test';

import { authTokenSchema } from '../contracts/auth.js';
import type { LoginCredentials } from '../contracts/auth.js';

export class AuthClient {
  public constructor(private readonly request: APIRequestContext) {}

  public authenticate(credentials: Partial<LoginCredentials>): Promise<APIResponse> {
    return this.request.post('auth/login', {
      data: credentials,
    });
  }

  public async login(username: string, password: string): Promise<string> {
    const response = await this.authenticate({ username, password });

    if (!response.ok()) {
      throw new Error(`Login failed with ${response.status()}: ${await response.text()}`);
    }

    const body: unknown = await response.json();
    return authTokenSchema.parse(body).token;
  }
}
