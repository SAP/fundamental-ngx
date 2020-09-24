import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardProgressBarDirective } from './wizard-progress-bar.directive';

describe('WizardProgressBarComponent', () => {
    let component: WizardProgressBarDirective;
    let fixture: ComponentFixture<WizardProgressBarDirective>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WizardProgressBarDirective]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WizardProgressBarDirective);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
