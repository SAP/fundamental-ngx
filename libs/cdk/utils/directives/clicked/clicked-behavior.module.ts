import { isDevMode, ModuleWithProviders, NgModule } from '@angular/core';
import { ClickedDirective } from './clicked.directive';
import { provideFdkClicked } from './provide-fdk-clicked';

/**
 * @deprecated
 * ClickedBehaviorModule is deprecated and will be removed in the next major release. Use ClickedDirective instead.
 */
@NgModule({
    imports: [ClickedDirective],
    exports: [ClickedDirective]
})
export class ClickedBehaviorModule {
    /** @ignore */
    constructor() {
        console.warn(
            `ClickedBehaviorModule is deprecated and will be removed in the next major release. Use ClickedDirective instead.`
        );
    }
    /** @ignore */
    static forRoot(): ModuleWithProviders<ClickedBehaviorModule> {
        if (isDevMode()) {
            console.warn(
                `ClickedBehaviorModule.forRoot() is deprecated and will be removed in the next major release. Use ClickedDirective instead.`
            );
        }
        return {
            ngModule: ClickedBehaviorModule,
            providers: [provideFdkClicked()]
        };
    }
}
