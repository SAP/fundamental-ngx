import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ListModule, ListSecondaryDirective } from '@fundamental-ngx/core/list';

@Component({
    selector: 'fd-list-example',
    templateUrl: './list-example.component.html',
    imports: [ListModule]
})
export class ListExampleComponent {}

@Component({
    selector: 'fd-list-secondary-example',
    templateUrl: './list-secondary-example.component.html',
    imports: [ListModule, NgClass, ListSecondaryDirective]
})
export class ListSecondaryExampleComponent {}

@Component({
    selector: 'fd-list-icon-example',
    templateUrl: './list-icon-example.component.html',
    imports: [ListModule]
})
export class ListIconExampleComponent {}

@Component({
    selector: 'fd-list-complex-example',
    templateUrl: './list-complex-example.component.html',
    imports: [ListModule]
})
export class ListComplexExampleComponent {}
