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
        expect(settingsSpy).toHaveBeenLastCalledWith(settings);
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
});
