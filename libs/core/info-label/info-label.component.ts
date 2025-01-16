import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    inject,
    Input,
    isDevMode,
    OnChanges,
    OnInit,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';
import { applyCssClass, CssClassBuilder, HasElementRef, Nullable } from '@fundamental-ngx/cdk/utils';
import { IconComponent, IconFont } from '@fundamental-ngx/core/icon';

export type LabelType = 'numeric' | 'icon';
const labelColorRange = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type InfoLabelColor = (typeof labelColorRange)[number];
export type InfoLabelColorInput = InfoLabelColor | `${InfoLabelColor}`;

@Component({
    selector: 'fd-info-label',
    templateUrl: './info-label.component.html',
    styleUrl: './info-label.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [IconComponent]
})
export class InfoLabelComponent implements OnInit, OnChanges, CssClassBuilder, HasElementRef {
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
    color: Nullable<InfoLabelColorInput> = 7;

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
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

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

    /** @hidden */
    ngOnInit(): void {
        this._validateColorInput();
        this.buildComponentCssClass();
    }

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if (changes.color) {
            this._validateColorInput();
        }
        this.buildComponentCssClass();
    }

    /** @hidden */
    private _validateColorInput(): void {
        const matchingColor = labelColorRange.find((color) => color === Number(this.color));
        if (!matchingColor) {
            if (isDevMode()) {
                console.warn(`Invalid color input: ${this.color}. Please provide a number between 1 and 10`);
            }
            this.color = 7;
        }
    }
}
