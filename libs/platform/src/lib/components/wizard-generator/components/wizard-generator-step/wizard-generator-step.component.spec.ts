import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlatformWizardGeneratorModule } from '../../wizard-generator.module';
import { WizardGeneratorService } from '../../wizard-generator.service';
import { WizardStepForms } from './wizard-generator-step.component';
import { WizardGeneratorItem } from '@fundamental-ngx/platform';

const items = [{
    name: 'Product type',
    id: 'productTypeStep',
    formGroups: [
        {
            title: '1. Product Type',
            id: 'productType',
            formItems: [
                {
                    name: 'product',
                    message: 'Select appropriate product type',
                    type: 'select',
                    choices: ['Mobile', 'Tablet', 'Desktop'],
                    default: 'Mobile',
                }
            ]
        }
    ]
}];

@Component({
    template: `
        <fdp-wizard-generator-step *ngIf="step !== undefined" (formsCreated)="formsCreated($event)" [item]="step"></fdp-wizard-generator-step>
    `,
    providers: [WizardGeneratorService]
})
export class TestComponent {

    forms: WizardStepForms;

    items: WizardGeneratorItem[] = [];

    step: WizardGeneratorItem;

    constructor(
        public wizardGeneratorService: WizardGeneratorService
    ) { }

    formsCreated(forms: WizardStepForms): void {
        this.forms = forms;
    }
}

describe('WizardGeneratorStepComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let service: WizardGeneratorService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                PlatformWizardGeneratorModule
            ],
            declarations: [ TestComponent ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        service = component.wizardGeneratorService;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create form', async () => {
        await fixture.whenStable();

        const formCreatedSpy = spyOn(component, 'formsCreated').and.callThrough();
        const addComponentSpy = spyOn(service, 'addWizardStepComponent').and.callThrough();

        const newItems = await service.prepareWizardItems(items);

        component.step = newItems[0];

        fixture.detectChanges();

        await new Promise(resolve => setTimeout(() => resolve(null), 200));

        expect(formCreatedSpy).toHaveBeenCalled();
        expect(component.forms.productType).toBeTruthy();
        expect(addComponentSpy).toHaveBeenCalled();
    });

    it('should submit form', async (done) => {
        await fixture.whenStable();

        const newItems = await service.prepareWizardItems(items);

        component.step = newItems[0];

        fixture.detectChanges();

        await new Promise(resolve => setTimeout(() => resolve(null), 200));

        service.submitStepForms('productTypeStep').subscribe((forms) => {

            expect(forms.productType.success).toBeTrue();

            done();
        });
    });
});
