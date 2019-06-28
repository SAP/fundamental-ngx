import { Component } from '@angular/core';

@Component({
    selector: 'fd-split-button-types-example',
    templateUrl: './split-button-types-example.component.html',
    styleUrls: ['./split-button-examples.scss']
})
export class ButtonSplitTypesExampleComponent {}

@Component({
    selector: 'fd-split-button-icons-example',
    templateUrl: './split-button-icons-example.component.html',
    styleUrls: ['./split-button-examples.scss']
})
export class ButtonSplitTypesIconsComponent {}

@Component({
    selector: 'fd-split-button-programmatical-example',
    templateUrl: './split-button-programmatical-example.component.html',
    styleUrls: ['./split-button-examples.scss']
})
export class ButtonSplitProgrammaticalExampleComponent {
    isOpen: boolean = false;
}

@Component({
    selector: 'fd-split-button-options-example',
    templateUrl: './split-button-options-example.component.html',
    styleUrls: ['./split-button-examples.scss']
})
export class ButtonSplitOptionsExampleComponent {}

@Component({
    selector: 'fd-split-button-template-example',
    templateUrl: './split-button-template-example.component.html',
    styleUrls: ['./split-button-examples.scss']
})
export class ButtonSplitTemplateExampleComponent {}
