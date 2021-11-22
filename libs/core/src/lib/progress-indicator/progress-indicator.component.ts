import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    OnChanges,
    SimpleChanges,
    ElementRef,
    AfterViewInit,
    ViewChild,
    ChangeDetectorRef
} from '@angular/core';

export type ProgressIndicatorState = 'informative' | 'positive' | 'critical' | 'negative';

@Component({
    selector: 'fd-progress-indicator',
    templateUrl: './progress-indicator.component.html',
    styleUrls: ['./progress-indicator.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressIndicatorComponent implements OnChanges, AfterViewInit {
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
    state: ProgressIndicatorState;

    /** Whether or not to animate changes to the progress bar's valueNow. */
    @Input()
    animate = false;

    /** @hidden */
    hasPopover = false;

    /** @hidden */
    @ViewChild('progressIndicator', { read: ElementRef })
    _progressIndicator: ElementRef;

    constructor(private _elementRef: ElementRef, private _cdRef: ChangeDetectorRef) {}

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.valueText) {
            this._handleTruncation();
        }
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
