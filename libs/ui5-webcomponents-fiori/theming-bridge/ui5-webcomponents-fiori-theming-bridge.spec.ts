import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ThemingService } from '@fundamental-ngx/core/theming';
import { Ui5ThemingBridgeService } from '@fundamental-ngx/ui5-webcomponents-base/theming-bridge';
import { Ui5ThemingService, Ui5WebcomponentsThemingService } from '@fundamental-ngx/ui5-webcomponents-base/theming';
import { Ui5WebcomponentsFioriThemingService, provideUi5WebcomponentsFiori } from './index';

const mockSetTheme = jest.fn();
jest.mock('@ui5/webcomponents-base/dist/config/Theme.js', () => ({
    setTheme: (...args: unknown[]) => mockSetTheme(...args)
}));

jest.mock('@ui5/webcomponents-theming/dist/generated/json-imports/Themes.js', () => ({}));
jest.mock('@ui5/webcomponents-fiori/dist/generated/json-imports/Themes.js', () => ({}));

async function flushAsyncEffects(rounds = 4): Promise<void> {
    for (let i = 0; i < rounds; i++) {
        TestBed.flushEffects();
        await new Promise<void>((resolve) => setTimeout(resolve, 0));
    }
}

describe('provideUi5WebcomponentsFiori', () => {
    afterEach(() => {
        mockSetTheme.mockClear();
        TestBed.resetTestingModule();
    });

    it('should be exported from the theming-bridge entry point', () => {
        expect(provideUi5WebcomponentsFiori).toBeDefined();
        expect(typeof provideUi5WebcomponentsFiori).toBe('function');
    });

    it('should force-construct Ui5WebcomponentsFioriThemingService', () => {
        TestBed.configureTestingModule({
            providers: [provideUi5WebcomponentsFiori()]
        });

        const service = TestBed.inject(Ui5WebcomponentsFioriThemingService);
        expect(service).toBeTruthy();
    });
});

describe('provideUi5WebcomponentsFiori — integration (real Ui5ThemingService)', () => {
    afterEach(() => {
        mockSetTheme.mockClear();
        TestBed.resetTestingModule();
    });

    it('should register Ui5WebcomponentsFioriThemingService with Ui5ThemingService', async () => {
        // Without provideUi5WebcomponentsFiori(), the service is never constructed, never calls
        // registerProvider(), and availableThemes() stays empty.
        TestBed.configureTestingModule({
            providers: [provideUi5WebcomponentsFiori()]
        });

        await flushAsyncEffects();

        const ui5Theming = TestBed.inject(Ui5ThemingService);
        expect(ui5Theming.getAvailableThemes().length).toBeGreaterThan(0);
    });

    it('should call UI5 setTheme through the full bridge chain when provideUi5WebcomponentsFiori() is used', async () => {
        // Full stack: ThemingService → bridge → Ui5ThemingService → all providers → setTheme().
        // Without provideUi5WebcomponentsFiori(), _providers stays [] and the effect early-returns,
        // so setTheme() is never called for @ui5/webcomponents-fiori component-level theme assets.
        const themeSubject = new BehaviorSubject<{ id: string } | null>({ id: 'sap_horizon_dark' });

        TestBed.configureTestingModule({
            providers: [
                { provide: ThemingService, useValue: { currentTheme: themeSubject.asObservable() } },
                Ui5WebcomponentsThemingService,
                provideUi5WebcomponentsFiori()
            ]
        });

        TestBed.inject(Ui5ThemingBridgeService);
        await flushAsyncEffects();

        expect(mockSetTheme).toHaveBeenCalledWith('sap_horizon_dark');
    });
});
