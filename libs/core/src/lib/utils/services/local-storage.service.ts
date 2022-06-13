import { Injectable } from '@angular/core';

class MockStorage {
    readonly length: number;

    key(index: number): any {}

    clear(): void {}

    getItem(key: string): any {}

    removeItem(key: string): void {}

    setItem(key: string, value: string): void {}
}

@Injectable({ providedIn: 'root' })
export class LocalStorageService {
    private _storage: Storage;

    constructor() {
        typeof localStorage !== 'undefined' ? (this._storage = localStorage) : (this._storage = new MockStorage());
    }

    get(key: string): any {
        const value = this._storage.getItem(key);
        if (value) {
            return JSON.parse(value);
        }
        return null;
    }

    set(key: string, value: any): void {
        this._storage.setItem(key, JSON.stringify(value));
    }
}
