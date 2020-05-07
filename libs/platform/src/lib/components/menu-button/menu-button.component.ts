import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ButtonType } from '@fundamental-ngx/core';
import { BaseComponent } from '../base';

@Component({
    selector: 'fdp-menu-button',
    templateUrl: './menu-button.component.html',
    styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent extends BaseComponent {
    /** The Sap-icon to include in the menu-button */
    @Input()
    icon: string;

    /** The type of the button. Types include 'standard', 'positive', 'negative', 'transparent', 'attention', 'emphasized', 'ghost'.
     * Leave empty for default.'*/
    @Input()
    type: ButtonType;

    /** Event sent when menu-button is clicked */
    @Output()
    buttonClicked: EventEmitter<MouseEvent | KeyboardEvent | TouchEvent> = new EventEmitter();

    constructor(_cd: ChangeDetectorRef) {
        super(_cd);
    }

    /**
     *  Handles menu-button click
     */
    public onButtonClick($event: any) {
        this.buttonClicked.emit();
    }

    /**
     * Stopping click event from label on disbled status
     */
    public onLabelClick($event: any) {
        if (this.disabled) {
            event.stopPropagation();
        }
    }
}
