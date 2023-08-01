import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WizardStepComponent } from './wizard-step.component';

describe('WizardStepComponent', () => {
    let component: WizardStepComponent;
    let fixture: ComponentFixture<WizardStepComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WizardStepComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WizardStepComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should handle key press (or mouse click if no event is passed)', () => {
        component.visited = true;
        jest.spyOn(component.stepClicked, 'emit');
        component.stepContainerKeypress();
        expect(component.stepClicked.emit).toHaveBeenCalled();
    });
});
