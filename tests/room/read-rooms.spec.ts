import { roomListSchema, roomSchema } from '../../src/contracts/room.js';
import { expect, test } from '../fixtures/api.fixture.js';

test.describe('Room retrieval', () => {
  test('lists rooms that match the room contract', async ({ roomClient }) => {
    const response = await roomClient.getAll();

    expect(response.status()).toBe(200);
    const { rooms } = roomListSchema.parse(await response.json());
    expect(rooms.length).toBeGreaterThan(0);
    expect(new Set(rooms.map((room) => room.roomid)).size).toBe(rooms.length);
  });

  test('retrieves a room by ID', async ({ roomClient }) => {
    const listResponse = await roomClient.getAll();
    expect(listResponse.status()).toBe(200);
    const { rooms } = roomListSchema.parse(await listResponse.json());
    const firstRoom = rooms.at(0);
    expect(firstRoom).toBeDefined();
    if (!firstRoom) {
      throw new Error('Expected the Room API to return at least one room');
    }

    const response = await roomClient.getById(firstRoom.roomid);

    expect(response.status()).toBe(200);
    const room = roomSchema.parse(await response.json());
    expect(room).toEqual(firstRoom);
  });
});
