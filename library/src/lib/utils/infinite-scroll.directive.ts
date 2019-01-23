import { Directive, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';

@Directive({
    selector: '[fdInfiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit {

    @Output()
    onScrollAction = new EventEmitter<any>();

    @Input()
    scrollPercent: number = 75;

    private scrollEvent: Observable<any>;

    constructor(private element: ElementRef) {}

    ngOnInit(): void {
        this.scrollEvent = fromEvent(this.element.nativeElement, 'scroll');

        this.scrollEvent.subscribe((e: any) => {
            if ((e.target.scrollTop + e.target.offsetHeight) / e.target.scrollHeight > this.scrollPercent / 100) {
                this.onScrollAction.emit(null);
            }
        });
    }

}
