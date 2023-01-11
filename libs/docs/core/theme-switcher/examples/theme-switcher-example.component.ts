import { Component, EventEmitter, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ThemeServiceOutput, ThemesService } from '@fundamental-ngx/cdk/utils';

@Component({
    selector: 'fd-theme-switcher-example',
    templateUrl: './theme-switcher-example.component.html'
})
export class ThemeSwitcherExampleComponent {
    /** This is for internal usage, can be removed, when used in standalone application */
    @Output()
    themeChanged = new EventEmitter<ThemeServiceOutput>();

    themes = this._themesService.themes;
    cssUrl: SafeResourceUrl;
    cssCustomUrl: SafeResourceUrl;

    constructor(private _themesService: ThemesService) {}

    selectTheme(selectedTheme: string): void {
        this.cssUrl = this._themesService.setTheme(selectedTheme);
        this.cssCustomUrl = this._themesService.setCustomTheme(selectedTheme);

        this.themeChanged.emit({
            themeUrl: this.cssCustomUrl,
            customThemeUrl: this.cssUrl
        });
    }
}
