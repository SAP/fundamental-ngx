import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input, OnInit, ElementRef, OnChanges } from '@angular/core';
import { CssClassBuilder, applyCssClass } from '../utils/public_api';

type LabelType = 'numeric' | 'only-icon' | 'icon';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-info-label]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./info-label.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoLabelComponent implements OnInit, OnChanges, CssClassBuilder {
  
    /** 
     * The LabelType represented by the info label .
     * Can be one of the following: 'numeric' | 'only-icon' | 'icon'
     * For default info label omit this property
     */
    private _labelType: LabelType;
    
    @Input()
    set labelType(value: LabelType) {
        this._labelType = value;
        this.buildComponentCssClass();
    }

    get labelType(): LabelType {
        return this._labelType;
    }

    /** glyph define the icon of info label */
    private _glyph: string; 

    @Input()
    set glyph(value: string) {
        this._glyph = value;
        this.buildComponentCssClass();
    }

    get glyph(): string {
        return this._glyph;
    }

    /**define the colour of the info label starting form 1 to 10 */
    private _color: string;
    
    @Input()
    set color(value: string) {
        this._color = value;
        this.buildComponentCssClass();
    }

    get color(): string {
        return this._color;
    }


    private _class: string = '';

    @Input()
    set class(value: string) {
        this._class = value;
        this.buildComponentCssClass();
    }

    get class(): string {
        return this._class;
    }

    @applyCssClass
    buildComponentCssClass(): string {
        return [
            'fd-info-label',
            this._labelType ? `fd-info-label--${this._labelType}` : '',
            this._glyph ? `sap-icon--${this._glyph}` : '',
            this._color ? `fd-info-label--accent-color-${this._color}` : '',
            this._class
        ].filter(x => x !== '').join(' ');
    }

    /** @hidden */
    constructor(private _elementRef: ElementRef) {
    }

    ngOnInit(): void  {
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
