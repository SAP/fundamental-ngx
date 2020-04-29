import { Component, Input, Output, EventEmitter, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ButtonType } from '@fundamental-ngx/core';
import { MenuComponent } from './../menu/menu.component';
import { MenuItemComponent } from './../menu/menu-item.component';
import { BaseComponent } from '../base';

@Component({
    selector: 'fdp-split-menu-button',
    templateUrl: './split-menu-button.component.html',
    styleUrls: ['split-menu-button.component.scss'],
})
export class SplitMenuButtonComponent extends BaseComponent implements AfterViewInit {
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
    fdType: ButtonType;

    /** Event sent when split-menu-button primary button is clicked */
    @Output()
    primarButtonClick: EventEmitter<MouseEvent | KeyboardEvent | TouchEvent> = new EventEmitter();

    /** Event sent when split-menu-button menu Item is clicked */
    @Output()
    menuItemClick: EventEmitter<MouseEvent | KeyboardEvent | TouchEvent> = new EventEmitter();

    constructor(protected _cd: ChangeDetectorRef) {
        super(_cd);
    }

    /** Get MenuItems and subscribe to click events */
    ngAfterViewInit(): void {
        // validate that menu refernce is of type Menucomponent
        if (!(this.menu instanceof MenuComponent)) {
            throw Error('Input menu should be of type fdp-menu');
        }
        this.menu.menuItems.forEach((menuItem) => {
            if (!(menuItem instanceof MenuItemComponent)) {
                throw Error('Input menu should be of type fdp-menu and menuItem should be of Type fdp-menu-item');
            }
        });

        this.subscribeMenuItem(this.menu);
    }

    private subscribeMenuItem(menu: MenuComponent): void {
        menu.menuItems.forEach((menuItem) => {
            menuItem.itemSelect.subscribe((menuItemClicked) => {
                this.onItemSelect(menuItem);
            });
        });
    }

    /**
     *  Handles split-menu-button button click
     */
    public primarButtonClicked($event: KeyboardEvent | MouseEvent): void {
        event.stopPropagation();
        this.onItemSelect(this.menu.menuItems.first);
        this.primarButtonClick.emit();
    }

    /** called when menu is selected */
    public onItemSelect(menuItem: any): void {
        this.buttonLabel = menuItem.elementRef.nativeElement.innerText;
        this._cd.markForCheck();
        this.menuItemClick.emit(menuItem);
    }
}
