import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';

export type LabelType = 'numeric' | 'icon';

@Component({
    // tslint:disable-next-line:component-selector
    // TODO @salarenko: DEPRECATED DIRECTIVE APPROACH - Remove in v0.23.0
    selector: 'fd-info-label, [fd-info-label]',
    templateUrl: './info-label.component.html',
    styleUrls: ['./info-label.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
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

    /** Glyph define the icon of info label */
    @Input()
    glyph: string;

    /** Define the colour of the info label starting form 1 to 10 */
    @Input()
    color: string;

    /** Define the text content of the info label */
    @Input()
    label: string;

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

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
