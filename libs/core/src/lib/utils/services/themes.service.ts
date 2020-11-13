import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';


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

    /** @hidden **/
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(
        private router: Router,
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute
    ) {}


    /** Set theme according to additional URL parameter **/
    setThemeByRoute(themeParamName): any {
        const paramName = themeParamName || 'theme'
        this.router.events
            .pipe(takeUntil(this._onDestroy$))
            .subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.route.queryParams
                    .pipe(takeUntil(this._onDestroy$))
                    .subscribe(param => {
                        this.setTheme(param[paramName])
                });
            }
        })
    };

    /** Assign css file corresponding to chosen theme **/
    setTheme(theme: string): any {
        return this.sanitizer.bypassSecurityTrustResourceUrl('assets/' + theme + '.css');
    }
}
