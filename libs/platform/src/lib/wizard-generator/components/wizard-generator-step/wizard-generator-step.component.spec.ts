import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PlatformWizardGeneratorModule } from '../../wizard-generator.module';
import { WizardGeneratorService } from '../../wizard-generator.service';
import { WizardGeneratorItem } from '../../interfaces/wizard-generator-item.interface';
import { firstValueFrom } from 'rxjs';
import { WizardStepForms } from '../../interfaces/wizard-generator-forms.interface';

const items = [
    {
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
                        default: 'Mobile'
                    }
                ]
            }
        ]
    }
];

@Component({
    template: `
        <fdp-wizard-generator-step
            *ngIf="step !== undefined"
            (formsCreated)="formsCreated($event)"
            [item]="step"
        ></fdp-wizard-generator-step>
    `,
    providers: [WizardGeneratorService]
})
export class TestComponent {
    forms: WizardStepForms;

    items: WizardGeneratorItem[] = [];

    step: WizardGeneratorItem;

    formsCreated(forms: WizardStepForms): void {
        this.forms = forms;
    }
}

/** TODO: #6318 */
xdescribe('WizardGeneratorStepComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let service: WizardGeneratorService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [PlatformWizardGeneratorModule],
            declarations: [TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        service = fixture.debugElement.injector.get(WizardGeneratorService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create form', async () => {
        await fixture.whenStable();

        const formCreatedSpy = jest.spyOn(component, 'formsCreated');
        const addComponentSpy = jest.spyOn(service, 'addWizardStepComponent');

        const newItems = await service.prepareWizardItems(items);

        component.step = newItems[0];

        fixture.detectChanges();

        await new Promise((resolve) => setTimeout(() => resolve(null), 200));

        expect(formCreatedSpy).toHaveBeenCalled();
        expect(component.forms.productType).toBeTruthy();
        expect(addComponentSpy).toHaveBeenCalled();
    });

    it('should submit form', async () => {
        await fixture.whenStable();

        const newItems = await service.prepareWizardItems(items);

        component.step = newItems[0];

        fixture.detectChanges();

        await new Promise((resolve) => setTimeout(() => resolve(null), 200));

        const forms = await firstValueFrom(service.submitStepForms('productTypeStep'));
        expect(forms!.productType.success).toBe(true);
    });
});
