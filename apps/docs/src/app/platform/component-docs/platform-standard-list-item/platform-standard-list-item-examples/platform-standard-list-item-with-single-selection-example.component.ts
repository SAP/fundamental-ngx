import { Component } from '@angular/core';


@Component({
    selector: 'fdp-standard-list-item-with-single-selection-example',
    templateUrl: './platform-standard-list-item-with-single-selection-example.component.html'
})
export class PlatformStandardListItemWithSingleSelectionExampleComponent {
    selectedItems: any[] = [];
    radioItems: any[] = [
        {
            'titleIcon': 'ipad', 'title': 'Item1', 'name': 'singleSelect',
            'description': 'First text item in Byline (Standard text item)',
            'secondary': 'Second text item in Byline (Can be semantic (Status) or not)'
        },
        {
            'titleIcon': 'geographic-bubble-chart', 'title': 'Item2', 'name': 'singleSelect',
            'description': 'First text item in Byline (Standard text item)',
            'secondary': 'Second text item in Byline (Can be semantic (Status) or not)'
        },
        {
            'titleIcon': 'horizontal-waterfall-chart', 'title': 'Item3',
            'name': 'singleSelect'
        },
        {
            'titleIcon': 'instance', 'title': 'Item4', 'name': 'singleSelect',
            'description': 'First text item in Byline (Standard text item)',
            'secondary': 'Second text item in Byline (Can be semantic (Status) or not)'
        }];

    showItemInfo(event: any) {
        this.selectedItems = event[0].id;
    }

}
