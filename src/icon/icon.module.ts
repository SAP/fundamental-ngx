import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconDirective } from './icon.directive';

@NgModule({
    imports: [CommonModule],
    exports: [IconDirective],
    declarations: [IconDirective]
})
export class IconModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: IconModule,
            providers: [IconDirective]
        };
    }
}
