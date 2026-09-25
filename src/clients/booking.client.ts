import type { APIRequestContext, APIResponse } from '@playwright/test';

import type { BookingInput } from '../contracts/booking.js';

export class BookingClient {
  public constructor(private readonly request: APIRequestContext) {}

  public getAll(token: string, roomId?: number): Promise<APIResponse> {
    return this.request.get('booking/', {
      headers: this.authHeaders(token),
      params: roomId ? { roomid: roomId } : {},
    });
  }

  public getById(token: string, bookingId: number): Promise<APIResponse> {
    return this.request.get(`booking/${bookingId}`, {
      headers: this.authHeaders(token),
    });
  }

  public create(token: string, booking: BookingInput): Promise<APIResponse> {
    return this.request.post('booking/', {
      headers: this.authHeaders(token),
      data: booking,
    });
  }

  public update(token: string, bookingId: number, booking: BookingInput): Promise<APIResponse> {
    return this.request.put(`booking/${bookingId}`, {
      headers: this.authHeaders(token),
      data: booking,
    });
  }

  public delete(token: string, bookingId: number): Promise<APIResponse> {
    return this.request.delete(`booking/${bookingId}`, {
      headers: this.authHeaders(token),
    });
  }

  private authHeaders(token: string): Record<string, string> {
    return { Cookie: `token=${token}` };
  }
}
