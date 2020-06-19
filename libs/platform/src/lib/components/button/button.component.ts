import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef, AfterViewInit } from '@angular/core';
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
    public glyph: string;

    /** The type of the button. Types includes
    'standard','positive', 'negative', 'attention', 'ghost',
     'transparent', 'emphasized','menu'.
     * Leave empty for default (standard button).'*/
    @Input()
    type: ButtonType;

    /** Tooltip text to show when focused for more*/
    @Input()
    title?: string;

    /** aria-selected for acccesiblity of the element */
    @Input()
    ariaSelected: boolean;

    /** aria-disabled for acccesiblity of the element */
    @Input()
    ariaDisabled: boolean;

    /** Event sent when button is clicked */
    @Output()
    buttonClicked = new EventEmitter();

    @ViewChild('fdButton', { static: true })
    focusEl: ElementRef<HTMLElement>;

    constructor(protected _changeDetector: ChangeDetectorRef, private _elementRef: ElementRef) {
        super(_changeDetector);
    }

    /**
     *  Handles button click
     */
    public onBtnClick($event: any) {
        this.buttonClicked.emit($event);
    }

    /**@hidden*/
    ngAfterViewInit(): void {
        this._elementRef.nativeElement.childNodes[0].classList.add('fd-ellipsis');

    }
}
