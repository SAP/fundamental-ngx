import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ListModule, ListSecondaryDirective } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-list-secondary-example',
    templateUrl: './list-secondary-example.component.html',
    imports: [ListModule, NgClass, ListSecondaryDirective]
})
export class ListSecondaryExampleComponent {}
