import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { firstValueFrom } from 'rxjs';
import { BaseThemingConfig } from './config';
import { STANDARD_THEMES } from './standard-themes';
import { ThemingService } from './theming.service';
import { THEMING_CONFIG_TOKEN } from './tokens';

const customThemes = [
    {
        id: 'fiori_horizon_fonts',
        description: 'Fiori theme with Horizon fonts',
        name: 'Fiori theme with Horizon fonts',
        theming: {
            themingBasePath: 'assets/theming-base/sap_fiori_3/css_variables.css',
            themePath: 'assets/fundamental-styles-theming/sap_fiori_3.css',
            themeFontPath: 'sap_horizon_fonts.css'
        }
    },
    {
        id: 'horizon_fiori_fonts',
        description: 'Horizon theme with Fiori fonts',
        name: 'Horizon theme with Fiori fonts',
        theming: {
            themingBasePath: 'assets/theming-base/sap_horizon/css_variables.css',
            themePath: 'assets/fundamental-styles-theming/sap_horizon.css',
            themeFontPath: 'sap_fiori_3_fonts.css'
        }
    }
];

const customConfig = new BaseThemingConfig();
customConfig.customThemes = customThemes;
customConfig.excludeDefaultThemes = true;
customConfig.defaultTheme = customThemes[1].id;

describe('ThemingService with default config', () => {
    let service: ThemingService;
    const defaultConfig = new BaseThemingConfig();

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterModule, RouterTestingModule],
            providers: [
                {
                    provide: THEMING_CONFIG_TOKEN,
                    useValue: defaultConfig
                },
                ThemingService
            ]
        });
        service = TestBed.inject(ThemingService);
        service.init();
    });

    it('should set default scheme', async () => {
        const currentTheme = await firstValueFrom(service.currentTheme);
        expect(currentTheme?.id).toEqual(defaultConfig.defaultTheme);
    });

    it('should set theme', async () => {
        const newTheme = STANDARD_THEMES[1];

        service.setTheme(newTheme.id);

        const currentTheme = await firstValueFrom(service.currentTheme);

        expect(currentTheme?.id).toEqual(newTheme.id);
    });

    it('should insert link elements', () => {
        Object.values(defaultConfig.themeStyleLinkIdentifiers).forEach((id) => {
            expect(document.getElementById(id)).toBeTruthy();
        });
    });
});

describe('ThemingService with custom config', () => {
    let service: ThemingService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [RouterModule, RouterTestingModule],
            providers: [
                {
                    provide: THEMING_CONFIG_TOKEN,
                    useValue: customConfig
                },
                ThemingService
            ]
        });
        service = TestBed.inject(ThemingService);
        service.init();
    });

    it('should apply custom configuration', async () => {
        expect(service.getThemes()).toEqual(customThemes);
        const currentTheme = await firstValueFrom(service.currentTheme);
        expect(currentTheme?.id).toEqual(customConfig.defaultTheme);
    });
});
