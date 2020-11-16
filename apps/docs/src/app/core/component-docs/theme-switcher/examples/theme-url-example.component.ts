import { Component, EventEmitter, Output } from '@angular/core';
import { ThemeServiceOutput, ThemesService } from '@fundamental-ngx/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
    selector: 'fd-theme-url-example',
    templateUrl: './theme-url-example.component.html'
})
export class ThemeUrlExampleComponent {
    /** This is for internal usage, can be removed, when used in standalone application */
    @Output()
    themeChanged = new EventEmitter<ThemeServiceOutput>();

    themes = this._themesService.themes;
    cssUrl: SafeResourceUrl;
    cssCustomUrl: SafeResourceUrl;

    readonly themeQueryParamName = 'customQueryParam'

    constructor(
        private _themesService: ThemesService,
        private _router: Router
    ) {
        _themesService.setThemeByRoute(this.themeQueryParamName);

        _themesService.onThemeQueryParamChange.subscribe(theme => {
            this.cssCustomUrl = theme.customThemeUrl;
            this.cssUrl = theme.themeUrl;

            this.themeChanged.emit({
                themeUrl: this.cssCustomUrl,
                customThemeUrl: this.cssUrl
            })
        })
   }

    changeQueryUrl(param: string): void {
        this._router.navigate( [], { queryParams: { customQueryParam: param } });
    }

}
