import { Injectable } from '@angular/core';
import { ThemeManagerService } from './theming/theme-manager.service';

@Injectable({
    providedIn: 'root'
})
export class AppShellProviderService {

    constructor(public themeAPI: ThemeManagerService) {
    }
}
