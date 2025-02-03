import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { ListModule } from '@fundamental-ngx/core/list';
import { RadioModule } from '@fundamental-ngx/core/radio';

@Component({
    selector: 'fd-list-byline-selection-example',
    templateUrl: './list-byline-selection-example.component.html',
    imports: [ListModule, CheckboxComponent, FormsModule, IconComponent, RadioModule]
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
