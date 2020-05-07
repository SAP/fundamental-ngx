import { Component, Input, Output, EventEmitter, ChangeDetectorRef, OnInit } from '@angular/core';
import { ButtonType } from '@fundamental-ngx/core';
import { MenuComponent } from './../menu/menu.component';
import { BaseComponent } from '../base';

@Component({
    selector: 'fdp-split-menu-button',
    templateUrl: './split-menu-button.component.html',
    styleUrls: ['split-menu-button.component.scss']
})
export class SplitMenuButtonComponent extends BaseComponent implements OnInit {
    /** Label for the first Button */
    @Input()
    buttonLabel: string;

    /** reference to menu which will be controlled by split button */
    @Input()
    menu: MenuComponent;

    /** The Sap-icon to include in the menu-button */
    @Input()
    icon: string;

    /** The type of the button.
     * 'Emphasized', 'Ghost', 'standard', 'positive', 'negative', 'transparent'
     * Leave empty for default.'*/
    @Input()
    type: ButtonType;

    /** Event sent when split-menu-button primary button is clicked */
    @Output()
    primaryButtonClick: EventEmitter<any> = new EventEmitter();

    /** used as id for Menu Button */
    public secondaryId: string;

    constructor(protected _cd: ChangeDetectorRef) {
        super(_cd);
    }

    ngOnInit(): void {
        this.secondaryId = 'secondary-' + this.id;
    }

    /**
     *  Handles split-menu-button button click
     */
    public primaryButtonClicked(event: any): void {
        event.stopPropagation();
        this.primaryButtonClick.emit();
    }
}
