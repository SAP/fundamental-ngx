import { Injector, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BaseWebComponentModule } from '@fundamental-ngx/core/web-components';

import { ButtonComponent } from './button.component';
import { IconModule } from '@fundamental-ngx/core/icon';
import { DeprecatedButtonContentDensityDirective } from './deprecated-button-content-density.directive';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';

@NgModule({
    imports: [CommonModule, IconModule, ContentDensityModule],
    exports: [ButtonComponent, DeprecatedButtonContentDensityDirective, ContentDensityModule],
    declarations: [ButtonComponent, DeprecatedButtonContentDensityDirective]
})
export class ButtonModule {}

@NgModule({
    imports: [BrowserModule, ButtonModule],
    exports: [ButtonModule],
    providers: [
        {
            provide: 'BUTTON_INJECT_VARIABLE',
            useValue: 'It working'
        }
    ]
})
export class ButtonWebComponentModule extends BaseWebComponentModule {
    declarations = [ButtonComponent];
    constructor(injector: Injector) {
        super(injector);
    }
}
