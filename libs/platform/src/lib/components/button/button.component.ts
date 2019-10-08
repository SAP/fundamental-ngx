import { Component, Input, ElementRef, Output, EventEmitter, OnInit, HostBinding } from '@angular/core';

export type ButtonType = 'standard' | 'positive' | 'medium' | 'negative' | 'toolbar' | 'main';
export type ButtonOptions = 'light' | 'emphasized' | '';

@Component({
    selector: 'fdp-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
    /** Whether to compact the button. */
    @Input()
    compact: boolean;

    /** Whether the button content should be in truncated form this width. */
    @Input()
    width: string;

    /** The icon to include in the button */
    @Input()
    glyph: string;

    /** Whether the button is disabled. */
    @Input()
    disabled: boolean;

    /** The type of the button. Types include 'standard', 'positive', 'medium', and 'negative'.
     * Leave empty for default (Action button).'*/
    @Input()
    type: ButtonType;

    /** Button options.  Options include 'emphasized' and 'light'. Leave empty for default.' */
    @Input()
    options: ButtonOptions | ButtonOptions[];

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
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
