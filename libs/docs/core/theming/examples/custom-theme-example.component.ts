import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { FormLabelComponent } from '@fundamental-ngx/core/form';
import {
    BaseThemingConfig,
    CompleteThemeDefinition,
    THEMING_CONFIG_TOKEN,
    ThemingService
} from '@fundamental-ngx/core/theming';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const customThemingConfig = new BaseThemingConfig();

customThemingConfig.changeThemeOnQueryParamChange = false;
customThemingConfig.excludeDefaultThemes = true;
customThemingConfig.defaultTheme = 'fiori_horizon_fonts';
customThemingConfig.customThemes = [
    {
        id: 'fiori_horizon_fonts',
        description: 'Fiori theme',
        name: 'Fiori theme',
        theming: {
            themingBasePath: 'assets/theming-base/sap_fiori_3/css_variables.css',
            themePath: 'assets/fundamental-styles-theming/sap_fiori_3.css'
        }
    },
    {
        id: 'horizon_fiori_fonts',
        description: 'Horizon theme',
        name: 'Horizon theme',
        theming: {
            themingBasePath: 'assets/theming-base/sap_horizon/css_variables.css',
            themePath: 'assets/fundamental-styles-theming/sap_horizon.css'
        }
    }
];

@Component({
    selector: 'fd-custom-theme-example',
    templateUrl: './custom-theme-example.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    // Added for example purposes only. For real usage please use ThemingService.withConfig()
    providers: [
        ThemingService,
        {
            provide: THEMING_CONFIG_TOKEN,
            useValue: customThemingConfig
        }
    ],
    imports: [ButtonComponent, FormLabelComponent, JsonPipe]
})
export class CustomThemeExampleComponent implements OnDestroy, OnInit {
    themes: CompleteThemeDefinition[];
    currentTheme: CompleteThemeDefinition | null;
    private readonly _onDestroy$: Subject<void> = new Subject<void>();

    constructor(private _themingService: ThemingService) {}

    ngOnInit(): void {
        this._initializeThemes();
    }

    selectTheme(themeId: string): void {
        this._themingService.setTheme(themeId);
    }

    ngOnDestroy(): void {
        this._onDestroy$.next();
        this._onDestroy$.complete();
    }

    private _initializeThemes(): void {
        this.themes = this._themingService.getThemes();
        this._themingService.init();
        this._subscribeToThemeChanges();
    }

    private _subscribeToThemeChanges(): void {
        this._themingService.currentTheme
            .pipe(takeUntil(this._onDestroy$))
            .subscribe((theme) => (this.currentTheme = theme));
    }
}
