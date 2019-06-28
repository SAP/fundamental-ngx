import { Component, EventEmitter, HostBinding, Input, Output, ViewEncapsulation } from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

/**
 * The component that represents a combobox input.
 * The combobox input is a composition of the "input-group" and "popover" components.
 *
 * ```html
 * <fd-combobox-input [(ngModel)]="comboboxInputValOne"
 *                    [placeholder]="'Search here...'"
 *                    [dropdownValues]="dropdownValues"
 *                    (newItemClicked)="newItem()">
 * </fd-combobox-input>
 * ```
 */
@Component({
    selector: 'fd-combobox-input',
    templateUrl: './combobox-input.component.html',
    styleUrls: ['./combobox-input.component.scss'],
    host: {
        '[class.fd-combobox-custom-class]': 'true'
    },
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: ComboboxInputComponent,
        multi: true
    }],
    encapsulation: ViewEncapsulation.None
})
export class ComboboxInputComponent extends SearchInputComponent {

    /** @hidden */
    @HostBinding('class.fd-combobox-input')
    comboboxClass = true;

    /**  accomplish the UI pattern for a typical input dropdown, also known as combobox input. There is a way to hide
     * + New item, simply stop listening to the (newItemClicked) event.
     * */
    @Output()
    newItemClicked: EventEmitter<void> = new EventEmitter<void>();

    /** Text to use for the '+ New Item' option. */
    @Input()
    newItemText: string = '+ New Item';

    /** @hidden */
    newItemKeydownHandler(event) {
        if (event.code === 'Enter') {
            this.newItemClicked.emit();
        } else if (event.code === 'ArrowUp') {
            event.preventDefault();
            let foundItem = false;
            const menuItemsArray = this.menuItems.toArray();
            menuItemsArray.forEach((item, index) => {
                if (!foundItem) {
                    if (document.activeElement === item.itemEl.nativeElement.children[0] && index === 0) {
                        this.searchInputElement.nativeElement.focus();
                        foundItem = true;
                    } else if (document.activeElement === item.itemEl.nativeElement.children[0]) {
                        if (menuItemsArray[index - 1]) {
                            menuItemsArray[index - 1].itemEl.nativeElement.children[0].focus();
                        }
                        foundItem = true;
                    }
                }
            });
        }
    }

    /** @hidden */
    public shouldShowNewItem(): boolean {
        return this.newItemClicked.observers.length > 0;
    }

}
