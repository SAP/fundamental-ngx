import { Component } from '@angular/core';
import { BarModule } from '@fundamental-ngx/core/bar';

@Component({
    selector: 'fd-bar-subheader-example',
    templateUrl: './bar-subheader-example.component.html',
    imports: [BarModule]
})
export class BarSubHeaderExampleComponent {}

@Component({
    selector: 'fd-bar-header-subheader-example',
    templateUrl: './bar-header-subheader-example.component.html',
    imports: [BarModule]
})
export class BarHeaderSubHeaderExampleComponent {}

@Component({
    selector: 'fd-bar-footer-example',
    templateUrl: './bar-footer-example.component.html',
    imports: [BarModule]
})
export class BarFooterExampleComponent {}

@Component({
    selector: 'fd-bar-floating-footer-example',
    templateUrl: './bar-floating-footer-example.component.html',
    imports: [BarModule]
})
export class BarFloatingFooterExampleComponent {}
