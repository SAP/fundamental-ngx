import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
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
export class ButtonComponent extends BaseComponent {
    /** Option to make to button compact. */
    @Input()
    compact: boolean;

    /** The icon to include in the button */
    @Input()
    glyph: string;

    /** The type of the button. Types includes
    'standard','positive', 'negative', 'attention', 'ghost',
     'transparent', 'emphasized','menu'.
     * Leave empty for default (standard button).'*/
    @Input()
    type: ButtonType;

    /** Tooltip text to show when focused for more*/
    @Input()
    title?: string;

    /** Event sent when button is clicked */
    @Output()
    buttonClicked = new EventEmitter();

    @ViewChild('fdButton', { read: ElementRef, static: false })
    focusEl: ElementRef<HTMLElement>;

    constructor(protected _changeDetector: ChangeDetectorRef) {
        super(_changeDetector);
    }

    /**
     *  Handles button click
     */
    public onBtnClick($event: any) {
        this.buttonClicked.emit($event);
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
