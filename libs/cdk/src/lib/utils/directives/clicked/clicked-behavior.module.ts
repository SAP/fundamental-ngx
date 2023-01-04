import { Inject, InjectionToken, isDevMode, ModuleWithProviders, NgModule } from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { ClickedEventPlugin } from './clicked-event.plugin';
import { ClickedDirective } from './clicked.directive';

const ClickedBehaviorModuleForRootLoadedOnce = new InjectionToken<boolean>(
    'Checking Module providers had been loaded',
    { factory: () => false }
);

@NgModule({
    declarations: [ClickedDirective],
    exports: [ClickedDirective]
})
export class ClickedBehaviorModule {
    /** @hidden */
    constructor(@Inject(ClickedBehaviorModuleForRootLoadedOnce) clickedBehaviorModuleForRootLoadedOnce: boolean) {
        if (!clickedBehaviorModuleForRootLoadedOnce && isDevMode()) {
            console.warn(
                'ClickedBehaviorModule.forRoot() was not called from RootModule, you will not be able to use (fnClicked) events'
            );
        }
    }

    /** @hidden */
    static forRoot(): ModuleWithProviders<ClickedBehaviorModule> {
        return {
            ngModule: ClickedBehaviorModule,
            providers: [
                {
                    provide: EVENT_MANAGER_PLUGINS,
                    useClass: ClickedEventPlugin,
                    multi: true
                },
                {
                    provide: ClickedBehaviorModuleForRootLoadedOnce,
                    useValue: true
                }
            ]
        };
    }
}
