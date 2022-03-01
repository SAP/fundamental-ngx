import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { GetComputedStyle, GetElementCapacity, GetElementWidth } from './utils.tokens';
import { getComputedStyleFactory } from './factories/getComputedStyleFactory';
import { getElementWidthFactory } from './factories/getElementWidthFactory';
import { getElementCapacityFactory } from './factories/getElementCapacityFactory';

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
