import { Component } from '@angular/core';
import { TitleComponent } from '@fundamental-ngx/core/title';

@Component({
    selector: 'fd-title-elision-example',
    templateUrl: './title-elision-example.component.html',
    imports: [TitleComponent]
})
export class TitleElisionExampleComponent {}

@Component({
    selector: 'fd-title-semantic-example',
    templateUrl: './title-semantic-example.component.html',
    imports: [TitleComponent]
})
export class TitleSemanticExampleComponent {}

@Component({
    selector: 'fd-title-visual-example',
    templateUrl: './title-visual-example.component.html',
    imports: [TitleComponent]
})
export class TitleVisualExampleComponent {}

@Component({
    selector: 'fd-title-wrapping-example',
    templateUrl: './title-wrapping-example.component.html',
    imports: [TitleComponent]
})
export class TitleWrappingExampleComponent {}
