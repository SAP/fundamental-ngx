import {
    Component,
    ViewEncapsulation,
    ChangeDetectionStrategy,
    Input,
    OnInit,
    ElementRef,
    OnChanges
} from '@angular/core';
import { CssClassBuilder, applyCssClass } from '../utils/public_api';

export type LabelType = 'numeric' | 'only-icon' | 'icon';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-info-label]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./info-label.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoLabelComponent implements OnInit, OnChanges, CssClassBuilder {
    /** user's custom classes */
    @Input()
    class: string = '';

    /**
     * The LabelType represented by the info label .
     * Can be one of the following: 'numeric' | 'only-icon' | 'icon'
     * For default info label omit this property
     */
    @Input()
    type: LabelType;

    /** glyph define the icon of info label */
    @Input()
    glyph: string;

    /**define the colour of the info label starting form 1 to 10 */
    @Input()
    color: string;

    @applyCssClass
    buildComponentCssClass(): string {
        return [
            'fd-info-label',
            this.type ? `fd-info-label--${this.type}` : '',
            this.glyph ? `sap-icon--${this.glyph}` : '',
            this.color ? `fd-info-label--accent-color-${this.color}` : '',
            this.class
        ]
            .filter((x) => x !== '')
            .join(' ');
    }

    /** @hidden */
    constructor(private _elementRef: ElementRef) {}

    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}
