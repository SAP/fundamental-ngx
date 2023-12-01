import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardContentComponent } from './wizard-content.component';

describe('WizardContentComponent', () => {
    let component: WizardContentComponent;
    let fixture: ComponentFixture<WizardContentComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [WizardContentComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WizardContentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
