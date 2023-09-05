import { ModuleWithProviders, NgModule } from '@angular/core';
import { ClickedDirective } from './clicked.directive';
import { provideFdkClicked } from './provide-fdk-clicked';

@NgModule({
    declarations: [ClickedDirective],
    exports: [ClickedDirective]
})
export class ClickedBehaviorModule {
    /** @hidden */
    static forRoot(): ModuleWithProviders<ClickedBehaviorModule> {
        return {
            ngModule: ClickedBehaviorModule,
            providers: [provideFdkClicked()]
        };
    }
}
