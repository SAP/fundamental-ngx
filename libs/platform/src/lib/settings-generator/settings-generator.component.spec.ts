import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsGeneratorComponent } from './settings-generator.component';

describe('SettingsGeneratorComponent', () => {
    let component: SettingsGeneratorComponent;
    let fixture: ComponentFixture<SettingsGeneratorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsGeneratorComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(SettingsGeneratorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
