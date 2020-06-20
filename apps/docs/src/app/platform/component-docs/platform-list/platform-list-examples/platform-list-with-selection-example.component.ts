import { Component } from '@angular/core';
@Component({
    selector: 'fdp-list-with-selection-example',
    templateUrl: './platform-list-with-selection-example.component.html'
})
export class PlatformListWithSelectionExampleComponent {
    selectedItems: any[] = [];
    items: any[] = [
        { 'title': 'Item1', 'checkboxValue': 'check1' },
        { 'title': 'Item2', 'checkboxValue': 'check2' },
        { 'title': 'Item3', 'checkboxValue': 'check3' },
        { 'title': 'Item4', 'checkboxValue': 'check4' }];

    showItemInfo(event: any) {
        this.selectedItems = event;
    }

}
