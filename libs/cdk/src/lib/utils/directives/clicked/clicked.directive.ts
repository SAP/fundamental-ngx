import { Directive, EventEmitter, Inject, isDevMode, Output } from '@angular/core';
import { ClickedBehaviorModuleForRootLoadedOnce } from './provide-fdk-clicked';

@Directive({
    selector: '[fdkClicked]'
})
export class ClickedDirective {
    /**
     * Event name.
     */
    static eventName = 'fdkClicked';
    /**
     * FdkClicked output. The sole purpose of the existence of this directive is to just silence Angular Language Service.
     * This is the only viable solution, since NO_ERRORS_SCHEMA silences everything and valuable exception might slip
     * through your eyes.
     */
    @Output() fdkClicked = new EventEmitter<MouseEvent | KeyboardEvent>();

    /** @hidden */
    constructor(@Inject(ClickedBehaviorModuleForRootLoadedOnce) clickedBehaviorModuleForRootLoadedOnce: boolean) {
        if (!clickedBehaviorModuleForRootLoadedOnce && isDevMode()) {
            console.warn(
                'ClickedBehaviorModule.forRoot() was not called from RootModule, ' +
                    'or provideFdkClicked() was not called during the bootstrap of application. ' +
                    'You will not be able to use (fdkClicked) events in HostListeners.'
            );
        }
    }
}
