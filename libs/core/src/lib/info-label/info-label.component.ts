import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { IconFont } from '@fundamental-ngx/core/icon';
import { SkeletonConsumerDirective, skeletonConsumerProviders } from '@fundamental-ngx/core/skeleton';
import { applyCssClass, CssClassBuilder } from '@fundamental-ngx/core/utils';
import { Nullable } from '@fundamental-ngx/core/shared';

export type LabelType = 'numeric' | 'icon';

@Component({
    selector: 'fd-info-label',
    templateUrl: './info-label.component.html',
    styleUrls: ['./info-label.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: skeletonConsumerProviders({ width: '5rem', height: '1.25rem' })
})
export class InfoLabelComponent implements OnInit, OnChanges, CssClassBuilder {
    /** User's custom classes */
    @Input()
    class = '';

    /**
     * The LabelType represented by the info label .
     * For default info label omit this property
     */
    @Input()
    type: LabelType;

    /** The icon name to display. See the icon page for the list of icons
     * here: https://sap.github.io/fundamental-ngx/icon
     * */
    @Input()
    glyph: Nullable<string>;

    /**
     * The icon font
     * Options include: 'SAP-icons', 'BusinessSuiteInAppSymbols' and 'SAP-icons-TNT'
     */
    @Input()
    font: IconFont = 'SAP-icons';

    /** Define the colour of the info label starting form 1 to 10 */
    @Input()
    color: string;

    /** Define the text content of the info label */
    @Input()
    label: string;

    /** Define the tooltip content of the info label */
    @Input()
    title: string;

    /** Define the ariaLabel content of the info label */
    @Input()
    ariaLabel: Nullable<string>;

    /** Define the labelled by content of the info label */
    @Input()
    ariaLabelledBy: Nullable<string>;

    /** @hidden */
    constructor(private _elementRef: ElementRef, private readonly _skeletonConsumer: SkeletonConsumerDirective) {
        _skeletonConsumer.consume();
    }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    elementRef(): ElementRef {
        return this._elementRef;
    }

    /** @hidden */
    @applyCssClass
    buildComponentCssClass(): string[] {
        return [
            'fd-info-label',
            this.type ? `fd-info-label--${this.type}` : '',
            this.color ? `fd-info-label--accent-color-${this.color}` : '',
            this.class
        ];
    }
}
