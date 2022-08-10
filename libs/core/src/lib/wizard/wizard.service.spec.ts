import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { WizardStepComponent, WizardStepStatus } from './wizard-step/wizard-step.component';

import { WizardService } from './wizard.service';

@Component({
    template: `
        <a fd-wizard-step href="#" #testTemplate1 [status]="step1status">test</a>
        <a fd-wizard-step href="#" #testTemplate2>test</a>
        <a fd-wizard-step href="#" #testTemplate3>test</a>
    `
})
class TemplateTestComponent {
    @ViewChild('testTemplate1', { static: true }) anchor1: WizardStepComponent;
    @ViewChild('testTemplate2', { static: true }) anchor2: WizardStepComponent;
    @ViewChild('testTemplate3', { static: true }) anchor3: WizardStepComponent;

    /** @hidden */
    @ViewChildren(WizardStepComponent)
    steps: QueryList<WizardStepComponent>;

    step1status: WizardStepStatus = 'completed';
}

describe('WizardService', () => {
    let service: WizardService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TemplateTestComponent],
            providers: [WizardService]
        }).compileComponents();

        service = TestBed.get(WizardService);
    });

    it('should create', () => {
        expect(service).toBeDefined();
    });
});
