import { ChangeDetectorRef, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Validators } from '@angular/forms';

import { PlatformFormGeneratorModule } from '@fundamental-ngx/platform/form';
import { BaseWizardGenerator } from './base-wizard-generator';
import { WizardGeneratorService } from './wizard-generator.service';
import { PlatformWizardGeneratorModule } from './wizard-generator.module';
import { WizardGeneratorItem } from './interfaces/wizard-generator-item.interface';
import { first } from 'rxjs/operators';

let shouldShow = false;

const TEST_ITEMS: WizardGeneratorItem[] = [
    {
        name: () => 'Product type',
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
                        validators: [Validators.required]
                    }
                ]
            }
        ]
    },
    {
        name: 'Summary',
        id: 'summary',
        summary: true
    },
    {
        name: 'Customer information',
        id: 'customerInformationStep',
        formGroups: [
            {
                title: '2. Customer Information',
                id: 'customerInformation',
                formItems: [
                    {
                        name: 'name',
                        message: 'Name',
                        type: 'input',
                        validators: [Validators.required]
                    },
                    {
                        name: 'address',
                        message: 'Address Line 1',
                        type: 'input',
                        validators: [Validators.required]
                    },
                    {
                        name: 'address2',
                        message: 'Address Line 2',
                        type: 'input'
                    }
                ]
            }
        ]
    },
    {
        name: 'Payment method',
        id: 'paymentMethodStep',
        when: () => shouldShow,
        formGroups: [
            {
                title: '3. Payment method',
                id: 'paymentMethodForm',
                formItems: [
                    {
                        name: 'paymentMethod',
                        message: 'Select appropriate payment method',
                        type: 'select',
                        choices: ['Credit Card', 'Bank Transfer'],
                        validators: [Validators.required]
                    }
                ]
            }
        ]
    }
];

@Component({
    template: `
        <ng-container *ngIf="wizardCreated">
            <fdp-wizard-body
                [navigationButtonLabels]="navigationButtonLabels"
                [hidden]="!wizardCreated"
                [appendToWizard]="appendToWizard"
                [contentHeight]="contentHeight"
                [isFirstStep]="isFirstStep"
                [isLastStep]="isLastStep"
                [isSummaryStep]="isSummaryStep"
                (statusChange)="stepStatusChanged($event.id, $event.status)"
                (goNext)="goNext()"
                (finish)="finish()"
            ></fdp-wizard-body>
        </ng-container>
    `,
    providers: [WizardGeneratorService]
})
class WizardGeneratorTestComponent extends BaseWizardGenerator {
    constructor(public wizardGeneratorService: WizardGeneratorService, _cd: ChangeDetectorRef) {
        super(wizardGeneratorService, _cd);
    }
}

describe('WizardGeneratorService', () => {
    let service: WizardGeneratorService;
    let componentInstance: WizardGeneratorTestComponent;
    let fixture: ComponentFixture<WizardGeneratorTestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PlatformFormGeneratorModule, PlatformWizardGeneratorModule],
            declarations: [WizardGeneratorTestComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(WizardGeneratorTestComponent);
        componentInstance = fixture.componentInstance;

        service = componentInstance.wizardGeneratorService;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(service).toBeDefined();
    });

    it('should transform items', async () => {
        const prepareSpy = spyOn(service, 'prepareWizardItems').and.callThrough();
        const visibilitySpy = spyOn(service, 'refreshStepVisibility').and.callThrough();

        await service.prepareWizardItems(TEST_ITEMS);

        expect(prepareSpy).toHaveBeenCalled();
        expect(visibilitySpy).toHaveBeenCalled();

        expect(service.items[0].name).toEqual('Product type');
    });

    it('should place summary step last', async () => {
        await service.prepareWizardItems(TEST_ITEMS);

        expect(service.items[service.items.length - 1].summary).toBeTrue();
    });

    it('should change current step', async () => {
        await service.prepareWizardItems(TEST_ITEMS);

        service.editStep('customerInformationStep');

        await fixture.whenStable();

        const visibleItems = service.visibleWizardSteps;

        expect(visibleItems[0].status).toEqual('completed');
        expect(visibleItems[1].status).toEqual('current');
    });

    it('should not display hidden step', async () => {
        await service.prepareWizardItems(TEST_ITEMS);

        const visibleItems = service.visibleWizardSteps;

        expect(visibleItems.findIndex((i) => i.id === 'paymentMethodStep')).toEqual(-1);
    });

    it('should return visible steps in observable', (done) => {
        service
            .getVisibleSteps()
            .pipe(first())
            .subscribe((steps) => {
                expect(steps.length).toEqual(3);
                done();
            });

        service.prepareWizardItems(TEST_ITEMS);
    });

    it('should return current step ID', async () => {
        await service.prepareWizardItems(TEST_ITEMS);
        service.editStep('customerInformationStep');

        expect(service.getCurrentStepId()).toEqual('customerInformationStep');
    });

    it('should return current step index', async () => {
        await service.prepareWizardItems(TEST_ITEMS);
        service.editStep('customerInformationStep');

        expect(service.getCurrentStepIndex()).toEqual(1);
    });

    it('should set visible steps', (done) => {
        service.prepareWizardItems(TEST_ITEMS).then((items) => {
            service
                .getVisibleSteps()
                .pipe(first())
                .subscribe((steps) => {
                    expect(steps.length).toEqual(4);
                    done();
                });
            service.setVisibleSteps(items);
        });
    });

    it('should clear steps components', (done) => {
        service.prepareWizardItems(TEST_ITEMS).then(() => {
            service
                .trackStepsComponents()
                .pipe(first())
                .subscribe((components) => {
                    expect(Object.keys(components).length).toEqual(0);
                    done();
                });

            service.clearWizardStepComponents();
        });
    });

    it('should refresh steps visibility and show new step', async () => {
        await service.prepareWizardItems(TEST_ITEMS);

        shouldShow = true;

        await service.refreshStepVisibility();

        expect(service.visibleWizardSteps.length).toEqual(4);

        shouldShow = false;
    });
});
