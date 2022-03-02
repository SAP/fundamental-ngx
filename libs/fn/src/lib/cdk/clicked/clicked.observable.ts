import { filter, fromEvent, merge, Subject, Subscription } from 'rxjs';
import { getNativeElement } from '@fundamental-ngx/fn/utils';
import { ElementRef } from '@angular/core';
import { HasElementRef } from '../HasElementRef';
import { ENTER, SPACE } from '@angular/cdk/keycodes';
import { tap } from 'rxjs/operators';

export class ClickedObservable extends Subject<MouseEvent | KeyboardEvent> {
    eventsSubscription: Subscription;

    constructor(element: HasElementRef<Element> | Element | ElementRef<Element>) {
        super();
        const htmlElement = getNativeElement(element);
        const click$ = fromEvent<MouseEvent>(htmlElement, 'click');
        const keyboard$ = fromEvent<KeyboardEvent>(htmlElement, 'keydown').pipe(
            filter(($event) => $event.keyCode === ENTER || $event.keyCode === SPACE)
        );
        this.eventsSubscription = merge(click$, keyboard$)
            .pipe(tap((e) => e.preventDefault()))
            .pipe(tap((e) => this.next(e)))
            .subscribe();
    }

    unsubscribe(): void {
        super.unsubscribe();
        this.eventsSubscription.unsubscribe();
    }
}
