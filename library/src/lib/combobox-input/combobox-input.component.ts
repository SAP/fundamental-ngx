import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { SearchInputComponent } from '../search-input/search-input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'fd-combobox-input',
    templateUrl: './combobox-input.component.html',
    styleUrls: ['./combobox-input.component.scss'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: ComboboxInputComponent,
        multi: true
    }]
})
export class ComboboxInputComponent extends SearchInputComponent {

    @HostBinding('class.fd-combobox-input')
    comboboxClass = true;

    @Output()
    newItemClicked: EventEmitter<void> = new EventEmitter<void>();

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

}
