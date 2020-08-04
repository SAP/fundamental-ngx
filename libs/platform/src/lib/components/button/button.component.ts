import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { BaseComponent } from '../base';

export type ButtonType =
    | ''
    | 'standard'
    | 'positive'
    | 'negative'
    | 'attention'
    | 'ghost'
    | 'transparent'
    | 'emphasized'
    | 'menu';
@Component({
    selector: 'fdp-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent extends BaseComponent implements AfterViewInit {

    /** The icon to include in the button. See the icon page for the list of icons.
     * Setter is used to control when css class have to be rebuilded.
     * Default value is set to ''.
     */
    @Input()
    glyph: string;

    /** The buttonType of the button. Types includes
     'standard','positive', 'negative', 'attention', 'ghost',
     'transparent', 'emphasized','menu'.
     *Leave empty for default (standard button).'*/
    @Input()
    buttonType: ButtonType;

    /** arialabel, tooltip for truncated text
     * for acccesiblity of the element */
    @Input()
    title?: string;

    /** aria-selected for acccesiblity to
     *  the native HTML button*/
    @Input()
    ariaSelected: boolean;

    /** aria-disabled for acccesiblity to
     *  the native HTML button*/
    @Input()
    ariaDisabled: boolean;

    /** Specifies a name to
     *  the native HTML button */
    @Input()
    name: string;

    /** Specifies the type to
     *  the native HTML button */
    @Input()
    type?: string;

    /** Specifies an initial value to
     *  the native HTML button */
    @Input()
    value?: string;

    /** Event sent when button is clicked */
    @Output()
    buttonClicked = new EventEmitter();

    constructor(protected _changeDetector: ChangeDetectorRef, private _elementRef: ElementRef) {
        super(_changeDetector);
    }

    /**
     *  Handles button click
     */
    public onBtnClick($event: any): void {
        this.buttonClicked.emit($event);
    }

    /**@hidden*/
    ngAfterViewInit(): void {
        this._elementRef.nativeElement.childNodes[0].classList.add('fd-ellipsis');
    }
}
