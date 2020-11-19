import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { ThemeServiceOutput, ThemesService } from '@fundamental-ngx/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
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

    readonly themeQueryParamName = 'customQueryParam'

    /** An RxJS Subject that will kill the data stream upon destruction (for unsubscribing)  */
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private _themesService: ThemesService,
        private _router: Router
    ) {
        _themesService.setThemeByRoute(this.themeQueryParamName);

        _themesService.onThemeQueryParamChange.pipe(
            takeUntil(this._onDestroy$)
        ).subscribe(theme => {
            this.cssCustomUrl = theme.customThemeUrl;
            this.cssUrl = theme.themeUrl;

            this.themeChanged.emit({
                themeUrl: this.cssCustomUrl,
                customThemeUrl: this.cssUrl
            })
        })
   }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    changeQueryUrl(param: string): void {
        this._router.navigate( [], { queryParams: { customQueryParam: param } });
    }

}
