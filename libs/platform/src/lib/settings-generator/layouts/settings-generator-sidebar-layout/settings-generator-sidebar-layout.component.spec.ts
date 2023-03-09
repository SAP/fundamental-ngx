import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsGeneratorSidebarLayoutComponent } from './settings-generator-sidebar-layout.component';

describe('SettingsGeneratorSidebarLayoutComponent', () => {
    let component: SettingsGeneratorSidebarLayoutComponent;
    let fixture: ComponentFixture<SettingsGeneratorSidebarLayoutComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SettingsGeneratorSidebarLayoutComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(SettingsGeneratorSidebarLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
