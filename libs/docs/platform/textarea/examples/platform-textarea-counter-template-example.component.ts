import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FdpFormGroupModule, PlatformTextAreaModule } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-platform-textarea-counter-template-example',
    templateUrl: './platform-textarea-counter-template-example.component.html',
    encapsulation: ViewEncapsulation.None,
    imports: [FdpFormGroupModule, PlatformTextAreaModule, FormsModule]
})
export class PlatformTextareaCounterTemplateExampleComponent {
    textareaValidator: ValidatorFn[];
    tValue = `Lorem ipsum dolor st amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
        et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
        Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
        consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
        sed diam voluptua. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat`;

    constructor() {
        this.textareaValidator = [Validators.maxLength(10)];
    }
}
