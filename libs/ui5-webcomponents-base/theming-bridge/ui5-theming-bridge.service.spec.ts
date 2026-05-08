import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { ThemingService } from '@fundamental-ngx/core/theming';
import { Ui5ThemingBridgeService } from './ui5-theming-bridge.service';
import { provideUi5ThemingBridge } from './ui5-theming-bridge.initializer';
import { Ui5ThemingService } from '@fundamental-ngx/ui5-webcomponents-base/theming';

const mockSetTheme = jest.fn();
jest.mock('@ui5/webcomponents-base/dist/config/Theme.js', () => ({
    setTheme: (...args: unknown[]) => mockSetTheme(...args)
}));

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
                { provide: Ui5ThemingService, useValue: { setTheme: jest.fn().mockResolvedValue(true) } },
                provideUi5ThemingBridge()
            ]
        });

        const service = TestBed.inject(Ui5ThemingBridgeService);
        expect(service).toBeTruthy();
    });
});
