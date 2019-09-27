import { Component, Input, ElementRef, Output, EventEmitter, OnInit } from '@angular/core';

export type ButtonType = 'standard' | 'positive' | 'medium' | 'negative' | 'toolbar' | 'main';
export type ButtonOptions = 'light' | 'emphasized' | '';
export type sizeType = 'small' | '';

@Component({
    selector: 'fdp-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    private _elementRef: ElementRef;

    /** Whether to apply size of the button. */
    @Input() size: sizeType;

    /** The icon to include in the button */
    @Input() glyph: string;

    /** Whether the date picker is disabled. */
    @Input()
    disabled: boolean;

    /** The type of the button. Types include 'standard', 'positive', 'medium', and 'negative'.
     * Leave empty for default (Action button).'*/
    @Input() type: ButtonType;

    /** Button options.  Options include 'emphasized' and 'light'. Leave empty for default.' */
    @Input() options: ButtonOptions | ButtonOptions[];

    /** Event sent when button is clicked */
    @Output()
    buttonClicked = new EventEmitter();

    /**
     *  Handles button click
     */
    public onBtnClick($event: any) {
        this.buttonClicked.emit();
    }

    /** @hidden */
    constructor(private elementRef: ElementRef) {
        this._elementRef = elementRef;
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /** @hidden */
    _addClassToElement(className: string) {
        (this._elementRef.nativeElement as HTMLElement).classList.add(...className.split(' '));
    }
    // /** @hidden */
    _setProperties() {
        this._addClassToElement('fd-button');
        if (this.size === 'small') {
            this._addClassToElement('fd-button--compact');
        }
    }
}
