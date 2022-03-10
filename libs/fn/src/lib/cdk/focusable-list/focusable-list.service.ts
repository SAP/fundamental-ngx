import { Injectable, OnDestroy } from '@angular/core';
import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';
import { fromEvent, merge, Subject } from 'rxjs';
import { HasElementRef } from '../has-element-ref';
import { takeUntil, tap } from 'rxjs/operators';

interface FocusableListConfig {
    wrap?: boolean;
    direction?: 'vertical' | 'horizontal';
    contentDirection?: 'ltr' | 'rtl' | null;
}

export type FocusableItem = FocusableOption & HasElementRef & { focusable: (() => boolean) | boolean };

@Injectable()
export class FocusableListService implements OnDestroy {
    keyManager?: FocusKeyManager<FocusableItem>;
    _refresh$ = new Subject<void>();

    private _destroy$ = new Subject<void>();

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
        const events$ = items.map((item) => fromEvent<KeyboardEvent>(item.elementRef().nativeElement, 'keydown'));
        merge(...events$)
            .pipe(
                tap((keydownEvent: KeyboardEvent) => this.keyManager?.onKeydown(keydownEvent)),
                takeUntil(merge(this._refresh$, this._destroy$))
            )
            .subscribe();
    }

    ngOnDestroy(): void {
        this._destroy$.next();
    }
}
