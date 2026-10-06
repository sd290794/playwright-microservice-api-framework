import type { APIRequestContext, APIResponse } from '@playwright/test';

export class RoomClient {
  public constructor(private readonly request: APIRequestContext) {}

  public getAll(): Promise<APIResponse> {
    return this.request.get('room/');
  }

  public getById(roomId: number): Promise<APIResponse> {
    return this.request.get(`room/${roomId}`);
  }
}
