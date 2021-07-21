import { AfterViewInit, Directive, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, takeUntil } from 'rxjs/operators';

@Directive({
    selector: '[fdExtraButton]'
})
export class ExtraButtonDirective implements OnChanges, AfterViewInit, OnDestroy {

    @Input()
    anchorIndexInsideParent: number;

    @Input()
    isRtl: boolean;

    @Input()
    offset = 0;

    private _onDestroy$ = new Subject();

    constructor(
        private _el: ElementRef,
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.isRtl && !changes.isRtl.firstChange) {
            this._calculatePosition();
        }
    }

    ngAfterViewInit(): void {
        fromEvent(window, 'resize')
            .pipe(
                debounceTime(50),
                distinctUntilChanged(),
                takeUntil(this._onDestroy$),
            )
            .subscribe((_ =>  this._calculatePosition()));

        setTimeout(() => this._calculatePosition());
    }

     _calculatePosition(): void {
        const nativeEl = this._el.nativeElement;
        const parent = nativeEl.parentElement;

        const anchor = parent.children[this.anchorIndexInsideParent];
        const computed = getComputedStyle(anchor);

        const myPosition = this.isRtl
            ? anchor.offsetLeft - nativeEl.offsetWidth
            : anchor.offsetLeft + anchor.offsetWidth;

        const margin = this.isRtl
            ? parseInt(computed.marginLeft, 10)
            : parseInt(computed.marginRight, 10);

        const myPositionWithOffset = this.isRtl
            ? myPosition - margin - this.offset
            : myPosition + margin + this.offset;


        this._el.nativeElement.style.left = `${myPositionWithOffset}px`;
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }
}
