import { Component } from '@angular/core';

@Component({
    selector: 'fd-button-menu-example',
    templateUrl: './button-menu-example.component.html',
    styleUrls: ['./button-examples.component.scss']
})
export class ButtonMenuExampleComponent {}

@Component({
    selector: 'fd-button-types-example',
    templateUrl: './button-types-example.component.html',
    styleUrls: ['./button-examples.component.scss']
})
export class ButtonTypesExampleComponent {}

@Component({
    selector: 'fd-button-sizes-example',
    templateUrl: './button-sizes-example.component.html',
    styleUrls: ['./button-examples.component.scss']
})
export class ButtonSizesExampleComponent {}

@Component({
    selector: 'fd-button-icons-example',
    templateUrl: './button-icons-example.component.html',
    styleUrls: ['./button-examples.component.scss']
})
export class ButtonIconsExampleComponent {}

@Component({
    selector: 'fd-button-state-example',
    templateUrl: './button-state-example.component.html',
    styleUrls: ['./button-examples.component.scss']
})
export class ButtonStateExampleComponent {}

@Component({
    selector: 'fd-button-toggled-example',
    templateUrl: './button-toggled-example.component.html',
    styleUrls: ['./button-examples.component.scss']
})
export class ButtonToggledExampleComponent {
    toggled = true;
    emphasizedToggled = true;
    ghostToggled = true;
    positiveToggled = true;
    negativeToggled = true;
    attentionToggled = true;
    transparentToggled = true;
}
