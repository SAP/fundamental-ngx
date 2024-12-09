import { NgTemplateOutlet } from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewEncapsulation,
    inject
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { resizeObservable } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { PopoverBodyComponent, PopoverComponent, PopoverControlComponent } from '@fundamental-ngx/core/popover';
import { debounceTime } from 'rxjs/operators';

export type ProgressIndicatorState = 'informative' | 'positive' | 'critical' | 'negative';

@Component({
    selector: 'fd-progress-indicator',
    templateUrl: './progress-indicator.component.html',
    styleUrl: './progress-indicator.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet, PopoverComponent, PopoverControlComponent, PopoverBodyComponent, IconComponent]
})
export class ProgressIndicatorComponent implements OnInit, OnChanges, AfterViewInit {
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

    /** @hidden */
    hasPopover = false;

    /** @hidden */
    _progressBarWidth = 0;

    /** @hidden An RxJS Subject that will kill the data stream upon component’s destruction (for unsubscribing)  */
    private readonly _destroyRef = inject(DestroyRef);

    /** @hidden */
    constructor(
        private _elementRef: ElementRef,
        private _cdRef: ChangeDetectorRef
    ) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.valueText) {
            this._handleTruncation();
        }

        if ('valueNow' in changes || 'valueMin' in changes || 'valueMax' in changes) {
            this._progressBarWidth = this.calculateProgressBarWidth();
        }
    }

    /** @hidden */
    ngOnInit(): void {
        resizeObservable(this._elementRef.nativeElement)
            .pipe(debounceTime(20), takeUntilDestroyed(this._destroyRef))
            .subscribe(() => {
                this._handleTruncation();
            });
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._handleTruncation();
    }

    /** @hidden */
    calculateProgressBarWidth(): number {
        return ((this.valueNow - this.valueMin) / (this.valueMax - this.valueMin)) * 100;
    }

    /** @hidden */
    private _handleTruncation(): void {
        const labelSpan = this._elementRef.nativeElement.querySelector('.fd-progress-indicator__label');
        this.hasPopover = labelSpan && labelSpan.offsetWidth < labelSpan.scrollWidth;
        this._cdRef.detectChanges();
    }
}
