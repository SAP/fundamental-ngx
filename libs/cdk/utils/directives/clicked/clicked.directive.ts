import { DestroyRef, Directive, ElementRef, inject, output, Renderer2 } from '@angular/core';
import { fromEvent, merge, Subject } from 'rxjs';

@Directive({
    selector: '[fdkClicked]',
    standalone: true
})
export class ClickedDirective {
    /**
     * Event name.
     */
    static eventName = 'fdkClicked';

    /**
     * Event emitted when user either clicks with mouse, or
     * clicks on space or enter keys
     */
    readonly fdkClicked = output<MouseEvent | KeyboardEvent>();

    /** @hidden */
    constructor() {
        const { nativeElement: element } = inject<ElementRef<HTMLElement>>(ElementRef);
        const renderer = inject(Renderer2);
        const destroyRef = inject(DestroyRef);
        const enter$ = new Subject<KeyboardEvent>();
        const space$ = new Subject<KeyboardEvent>();

        destroyRef.onDestroy(renderer.listen(element, 'keydown.enter', (e) => enter$.next(e)));
        destroyRef.onDestroy(renderer.listen(element, 'keydown.space', (e) => space$.next(e)));

        destroyRef.onDestroy(() => {
            enter$.complete();
            space$.complete();
        });

        // Subscribe to merged events and emit through output
        const subscription = merge(fromEvent<MouseEvent>(element, 'click'), enter$, space$).subscribe((event) => {
            this.fdkClicked.emit(event);
        });
        destroyRef.onDestroy(() => subscription.unsubscribe());
    }
}
