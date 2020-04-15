import { Component, Host } from '@angular/core';
import { SelectComponent } from '../select.component';

@Component({
    selector: 'fd-select-mobile-list',
    templateUrl: './select-mobile-list.component.html'
})
export class SelectMobileListComponent {

    constructor(@Host() public selectComponent: SelectComponent) {}

}
