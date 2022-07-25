import { Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';
import { finalize, fromEvent, merge, Subject } from 'rxjs';
import { HasElementRef } from '../has-element-ref';
import { takeUntil, tap } from 'rxjs/operators';
import { getNativeElement } from '@fundamental-ngx/fn/utils';

interface FocusableListConfig {
    wrap?: boolean;
    direction?: 'vertical' | 'horizontal';
    contentDirection?: 'ltr' | 'rtl' | null;
}

export type FocusableItem = FocusableOption & HasElementRef & { focusable: (() => boolean) | boolean; index: number };

@Injectable()
export class FocusableListService implements OnDestroy {
    keyManager?: FocusKeyManager<FocusableItem>;
    _refresh$ = new Subject<void>();

    private _destroy$ = new Subject<void>();

    constructor(private _renderer: Renderer2) {}

    initialize(items: FocusableItem[], config: FocusableListConfig = {}): void {
        this._refresh$.next();
        let keyManager = new FocusKeyManager<any>(items);
        if (config.wrap !== false) {
            keyManager = keyManager.withWrap();
        }
        if (config.direction === 'horizontal') {
            keyManager = keyManager.withHorizontalOrientation(config.contentDirection || 'ltr'); // should be replaced
        }
        keyManager.skipPredicate((item) => {
            const focusable = typeof item.focusable === 'boolean' ? item.focusable : item.focusable();
            return !focusable;
        });
        this.keyManager = keyManager;
        const events$ = items.map((item) => fromEvent<KeyboardEvent>(getNativeElement(item), 'keydown'));
        const focusListenerDestroyers = items.map((item) =>
            this._renderer.listen(getNativeElement(item), 'focus', () => this.keyManager?.setActiveItem(item.index))
        );
        merge(...events$)
            .pipe(
                tap((keydownEvent: KeyboardEvent) => this.keyManager?.onKeydown(keydownEvent)),
                takeUntil(merge(this._refresh$, this._destroy$)),
                finalize(() => {
                    focusListenerDestroyers.forEach((d) => d());
                })
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this._destroy$.next();
    }
}
