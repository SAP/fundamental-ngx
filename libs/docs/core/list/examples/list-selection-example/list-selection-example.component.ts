import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '@fundamental-ngx/core/checkbox';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { ListModule } from '@fundamental-ngx/core/list';
import { RadioModule } from '@fundamental-ngx/core/radio';

@Component({
    selector: 'fd-list-selection-example',
    templateUrl: './list-selection-example.component.html',
    styleUrls: ['./list-selection-example.component.scss'],
    imports: [ListModule, CheckboxComponent, FormsModule, ContentDensityDirective, RadioModule]
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
