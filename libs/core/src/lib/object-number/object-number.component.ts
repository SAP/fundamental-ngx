import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/core/utils';
import { Nullable } from '@fundamental-ngx/core/shared';
import { SkeletonConsumerDirective, skeletonConsumerProviders } from '@fundamental-ngx/core/skeleton';

type ObjectStatus = 'negative' | 'critical' | 'positive' | 'informative';

@Component({
    selector: 'fd-object-number',
    templateUrl: './object-number.component.html',
    styleUrls: ['./object-number.component.scss'],
    host: {
        '[attr.aria-labelledby]': 'ariaLabelledBy',
        '[attr.aria-label]': 'ariaLabel'
    },
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: skeletonConsumerProviders({ width: '5rem', height: '1.25rem' })
})
export class ObjectNumberComponent implements OnInit, OnChanges, CssClassBuilder {
    /**
     * Numerical value of the object number.
     */
    @Input()
    number: number;

    /**
     * Number of decimal places to show
     */
    @Input()
    decimal = 0;

    /** Sets unit of measure displayed. */
    @Input()
    unit: string;

    /** Set the value to true to display the object number in bold text */
    @Input()
    emphasized = false;

    /** Set the value to true to display the object number in large text */
    @Input()
    large = false;

    /** Sets status/semantic color  'negative' / 'critical' / 'positive' / 'informative' */
    @Input()
    status: ObjectStatus;

    /** User's custom classes */
    @Input()
    class: string;

    /** Id of the element that labels object number. */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /** Aria label for the object number. */
    @Input()
    ariaLabel: Nullable<string>;

    /** @hidden */
    _numberPipeConfig = '';

    /** @hidden */
    constructor(private _elementRef: ElementRef, private readonly _skeletonConsumer: SkeletonConsumerDirective) {
        _skeletonConsumer.consume();
    }

    /** @hidden */
    ngOnChanges(): void {
        this._onChanges();
    }

    /** @hidden */
    ngOnInit(): void {
        this._onChanges();
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string[] {
        return [
            'fd-object-number',
            this.large ? 'fd-object-number--large' : '',
            this.status ? `fd-object-number--${this.status}` : '',
            this.class
        ];
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** @hidden */
    private _onChanges(): void {
        this.buildComponentCssClass();
        this._buildNumberPipeConfig();
    }

    /** @hidden */
    private _buildNumberPipeConfig(): void {
        this._numberPipeConfig = `0.${this.decimal}-${this.decimal}`;
    }
}
