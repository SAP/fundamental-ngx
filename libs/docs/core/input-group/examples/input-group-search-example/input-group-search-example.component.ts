import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormItemModule, FormLabelModule } from '@fundamental-ngx/core/form';
import { InputGroupModule } from '@fundamental-ngx/core/input-group';

@Component({
    selector: 'fd-input-group-search-example',
    templateUrl: './input-group-search-example.component.html',
    standalone: true,
    imports: [FormItemModule, FormLabelModule, InputGroupModule, FormsModule]
})
export class InputGroupSearchExampleComponent {
    searchTerm = 'Search Term';
    searchTermSecond = 'Search Term';
}
