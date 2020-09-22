import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardProgressBarComponent } from './wizard-progress-bar.component';

describe('WizardProgressBarComponent', () => {
    let component: WizardProgressBarComponent;
    let fixture: ComponentFixture<WizardProgressBarComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WizardProgressBarComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WizardProgressBarComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
