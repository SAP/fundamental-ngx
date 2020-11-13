import { Component } from '@angular/core';
import { ThemesService } from '@fundamental-ngx/core';
import { SafeResourceUrl } from '@angular/platform-browser';

@Component({
    selector: 'fd-theme-switcher-example',
    templateUrl: './theme-switcher-example.component.html'
})

export class ThemeSwitcherExampleComponent {
    themes = this.themesService.themes;
    cssUrl: SafeResourceUrl;

    constructor (private themesService: ThemesService) {}

    selectTheme(selectedTheme: string): void {
        this.cssUrl = this.themesService.setTheme(selectedTheme);
    }
}
