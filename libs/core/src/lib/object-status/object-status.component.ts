import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { applyCssClass, CssClassBuilder } from '../utils/public_api';

type ObjectStatus = 'negative' | 'critical' | 'positive' | 'informative';

@Component({
    // tslint:disable-next-line:component-selector
    selector: '[fd-object-status]',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./object-status.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectStatusComponent implements OnInit, OnChanges, CssClassBuilder {

    /** User's custom classes */
    private _class: string = '';
    @Input()
    set class(userClass: string) {
        this._class = userClass;
        this.buildComponentCssClass();
    }

    /** 
     * The status represented by the Object Status.
     * Can be one of the following: 'negative' | 'critical' | 'positive' | 'informative'
     * For default Object Status omit this property
     */
    private _status: ObjectStatus;
    @Input()
    set status(status: ObjectStatus) {
        this._status = status;
        this.buildComponentCssClass();
    }

    get status(): ObjectStatus {
        return this._status;
    }

    /** 
     * Glyph (icon) of the Object Status.
     */
    private _glyph: string;
    @Input()
    set glyph(glyph: string) {
        this._glyph = glyph;
        this.buildComponentCssClass();
    }

    get glyph(): string {
        return this._glyph;
    }

    /** 
     * A number representing the indication color. 
     * Option includes numbers from 1 to 8
     */
    private _indicationColor: number = null;
    @Input()
    set indicationColor(indicationColor: number) {
        this._indicationColor = indicationColor;
        this.buildComponentCssClass();
    }

    get indicationColor(): number {
        return this._indicationColor;
    }

    /** Whether the Object Status is clickable. */
    private _clickable: boolean = false;
    @Input()
    set clickable(clickable: boolean) {
        this._clickable = clickable;
        this.buildComponentCssClass();
    }

    get clickable(): boolean {
        return this._clickable;
    }

    /** Whether the Object Status is inverted. */
    private _inverted: boolean = false;
    @Input()
    set inverted(inverted: boolean) {
        this._inverted = inverted;
        this.buildComponentCssClass();
    }

    get inverted(): boolean {
        return this._inverted;
    }

    /** Whether the Object Status is in Large Design. */
    private _large: boolean = false;
    @Input()
    set large(large: boolean) {
        this._large = large;
        this.buildComponentCssClass();
    }

    get large(): boolean {
        return this._large;
    }

    @applyCssClass
    /** CssClassBuilder interface implementation
     * function must return single string
     * function is responsible for order which css classes are applied
     */
    buildComponentCssClass(): string {
        return [
            'fd-object-status',
            this._inverted ? 'fd-object-status--inverted' : '',
            this._large ? 'fd-object-status--large' : '',
            this._status ? `fd-object-status--${this._status}` : '',
            this._glyph ? `sap-icon--${this._glyph}` : '',
            this._indicationColor ? `fd-object-status--indication-${this._indicationColor}` : '',
            this._clickable ? 'fd-object-status--link' : '',
            this._class
        ].filter(x => x !== '').join(' ');
    }

    /** @hidden */
    constructor(private _elementRef: ElementRef) { }

    /** @hidden */
    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    /** @hidden */
    elementRef(): ElementRef<any> {
        return this._elementRef;
    }

    /** @hidden */
    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

}
