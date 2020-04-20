import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ButtonType } from '@fundamental-ngx/core';
import { InputSize } from './../form/form-control';

@Component({
    selector: 'fdp-menu-button',
    templateUrl: './menu-button.component.html',
    styleUrls: ['./menu-button.component.scss'],
})
export class MenuButtonComponent {
    /** Id for menu-button. */
    @Input()
    id: string;

    /** name for menu-button */
    @Input()
    name: string;

    /** Menu button size. ex: compact | cozy  */
    @Input()
    contentSize: InputSize = 'cozy';

    /** to truncate text of menu-button based on width. */
    @Input()
    width: string;

    /** The Sap-icon to include in the menu-button */
    @Input()
    icon: string;

    /** Menu-Button is disabled on true. */
    @Input()
    disabled: boolean = false;

    /** The type of the button. Types include 'standard', 'positive', 'negative', 'transparent', 'attention', 'emphasized', 'ghost'.
     * Leave empty for default.'*/
    @Input()
    type: ButtonType;

    /** Event sent when menu-button is clicked */
    @Output()
    buttonClicked: EventEmitter<MouseEvent | KeyboardEvent | TouchEvent> = new EventEmitter();

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
