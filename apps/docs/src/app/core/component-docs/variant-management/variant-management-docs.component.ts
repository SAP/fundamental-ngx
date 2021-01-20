import { Component } from '@angular/core';

import * as viewManagement from '!raw-loader!./examples/variant-management-example/variant-management-example.component';

@Component({
    selector: 'app-poster',
    templateUrl: './variant-management-docs.component.html'
})
export class VariantManagementDocsComponent {

    viewManagementHtml = viewManagement;

}
