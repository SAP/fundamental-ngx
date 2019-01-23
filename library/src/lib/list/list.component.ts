import { AfterContentInit, Component, ContentChildren, Input, QueryList } from '@angular/core';
import { ListCheckboxComponent } from './list-checkbox/list-checkbox.component';

@Component({
    selector: 'fd-list',
    templateUrl: './list.component.html'
})
export class ListComponent implements AfterContentInit {

    @Input()
    singleSelect: boolean = false;

    @ContentChildren(ListCheckboxComponent, {descendants: true}) checkboxes: QueryList<ListCheckboxComponent>;

    ngAfterContentInit(): void {
        if (this.singleSelect && this.checkboxes) {

            // Go through each to subscribe to each activate event
            this.checkboxes.forEach(checkbox => {
                checkbox.onActivated.subscribe(id => {

                    // Deactivate all other checkboxes
                    this.checkboxes.forEach(innerCheckbox => {
                        if (id !== innerCheckbox.id) {
                            innerCheckbox.isChecked = false;
                        }
                    });
                });
            });
        }
    }
}
