import { ElementRef, Injectable, OnDestroy, Renderer2 } from '@angular/core';
import { merge, Subject, Subscription } from 'rxjs';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { tap } from 'rxjs/operators';

@Injectable()
export class FnClickedProvider extends Subject<MouseEvent | KeyboardEvent> implements OnDestroy {
    private eventsSubscription: Subscription;
    private _preventDefault = true;
    private readonly _clickListener: () => void;
    private readonly _keydownListener: () => void;

    constructor(private _elementRef: ElementRef<Element>, private _renderer: Renderer2) {
        super();
        const click$ = new Subject<MouseEvent>();
        const keyboard$ = new Subject<KeyboardEvent>();
        this._clickListener = _renderer.listen(this._elementRef.nativeElement, 'click', (e: MouseEvent) =>
            click$.next(e)
        );
        this._keydownListener = _renderer.listen(this._elementRef.nativeElement, 'keydown', (e: KeyboardEvent) => {
            if (e.keyCode === ENTER || e.keyCode === SPACE) {
                keyboard$.next(e);
            }
        });
        this.eventsSubscription = merge(click$, keyboard$)
            .pipe(tap((e) => this._preventDefault && e.preventDefault()))
            .pipe(tap((e) => this.next(e)))
            .subscribe();
    }

    setPreventDefault(val: boolean): void {
        this._preventDefault = val;
    }

    ngOnDestroy(): void {
        this._clickListener();
        this._keydownListener();
        this.eventsSubscription.unsubscribe();
        this.complete();
    }
}
