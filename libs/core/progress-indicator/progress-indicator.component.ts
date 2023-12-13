import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { resizeObservable } from '@fundamental-ngx/cdk/utils';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

export type ProgressIndicatorState = 'informative' | 'positive' | 'critical' | 'negative';

@Component({
    selector: 'fd-progress-indicator',
    templateUrl: './progress-indicator.component.html',
    styleUrl: './progress-indicator.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [NgTemplateOutlet, PopoverComponent, PopoverControlComponent, PopoverBodyComponent]
})
export class ProgressIndicatorComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {
    /** The text to display if you would like to override the default percentage text. */
    @Input()
    valueText: string;

    /** Custom unit if you would like to override the default percentage. */
    @Input()
    unit = '%';

    /** The minimum value possible for the progress indicator. */
    @Input()
    valueMin = 0;

    /** The maximum value possible for the progress indicator. */
    @Input()
    valueMax = 100;

    /** The current value for the progress indicator. */
    @Input()
    valueNow = 0;

    /** The state for the progress indicator. */
    @Input()
    state?: ProgressIndicatorState;

    /** Whether or not to animate changes to the progress bar's valueNow. */
    @Input()
    animate = false;

    /** @ignore */
    hasPopover = false;

    /** @ignore */
    _progressBarWidth = 0;

    /** @ignore An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @ignore */
    constructor(
        private _elementRef: ElementRef,
        private _cdRef: ChangeDetectorRef
    ) {}

    /** @ignore */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.valueText) {
            this._handleTruncation();
        }

        if ('valueNow' in changes || 'valueMin' in changes || 'valueMax' in changes) {
            this._progressBarWidth = this.calculateProgressBarWidth();
        }
    }

    /** @ignore */
    ngOnInit(): void {
        resizeObservable(this._elementRef.nativeElement)
            .pipe(debounceTime(20), takeUntil(this._onDestroy$))
            .subscribe(() => {
                this._handleTruncation();
            });
    }

    /** @ignore */
    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    /** @ignore */
    ngAfterViewInit(): void {
        this._handleTruncation();
    }

    /** @ignore */
    calculateProgressBarWidth(): number {
        return ((this.valueNow - this.valueMin) / (this.valueMax - this.valueMin)) * 100;
    }

    /** @ignore */
    private _handleTruncation(): void {
        const labelSpan = this._elementRef.nativeElement.querySelector('.fd-progress-indicator__label');
        this.hasPopover = labelSpan && labelSpan.offsetWidth < labelSpan.scrollWidth;
        this._cdRef.detectChanges();
    }
}
