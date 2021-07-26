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
    extraButtonOffset = 0;

    private _onDestroy$ = new Subject();

    constructor(
        private _el: ElementRef,
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        console.log('changsssssses', changes);
        if (changes.isRtl && !changes.isRtl.firstChange) {
            debugger;
            this.calculatePosition();
        }
    }

    ngAfterViewInit(): void {
        fromEvent(window, 'resize')
            .pipe(
                debounceTime(50),
                distinctUntilChanged(),
                takeUntil(this._onDestroy$),
            )
            .subscribe((_ =>  this.calculatePosition()));

        setTimeout(() => this.calculatePosition());
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

     calculatePosition(): void {
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
            ? myPosition - margin - this.extraButtonOffset
            : myPosition + margin + this.extraButtonOffset;


        this._el.nativeElement.style.left = `${myPositionWithOffset}px`;
    }
}
