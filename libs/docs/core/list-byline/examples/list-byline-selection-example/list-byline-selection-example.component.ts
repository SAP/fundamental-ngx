import { Component } from '@angular/core';
import { RadioModule } from '@fundamental-ngx/core/radio';
import { IconModule } from '@fundamental-ngx/core/icon';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { NgFor } from '@angular/common';
import { ListModule } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-list-byline-selection-example',
    templateUrl: './list-byline-selection-example.component.html',
    standalone: true,
    imports: [ListModule, NgFor, CheckboxComponent, FormsModule, IconModule, RadioModule]
})
export class ListBylineSelectionExampleComponent {
    selectionValue: string | null = null;
    selectionValueTwo: string | null = null;

    bylineSelectionItems = [
        {
            selected: true,
            title: 'List item 1',
            byline: 'Byline text for item 1',
            glyph: 'calendar'
        },
        {
            selected: false,
            title: 'List item 2',
            byline: 'Byline text for item 2',
            glyph: 'activate'
        },
        {
            selected: false,
            title: 'List item 3',
            byline: 'Byline text for item 3',
            glyph: 'employee'
        }
    ];
}
