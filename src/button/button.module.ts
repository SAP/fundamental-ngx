import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Button } from './button';

@NgModule({
    imports: [CommonModule],
    exports: [Button],
    declarations: [Button]
})
export class ButtonModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: ButtonModule,
            providers: [Button]
        };
    }
}
