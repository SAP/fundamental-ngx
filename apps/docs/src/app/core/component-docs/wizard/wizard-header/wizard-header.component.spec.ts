import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardHeaderComponent } from './wizard-header.component';

describe('WizardHeaderComponent', () => {
    let component: WizardHeaderComponent;
    let fixture: ComponentFixture<WizardHeaderComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WizardHeaderComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WizardHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
