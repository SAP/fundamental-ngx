import {
    Injectable,
    NgZone
} from '@angular/core';
import { ThemeManagerService } from './theming/theme-manager.service';
import { ShellBarService } from './extensions/shell-bar.service';

@Injectable()
export class AppShellProviderService {

    constructor(private ngZone: NgZone,
                public themeManager: ThemeManagerService,
                public shellBar?: ShellBarService
    ) {

        console.log(this.ngZone);
        /**
         * We could also create different web workers  that can communicate with each other, but
         * as starter Window should work
         */
        window['appShellProvider'] = { ref: this, zone: ngZone };
    }
}


