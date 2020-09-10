import {
    Injectable,
    NgZone
} from '@angular/core';
import { ThemeManagerService } from './theming/theme-manager.service';

@Injectable({
    providedIn: 'root'
})
export class AppShellProviderService {

    constructor(public themeManager: ThemeManagerService, private ngZone: NgZone) {
        /**
         * We could also create different webworkers  that can comunicate with each other, but
         * as starter Window should work
         */
        window['appShellProviderService'] = {ref: this, zone: ngZone};
    }
}


export class PluginLifeCycle {
    
}
