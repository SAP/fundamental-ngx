import { Injectable } from '@angular/core';

class MockStorage {
    readonly length: number;

    // eslint-disable-next-line
    key(index: number): any {}

    clear(): void {}

    // eslint-disable-next-line
    getItem(key: string): any {}

    // eslint-disable-next-line
    removeItem(key: string): void {}

    // eslint-disable-next-line
    setItem(key: string, value: string): void {}
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    /** @hidden */
    private _storage: Storage;

    /** @hidden */
    constructor() {
        typeof localStorage !== 'undefined' ? (this._storage = localStorage) : (this._storage = new MockStorage());
    }

    /** Get item from local storage. */
    get(key: string): any {
        const value = this._storage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
        return null;
    }

    /** Set item in local storage. */
    set(key: string, value: any): void {
        this._storage.setItem(key, JSON.stringify(value));
    }
}
