import {
    Directive,
    AfterViewInit,
    Output,
    EventEmitter,
    ElementRef
} from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

/**
 * Iframe element has the onerror event but it never gets called in our cases.
 * So we have to find another way to detect iframe error
 * Directive requests a resource and throws an error when response code is not between >= 200 <= 299
 */
@Directive({
    selector: '[fdsIframeError]'
})
export class IframeErrorDirective implements AfterViewInit {
    @Output()
    fdsError = new EventEmitter<void>();

    constructor(private elementRef: ElementRef) { }

    ngAfterViewInit() {
        this.listenLoadEvent();
    }

    private listenLoadEvent() {
        fromEvent(this.elementRef.nativeElement, 'load')
            .pipe(
                debounceTime(100),
                distinctUntilChanged()
            )
            .subscribe(() => {
                this.onLoadEvent();
            });
    }

    private onLoadEvent() {
        const url = this.elementRef.nativeElement.getAttribute('src');

        if (url && url.trim() !== '') {
            this.requestResource(url);
        }
    }

    private requestResource(url: string) {
        const request = new Request(url);

        window.fetch(request)
            .then((response) => {
                if (!response.ok) {
                    this.dispatchError();
                }
            })
            .catch(() => {
                this.dispatchError();
            });
    }

    private dispatchError() {
        this.fdsError.emit();
    }
}
