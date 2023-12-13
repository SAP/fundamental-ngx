import { Injectable, WritableSignal, signal } from '@angular/core';

@Injectable()
export class NavigationService {
    /** @ignore */
    hiddenItems: WritableSignal<Map<HTMLElement, boolean>> = signal(new Map());
}
