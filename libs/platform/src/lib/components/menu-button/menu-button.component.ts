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
    Id: string;

    /** Menu button size. ex: compact | cozy  */
    @Input()
    displaySize: InputSize = 'cozy';

    /** to truncate text of menu-button based on width. */
    @Input()
    width: string;

    /** The Sap-icon to include in the menu-button */
    @Input()
    icon: string;

    /** Menu-Button is disabled on true. */
    @Input()
    disabled: boolean = false;

    /** The type of the button. Types include 'standard', 'positive', 'negative', 'attention', 'attention', 'emphasized', 'ghost'.
     * Leave empty for default (Action button).'*/
    @Input()
    type: ButtonType;

    /** Event sent when menu-button is clicked */
    @Output()
    click: EventEmitter<MouseEvent | KeyboardEvent | TouchEvent> = new EventEmitter();

    /** add 'menu' as button option */
    /** @hidden */
    menuOptions: string[] = new Array();

    /**
     *  Handles menu-button click
     */
    public buttonclick($event: any) {
        event.stopPropagation();
        this.click.emit();
    }

    /** @hidden */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }
}
