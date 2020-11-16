import { Injectable, Optional } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

export interface ThemeServiceOutput {
    themeUrl: SafeResourceUrl;
    customThemeUrl: SafeResourceUrl;
}


@Injectable()
/**
 * Service providing theme switcher functionality.
 */
export class ThemesService {

    themes = [
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

    /** @hidden */
    readonly onThemeQueryParamChange: Subject<ThemeServiceOutput> = new Subject<ThemeServiceOutput>();

    /** @hidden **/
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        @Optional() private _activatedRoute: ActivatedRoute,
        private sanitizer: DomSanitizer,
    ) {}


    /** Set theme according to additional URL parameter **/
    setThemeByRoute(themeParamName: string): void {
        const paramName = themeParamName || 'theme'
        this._activatedRoute.queryParams
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(param => {
                this.onThemeQueryParamChange.next({
                    themeUrl: this.setTheme(param[paramName]),
                    customThemeUrl: this.setCustomTheme(param[paramName])
                })
            })
        ;
    };

    /** Assign css file corresponding to chosen theme **/
    setTheme(theme: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl('assets/theming-base/' + theme + '/css_variables.css');
    }

    /** Assign css file corresponding to chosen theme **/
    setCustomTheme(theme: string): SafeResourceUrl {
        return this.sanitizer.bypassSecurityTrustResourceUrl('assets/fundamental-styles-theming/' + theme + '.css');
    }
}
