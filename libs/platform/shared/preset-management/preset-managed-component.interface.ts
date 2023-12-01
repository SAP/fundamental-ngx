import { EventEmitter } from '@angular/core';

export interface PresetManagedComponent<T> {
    name: string;
    presetChanged: EventEmitter<T>;
    setPreset(data: T): void;
    getCurrentPreset(): T;
}
