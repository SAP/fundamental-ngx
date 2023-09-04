import { InjectionToken, Provider } from '@angular/core';
import { EVENT_MANAGER_PLUGINS } from '@angular/platform-browser';
import { ClickedEventPlugin } from './clicked-event.plugin';

export const ClickedBehaviorModuleForRootLoadedOnce = new InjectionToken<boolean>(
    'Checking Module providers had been loaded',
    { factory: () => false }
);

/**
 * Provides ClickedEventPlugin to the application
 */
export function provideFdkClicked(): Provider[] {
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
