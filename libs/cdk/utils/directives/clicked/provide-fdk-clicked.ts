import { InjectionToken, isDevMode, Provider } from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { ClickedEventPlugin } from './clicked-event.plugin';

/**
 * @deprecated
 * ClickedBehaviorModule is deprecated and will be removed in the next major release. Use ClickedDirective instead.
 */
export const ClickedBehaviorModuleForRootLoadedOnce = new InjectionToken<boolean>(
    'Checking Module providers had been loaded',
    { factory: () => false }
);

/**
 * Provides ClickedEventPlugin to the application
 * @deprecated
 */
export function provideFdkClicked(): Provider[] {
    if (isDevMode()) {
        console.warn(
            `provideFdkClicked() is deprecated and will be removed in the next major release. Use ClickedDirective instead.`
        );
    }
    return [
        {
            provide: EVENT_MANAGER_PLUGINS,
            useClass: ClickedEventPlugin,
            multi: true
        },
        {
            provide: ClickedBehaviorModuleForRootLoadedOnce,
            useValue: true
        }
    ];
}
