import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonGroupComponent, ButtonGrouped } from './button-group.component';

@NgModule({
    imports: [CommonModule],
    exports: [ButtonGroupComponent, ButtonGrouped],
    declarations: [ButtonGroupComponent, ButtonGrouped]
})
export class ButtonGroupModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ButtonGroupModule,
            providers: [ButtonGroupComponent]
        };
    }
}
