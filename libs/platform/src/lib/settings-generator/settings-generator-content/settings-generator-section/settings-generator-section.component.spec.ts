import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsGeneratorSectionComponent } from './settings-generator-section.component';

describe('SettingsGeneratorSectionComponent', () => {
    let component: SettingsGeneratorSectionComponent;
    let fixture: ComponentFixture<SettingsGeneratorSectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsGeneratorSectionComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(SettingsGeneratorSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
