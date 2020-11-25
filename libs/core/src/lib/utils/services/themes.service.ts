import { Injectable, Optional } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export interface ThemeServiceOutput {
    themeUrl: SafeResourceUrl;
    customThemeUrl: SafeResourceUrl;
}

export interface Theme {
    id: string,
    name: string
}


@Injectable()
/**
 * Service providing theme switcher functionality.
 */
export class ThemesService {

    /** Available themes */
    themes: Theme[] = [
        {
            id: 'sap_fiori_3',
            name: 'Fiori 3'
        },
        {
            id: 'sap_fiori_3_dark',
            name: 'Fiori 3 Dark'
        },
        {
            id: 'sap_fiori_3_hcb',
            name: 'High Contrast Black'
        },
        {
            id: 'sap_fiori_3_hcw',
            name: 'High Contrast White'
        },
        {
            id: 'sap_fiori_3_light_dark',
            name: 'Light Dark'
        }
    ];

    /** Subject triggered, when the theming is changed by URL parameter */
    readonly onThemeQueryParamChange: Subject<ThemeServiceOutput> = new Subject<ThemeServiceOutput>();

    /** @hidden **/
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        @Optional() private _activatedRoute: ActivatedRoute,
        private _sanitizer: DomSanitizer,
    ) {}


    /**
     * Set theme according to additional URL parameter.
     * This parameter can be changed in function argument.
     * By default it's `theme`.
     **/
    setThemeByRoute(themeParamName?: string): void {
        const paramName = themeParamName || 'theme'
        this._activatedRoute.queryParams
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(param => this.onThemeQueryParamChange.next({
                themeUrl: this.setTheme(param[paramName]),
                customThemeUrl: this.setCustomTheme(param[paramName])
            })
        );
    };

    /** Assign css file corresponding to chosen theme from @sap-theming **/
    setTheme(theme: string): SafeResourceUrl {
        return this._sanitizer.bypassSecurityTrustResourceUrl('assets/theming-base/' + theme + '/css_variables.css');
    }

    /** Assign css file corresponding to chosen theme fundamental-styles **/
    setCustomTheme(theme: string): SafeResourceUrl {
        return this._sanitizer.bypassSecurityTrustResourceUrl('assets/fundamental-styles-theming/' + theme + '.css');
    }
}
