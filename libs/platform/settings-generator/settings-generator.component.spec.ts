import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsGeneratorComponent } from './settings-generator.component';
import { SettingsGeneratorModule } from './settings-generator.module';

describe('SettingsGeneratorComponent', () => {
    let component: SettingsGeneratorComponent;
    let fixture: ComponentFixture<SettingsGeneratorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [SettingsGeneratorModule]
        }).compileComponents();

        fixture = TestBed.createComponent(SettingsGeneratorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set settings in service', () => {
        const settingsSpy = jest.spyOn((component as any)._settingsGeneratorService.settings, 'next');

        const settings = {
            appearance: 'sidebar',
            items: []
        };

        component.settings = settings;
        fixture.detectChanges();

        expect(settingsSpy).toHaveBeenCalledTimes(1);
        expect(settingsSpy).toHaveBeenCalledWith(settings);
    });

    it('should set appropriate layout', () => {
        const settings = {
            appearance: 'sidebar',
            items: []
        };

        component.settings = settings;
        fixture.detectChanges();

        expect((component as any)._currentLayout).toEqual(settings.appearance);
    });

    it('should stop if invalid layout was passed', () => {
        const settings = {
            appearance: 'invalidLayout',
            items: []
        };

        component.settings = settings;
        fixture.detectChanges();

        expect((component as any)._currentLayout).toBeFalsy();
    });

    it('should focus the first sidebar item when opened on desktop', async () => {
        const requestAnimationFrameSpy = jest
            .spyOn(globalThis, 'requestAnimationFrame')
            .mockImplementation((callback: FrameRequestCallback) => {
                callback(0);
                return 1;
            });

        component.settings = {
            appearance: 'sidebar',
            sidebarWidth: '20rem',
            items: [{ id: 'general', title: 'General', items: [] }]
        } as any;

        fixture.detectChanges();
        await fixture.whenStable();
        fixture.detectChanges();

        const firstSidebarItem = fixture.nativeElement.querySelector('#general') as HTMLElement | null;
        const layoutRef = (component as any)._layoutComponentRef;

        expect(layoutRef).toBeTruthy();
        const focusSpy = jest.spyOn(firstSidebarItem as HTMLElement, 'focus');

        (layoutRef.instance as any)._selectedIndex = 0;
        (layoutRef.instance as any)._focusSelectedSidebarItem();
        await Promise.resolve();

        expect(firstSidebarItem).toBeTruthy();
        expect(focusSpy).toHaveBeenCalled();

        requestAnimationFrameSpy.mockRestore();
        focusSpy.mockRestore();
    });
});
