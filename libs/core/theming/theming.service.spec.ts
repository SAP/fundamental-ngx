import { TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
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
            themePath: 'assets/fundamental-styles-theming/sap_fiori_3.css'
        }
    },
    {
        id: 'horizon_fiori_fonts',
        description: 'Horizon theme with Fiori fonts',
        name: 'Horizon theme with Fiori fonts',
        theming: {
            themingBasePath: 'assets/theming-base/sap_horizon/css_variables.css',
            themePath: 'assets/fundamental-styles-theming/sap_horizon.css'
        }
    }
];

const setupService = (config): ThemingService => {
    TestBed.configureTestingModule({
        imports: [RouterModule, RouterTestingModule],
        providers: [
            {
                provide: THEMING_CONFIG_TOKEN,
                useValue: config
            },
            ThemingService
        ]
    });
    const service = TestBed.inject(ThemingService);
    service.init();
    return service;
};

describe('ThemingService', () => {
    let service: ThemingService;
    const defaultConfig = new BaseThemingConfig();

    describe('with default config', () => {
        beforeEach(() => {
            service = setupService(defaultConfig);
        });

        it('should set default scheme', () => {
            const currentTheme = service.getCurrentTheme();
            expect(currentTheme?.id).toEqual(defaultConfig.defaultTheme);
        });

        it('should handle standard theme setting', () => {
            const newTheme = STANDARD_THEMES[1];
            service.setTheme(newTheme.id);
            const currentTheme = service.getCurrentTheme();
            expect(currentTheme?.id).toEqual(newTheme.id);
        });

        it('should insert correct link elements', () => {
            Object.values(defaultConfig.themeStyleLinkIdentifiers).forEach((id) => {
                const linkElement = document.getElementById(id);
                expect(linkElement).toBeTruthy();
                expect(linkElement?.tagName).toBe('LINK');
            });
        });
    });

    describe('with custom config', () => {
        const customConfig = new BaseThemingConfig();
        customConfig.customThemes = customThemes;
        customConfig.excludeDefaultThemes = true;
        customConfig.defaultTheme = customThemes[1].id;

        beforeEach(() => {
            service = setupService(customConfig);
        });

        it('should apply custom configuration correctly', () => {
            expect(service.getThemes()).toEqual(customThemes);
            const currentTheme = service.getCurrentTheme();
            expect(currentTheme?.id).toEqual(customConfig.defaultTheme);
        });
    });
});
