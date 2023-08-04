import { Injectable, isDevMode, Optional } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { warnOnce } from '@fundamental-ngx/core/utils';

import { THEME_SWITCHER_ROUTER_MISSING_ERROR } from '../consts';

export interface ThemeServiceOutput {
    themeUrl: SafeResourceUrl;
    customThemeUrl: SafeResourceUrl;
}

export interface Theme {
    id: string;
    name: string;
    description?: string;
}

/**
 * @deprecated
 * Service providing theme switcher functionality.
 * Deprecated since 0.35.0 in favor of ThemingService from ThemingModule
 */
@Injectable()
export class ThemesService {
    /** Available themes */
    themes: Theme[] = [
        {
            id: 'sap_horizon',
            name: 'Morning Horizon (Light)'
        },
        {
            id: 'sap_horizon_dark',
            name: 'Evening Horizon (Dark)'
        },
        {
            id: 'sap_horizon_hcb',
            name: 'Horizon High Contrast Black',
            description: 'Optimized contrast and accessibiliwty for extremely bright environments'
        },
        {
            id: 'sap_horizon_hcw',
            name: 'Horizon High Contrast White Horizon',
            description: 'Optimized contrast and accessibility for extremely dark environments'
        },
        {
            id: 'sap_fiori_3',
            name: 'Quartz Light',
            description: 'Use in regular office environment'
        },
        {
            id: 'sap_fiori_3_dark',
            name: 'Quartz Dark',
            description: 'Use in dimmed environments'
        },
        {
            id: 'sap_fiori_3_hcb',
            name: 'Quartz High Contrast Black',
            description: 'Optimized contrast and accessibility for extremely bright environments'
        },
        {
            id: 'sap_fiori_3_hcw',
            name: 'Quartz High Contrast White',
            description: 'Optimized contrast and accessibility for extremely dark environments'
        },
        {
            id: 'sap_fiori_3_light_dark',
            name: 'Quartz Auto (Depending on the OS Settings)'
        }
    ];

    /** Subject triggered, when the theming is changed by URL parameter */
    readonly onThemeQueryParamChange: Subject<ThemeServiceOutput> = new Subject<ThemeServiceOutput>();

    /** @hidden **/
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    /** @hidden */
    constructor(@Optional() private _activatedRoute: ActivatedRoute, private _sanitizer: DomSanitizer) {
        warnOnce('ThemesService is deprecated since 0.35.0 in favor of ThemingService from ThemingModule');
    }

    /**
     * Set theme according to additional URL parameter.
     * This parameter can be changed in function argument.
     * By default it's `theme`.
     **/
    setThemeByRoute(themeParamName?: string): void {
        const paramName = themeParamName || 'theme';

        if (!this._activatedRoute) {
            throw new Error(THEME_SWITCHER_ROUTER_MISSING_ERROR);
        }

        this._activatedRoute.queryParams
            .pipe(
                takeUntil(this._onDestroy$),
                filter((param) => param && param[paramName])
            )
            .subscribe((param) => this._propagateThemes(param[paramName]));

        const nativeTheme = this._getNativeParameterByName(paramName);
        if (nativeTheme) {
            this._propagateThemes(nativeTheme);
        }
    }

    /** Method to get once theme object directly from url. */
    getThemesFromURL(param?: string): ThemeServiceOutput | undefined {
        const paramName = param || 'theme';

        const nativeTheme = this._getNativeParameterByName(paramName);
        if (!nativeTheme && isDevMode()) {
            console.warn('There is no theme param set named: ' + param);
            return;
        }

        return {
            themeUrl: this.setTheme(nativeTheme),
            customThemeUrl: this.setCustomTheme(nativeTheme)
        };
    }

    /** Assign css file corresponding to chosen theme from @sap-theming **/
    setTheme(theme: string): SafeResourceUrl {
        return this._sanitizer.bypassSecurityTrustResourceUrl('assets/theming-base/' + theme + '/css_variables.css');
    }

    /** Assign css file corresponding to chosen theme fundamental-styles **/
    setCustomTheme(theme: string): SafeResourceUrl {
        return this._sanitizer.bypassSecurityTrustResourceUrl('assets/fundamental-styles-theming/' + theme + '.css');
    }

    /** @hidden */
    private _getNativeParameterByName(paramName: string): string {
        paramName = paramName.replace(/[[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + paramName + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(window.location.href);
        if (!results || !results[2]) {
            return '';
        }
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    /** @hidden */
    private _propagateThemes(theme: string): void {
        this.onThemeQueryParamChange.next({
            themeUrl: this.setTheme(theme),
            customThemeUrl: this.setCustomTheme(theme)
        });
    }
}
