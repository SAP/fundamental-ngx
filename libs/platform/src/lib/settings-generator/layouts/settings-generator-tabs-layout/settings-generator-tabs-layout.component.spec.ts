import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsGeneratorTabsLayoutComponent } from './settings-generator-tabs-layout.component';

describe('SettingsGeneratorTabsLayoutComponent', () => {
    let component: SettingsGeneratorTabsLayoutComponent;
    let fixture: ComponentFixture<SettingsGeneratorTabsLayoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsGeneratorTabsLayoutComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(SettingsGeneratorTabsLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
