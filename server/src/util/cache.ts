export type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

export class TTLCache<T> {
  private store = new Map<string, CacheEntry<T>>();

  constructor(private readonly defaultTtlMs: number) {}

  get(key: string): T | undefined {
    const entry = this.store.get(key);
    if (!entry) return undefined;

    if (entry.expiresAt < Date.now()) {
      this.store.delete(key);
      return undefined;
    }

    return entry.value;
  }

  set(key: string, value: T, ttlMs?: number) {
    const expiresAt = Date.now() + (ttlMs ?? this.defaultTtlMs);
    this.store.set(key, { value, expiresAt });
  }

  async getOrSet(
    key: string,
    factory: () => Promise<T>,
    ttlMs?: number
  ): Promise<{ value: T; fromCache: boolean }>;
  async getOrSet(
    key: string,
    factory: () => T,
    ttlMs?: number
  ): Promise<{ value: T; fromCache: boolean }>;
  async getOrSet(key: string, factory: () => T | Promise<T>, ttlMs?: number) {
    const existing = this.get(key);
    if (existing !== undefined) {
      return { value: existing, fromCache: true };
    }

    const value = await factory();
    this.set(key, value, ttlMs);
    return { value, fromCache: false };
  }
}

export const ONE_DAY_MS = 1000 * 60 * 60 * 24;
