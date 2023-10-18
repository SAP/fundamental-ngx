import { Component } from '@angular/core';
import { SearchFieldComponent } from '@fundamental-ngx/btp/search-field';

@Component({
    selector: 'fdb-search-field-basic-example',
    templateUrl: './search-field-basic-example.component.html',
    imports: [SearchFieldComponent],
    standalone: true
})
export class SearchFieldBasicExampleComponent {}
