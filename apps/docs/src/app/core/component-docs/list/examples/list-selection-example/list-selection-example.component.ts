import { Component } from '@angular/core';

@Component({
    selector: 'fd-list-selection-example',
    templateUrl: './list-selection-example.component.html',
    styleUrls: ['./list-selection-example.component.scss']
})
export class ListSelectionExampleComponent {
    selectionValue: string | null = null;
    selectionValueTwo: string | null = null;

    cozyObject = [
        {
            selected: false,
            label: 'List item 1'
        },
        {
            selected: false,
            label: 'List item 2'
        },
        {
            selected: false,
            label: 'List item 3'
        }
    ];

    compactObject = [
        {
            selected: false,
            label: 'List item 1'
        },
        {
            selected: false,
            label: 'List item 2'
        },
        {
            selected: false,
            label: 'List item 3'
        }
    ];
}
