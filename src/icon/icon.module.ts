import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconComponent } from './icon.component';

@NgModule({
    imports: [CommonModule],
    exports: [IconComponent],
    declarations: [IconComponent]
})
export class IconModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: IconModule,
            providers: [IconComponent]
        };
    }
}
