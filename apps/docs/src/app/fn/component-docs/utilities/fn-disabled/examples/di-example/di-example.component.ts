import { Component } from '@angular/core';

@Component({
    selector: 'fundamental-ngx-fn-disabled-di-example',
    templateUrl: './di-example.component.html'
})
export class DiExampleComponent {
    rootElementDisabled = false;
    firstElementDisabled = false;

    constructor() {}
}
