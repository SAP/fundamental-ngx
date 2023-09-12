import { ElementRef, inject, Renderer2 } from '@angular/core';
import { Observable } from 'rxjs';

/**
 * Returns Observable that emits when element is clicked. Uses Renderer2 to listen to events.
 * @param element
 * @param renderer
 */
export function elementClick$(
    element: ElementRef<HTMLElement> | HTMLElement,
    renderer: Renderer2 = inject(Renderer2)
): Observable<MouseEvent | KeyboardEvent> {
    return new Observable<MouseEvent | KeyboardEvent>((observer) => {
        const cleanups: (() => void)[] = [
            renderer.listen(element, 'click', (event) => observer.next(event)),
            renderer.listen(element, 'keydown.enter', (event) => observer.next(event)),
            renderer.listen(element, 'keydown.space', (event) => {
                event.preventDefault();
                observer.next(event);
            })
        ];
        return () => cleanups.forEach((cleanup) => cleanup());
    });
}
