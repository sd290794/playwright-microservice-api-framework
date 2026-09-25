import type { APIRequestContext } from '@playwright/test';

import { authTokenSchema } from '../contracts/auth.js';

export class AuthClient {
  public constructor(private readonly request: APIRequestContext) {}

  public async login(username: string, password: string): Promise<string> {
    const response = await this.request.post('auth/login', {
      data: { username, password },
    });

    if (!response.ok()) {
      throw new Error(`Login failed with ${response.status()}: ${await response.text()}`);
    }

    const body: unknown = await response.json();
    return authTokenSchema.parse(body).token;
  }
}
