import { Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector: 'fd-inline-help-example',
    templateUrl: './inline-help-example.component.html',
    styles: [
        `.fd-custom-inline-help-body { padding: 0.5rem !important; text-align: center; }`
    ],
    encapsulation: ViewEncapsulation.None
})
export class InlineHelpExampleComponent {}

@Component({
    selector: 'fd-inline-help-trigger-example',
    templateUrl: './inline-help-trigger-example.component.html'
})
export class InlineHelpTriggerExampleComponent {}

@Component({
    selector: 'fd-inline-help-styled-example',
    templateUrl: './inline-help-styled-example.component.html'
})
export class InlineHelpStyledExampleComponent {}
