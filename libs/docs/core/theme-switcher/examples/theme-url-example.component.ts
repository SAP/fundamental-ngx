import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ThemeServiceOutput, ThemesService } from '@fundamental-ngx/core/utils';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'fd-theme-url-example',
    templateUrl: './theme-url-example.component.html'
})
export class ThemeUrlExampleComponent implements OnDestroy {
    /** This is for internal usage, can be removed, when used in standalone application */
    @Output()
    themeChanged = new EventEmitter<ThemeServiceOutput>();

    themes = this._themesService.themes;
    cssUrl: SafeResourceUrl;
    cssCustomUrl: SafeResourceUrl;
    themeFromUrl: ThemeServiceOutput | undefined;

    readonly themeQueryParamName = 'customQueryParam';

    /** An RxJS Subject that will kill the data stream upon destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(private _themesService: ThemesService, private _router: Router) {
        this._listenForThemeChange();
        this._themesService.setThemeByRoute(this.themeQueryParamName);

        this._handleThemesFromUrl();
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    changeQueryUrl(param: string): void {
        this._router.navigate([], { queryParams: { customQueryParam: param } });
    }

    private _listenForThemeChange(): void {
        this._themesService.onThemeQueryParamChange.pipe(takeUntil(this._onDestroy$)).subscribe((theme) => {
            this.cssCustomUrl = theme.customThemeUrl;
            this.cssUrl = theme.themeUrl;

            this.themeChanged.emit({
                themeUrl: this.cssCustomUrl,
                customThemeUrl: this.cssUrl
            });
        });
    }

    // Method used to directly fetch themes, after page is being loaded. No subscriptions are added there.
    private _handleThemesFromUrl(): void {
        this.themeFromUrl = this._themesService.getThemesFromURL(this.themeQueryParamName);

        if (this.themeFromUrl) {
            this.cssCustomUrl = this.themeFromUrl.customThemeUrl;
            this.cssUrl = this.themeFromUrl.themeUrl;

            this.themeChanged.emit({
                themeUrl: this.cssCustomUrl,
                customThemeUrl: this.cssUrl
            });
        }
    }
}
