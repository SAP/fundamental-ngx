import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ThemingService } from '@fundamental-ngx/core/theming';
import { Ui5ThemingBridgeService } from './ui5-theming-bridge.service';
import { provideUi5ThemingBridge } from './ui5-theming-bridge.initializer';
import { Ui5ThemingService, Ui5WebcomponentsThemingService } from '@fundamental-ngx/ui5-webcomponents-base/theming';

const mockSetTheme = jest.fn();
jest.mock('@ui5/webcomponents-base/dist/config/Theme.js', () => ({
    setTheme: (...args: unknown[]) => mockSetTheme(...args)
}));

// Make registerThemes() resolve immediately so async effect fires in tests
jest.mock('@ui5/webcomponents-theming/dist/generated/json-imports/Themes.js', () => ({}));

describe('Ui5ThemingBridgeService', () => {
    let currentThemeSubject: BehaviorSubject<{ id: string } | null>;
    let mockThemingService: Partial<ThemingService>;
    let mockUi5ThemingService: Partial<Ui5ThemingService>;

    beforeEach(() => {
        mockSetTheme.mockClear();
        currentThemeSubject = new BehaviorSubject<{ id: string } | null>({ id: 'sap_horizon' });
        mockThemingService = {
            currentTheme: currentThemeSubject.asObservable()
        };
        mockUi5ThemingService = {
            setTheme: jest.fn().mockResolvedValue(true)
        };
    });

    it('should propagate initial theme to Ui5ThemingService.setTheme()', () => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ThemingService, useValue: mockThemingService },
                { provide: Ui5ThemingService, useValue: mockUi5ThemingService },
                Ui5ThemingBridgeService
            ]
        });

        TestBed.inject(Ui5ThemingBridgeService);

        expect(mockUi5ThemingService.setTheme).toHaveBeenCalledWith('sap_horizon');
    });

    it('should propagate runtime theme changes', () => {
        TestBed.configureTestingModule({
            providers: [
                { provide: ThemingService, useValue: mockThemingService },
                { provide: Ui5ThemingService, useValue: mockUi5ThemingService },
                Ui5ThemingBridgeService
            ]
        });

        TestBed.inject(Ui5ThemingBridgeService);
        (mockUi5ThemingService.setTheme as jest.Mock).mockClear();

        currentThemeSubject.next({ id: 'sap_horizon_dark' });

        expect(mockUi5ThemingService.setTheme).toHaveBeenCalledWith('sap_horizon_dark');
    });

    it('should be a no-op when ThemingService is not provided', () => {
        TestBed.configureTestingModule({
            providers: [
                { provide: Ui5ThemingService, useValue: mockUi5ThemingService },
                Ui5ThemingBridgeService
            ]
        });

        expect(() => TestBed.inject(Ui5ThemingBridgeService)).not.toThrow();
        expect(mockUi5ThemingService.setTheme).not.toHaveBeenCalled();
    });

    it('should filter null theme emissions', () => {
        currentThemeSubject = new BehaviorSubject<{ id: string } | null>(null);
        mockThemingService = {
            currentTheme: currentThemeSubject.asObservable()
        };

        TestBed.configureTestingModule({
            providers: [
                { provide: ThemingService, useValue: mockThemingService },
                { provide: Ui5ThemingService, useValue: mockUi5ThemingService },
                Ui5ThemingBridgeService
            ]
        });

        TestBed.inject(Ui5ThemingBridgeService);

        expect(mockUi5ThemingService.setTheme).not.toHaveBeenCalled();
    });
});

describe('provideUi5ThemingBridge', () => {
    it('should instantiate Ui5ThemingBridgeService via environment initializer', () => {
        const currentThemeSubject = new BehaviorSubject<{ id: string } | null>({ id: 'sap_horizon' });

        TestBed.configureTestingModule({
            providers: [
                { provide: ThemingService, useValue: { currentTheme: currentThemeSubject.asObservable() } },
                // Real Ui5ThemingService required: Ui5WebcomponentsThemingService (now force-constructed
                // by provideUi5ThemingBridge) calls unregisterProvider on teardown.
                provideUi5ThemingBridge()
            ]
        });

        const service = TestBed.inject(Ui5ThemingBridgeService);
        expect(service).toBeTruthy();
    });
});

// Each round: flushEffects() starts async effect body; setTimeout(0) lets promise continuations settle.
async function flushAsyncEffects(rounds = 4): Promise<void> {
    for (let i = 0; i < rounds; i++) {
        TestBed.flushEffects();
        await new Promise<void>((resolve) => setTimeout(resolve, 0));
    }
}

describe('provideUi5ThemingBridge — integration (real Ui5ThemingService)', () => {
    beforeEach(() => mockSetTheme.mockClear());
    afterEach(() => TestBed.resetTestingModule());

    it('should call UI5 setTheme through the full chain when provideUi5ThemingBridge() is used', async () => {
        // Uses the real Ui5ThemingService (not a mock) to exercise the full chain:
        // bridge → Ui5ThemingService.setTheme() → effect → provider.setTheme() → UI5 setTheme().
        // Without the fix, _providers stays [] and the effect early-returns before reaching UI5 setTheme.
        const themeSubject = new BehaviorSubject<{ id: string } | null>({ id: 'sap_horizon_dark' });

        TestBed.configureTestingModule({
            providers: [
                { provide: ThemingService, useValue: { currentTheme: themeSubject.asObservable() } },
                Ui5WebcomponentsThemingService,
                provideUi5ThemingBridge()
            ]
        });

        TestBed.inject(Ui5ThemingBridgeService);
        await flushAsyncEffects();

        expect(mockSetTheme).toHaveBeenCalledWith('sap_horizon_dark');
    });

    it('should apply a theme that was set before provider registration once registration completes', async () => {
        // Guards the async-replay path: theme is set while _providers is still empty
        // (registerThemes() hasn't resolved yet), then registration completes and the
        // effect must re-fire with the already-stored theme.
        let releaseRegistration!: () => void;
        const registrationGate = new Promise<void>((resolve) => { releaseRegistration = resolve; });

        // Use isolateModules so the gated mock doesn't affect other tests' module cache.
        await jest.isolateModulesAsync(async () => {
            jest.doMock('@ui5/webcomponents-theming/dist/generated/json-imports/Themes.js', () => registrationGate);

            const { Ui5WebcomponentsThemingService: GatedProvider } = await import(
                '@fundamental-ngx/ui5-webcomponents-base/theming'
            );

            const themeSubject = new BehaviorSubject<{ id: string } | null>({ id: 'sap_horizon_dark' });

            TestBed.configureTestingModule({
                providers: [
                    { provide: ThemingService, useValue: { currentTheme: themeSubject.asObservable() } },
                    GatedProvider,
                    provideUi5ThemingBridge()
                ]
            });

            // Bridge fires → _providers still [] → effect early-returns → no UI5 setTheme yet.
            TestBed.inject(Ui5ThemingBridgeService);
            TestBed.flushEffects();
            expect(mockSetTheme).not.toHaveBeenCalled();

            // Registration completes → _providers fills → effect re-fires → UI5 setTheme called.
            releaseRegistration();
            await flushAsyncEffects();

            expect(mockSetTheme).toHaveBeenCalledWith('sap_horizon_dark');
        });
    });

    it('should not throw when ThemingService is not provided', async () => {
        // provideUi5ThemingBridge() force-constructs the provider; ThemingService is optional.
        TestBed.configureTestingModule({
            providers: [provideUi5ThemingBridge()]
        });

        expect(() => TestBed.inject(Ui5ThemingBridgeService)).not.toThrow();
        await flushAsyncEffects();
        expect(mockSetTheme).not.toHaveBeenCalled();
    });
});
