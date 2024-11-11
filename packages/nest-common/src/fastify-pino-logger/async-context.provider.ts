import { Injectable, OnModuleInit } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

@Injectable()
export class AsyncContextProvider implements OnModuleInit {
  private readonly asyncLocalStorage = new AsyncLocalStorage<
    Map<string, any>
  >();

  onModuleInit() {}

  run(callback: () => void, store: Map<string, any>) {
    this.asyncLocalStorage.run(store, callback);
  }

  get<T>(key: string): T | undefined {
    const store = this.asyncLocalStorage.getStore();
    return store?.get(key);
  }

  set(key: string, value: any) {
    const store = this.asyncLocalStorage.getStore();
    if (store) {
      store.set(key, value);
    }
  }
}
