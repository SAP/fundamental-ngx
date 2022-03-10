import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { GetComputedStyle, GetElementCapacity, GetElementWidth } from './utils.tokens';
import { getComputedStyleFactory } from './factories/get-computed-style.factory';
import { getElementWidthFactory } from './factories/get-element-width.factory';
import { getElementCapacityFactory } from './factories/get-element-capacity.factory';

@NgModule({
    imports: [CommonModule],
    exports: [],
    declarations: []
})
export class UtilsModule {
    static withProviders(): ModuleWithProviders<UtilsModule> {
        return {
            ngModule: UtilsModule,
            providers: [
                {
                    provide: GetComputedStyle,
                    useFactory: getComputedStyleFactory,
                    deps: [DOCUMENT]
                },
                {
                    provide: GetElementWidth,
                    useFactory: getElementWidthFactory,
                    deps: [GetComputedStyle]
                },
                {
                    provide: GetElementCapacity,
                    useFactory: getElementCapacityFactory,
                    deps: [GetComputedStyle]
                }
            ]
        };
    }
}
