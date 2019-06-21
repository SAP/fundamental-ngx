import { Component } from '@angular/core';

@Component({
    selector: 'fd-button-split-types-example',
    templateUrl: './button-split-types-example.component.html',
    styleUrls: ['./button-split-examples.scss']
})
export class ButtonSplitTypesExampleComponent {}

@Component({
    selector: 'fd-button-split-icons-example',
    templateUrl: './button-split-icons-example.component.html',
    styleUrls: ['./button-split-examples.scss']
})
export class ButtonSplitTypesIconsComponent {num = 0;}

@Component({
    selector: 'fd-button-split-programmatical-example',
    templateUrl: './button-split-programmatical-example.component.html',
    styleUrls: ['./button-split-examples.scss']
})
export class ButtonSplitProgrammaticalExampleComponent {
    isOpen: boolean = false;
}
@Component({
    selector: 'fd-button-split-options-example',
    templateUrl: './button-split-options-example.component.html',
    styleUrls: ['./button-split-examples.scss']
})
export class ButtonSplitOptionsExampleComponent {}

@Component({
    selector: 'fd-button-split-template-example',
    templateUrl: './button-split-template-example.component.html',
    styleUrls: ['./button-split-examples.scss']
})
export class ButtonSplitTemplateExampleComponent {}
