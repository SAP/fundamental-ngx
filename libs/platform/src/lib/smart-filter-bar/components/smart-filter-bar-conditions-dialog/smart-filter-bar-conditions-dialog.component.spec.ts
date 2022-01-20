import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmartFilterBarConditionsDialogComponent } from './smart-filter-bar-conditions-dialog.component';
import {
    DynamicFormFieldItem,
    FilterableColumnDataType,
    PlatformSmartFilterBarModule,
    SmartFilterBarConditionBuilder
} from '@fundamental-ngx/platform';
import { DialogConfig, DialogRef } from '@fundamental-ngx/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { whenStable } from '@fundamental-ngx/core/tests';

const mockData: SmartFilterBarConditionBuilder = {
    header: 'Test',
    dataType: FilterableColumnDataType.STRING,
    filterType: 'input',
    conditions: [
        {
            value: 'first condition value one',
            value2: 'first condition value two',
            operator: 'between'
        },
        {
            value: 'second condition value one',
            value2: undefined,
            operator: 'equalTo'
        }
    ],
    choices: [],
    controlType: 'text',
    defineStrategyLabels: {
        contains: 'contains',
        equalTo: 'equal to',
        between: 'between',
        beginsWith: 'starts with',
        endsWith: 'ends with',
        lessThan: 'less than',
        lessThanOrEqualTo: 'less than or equal to',
        greaterThan: 'greater than',
        greaterThanOrEqualTo: 'greater than or equal to',
        after: 'after',
        onOrAfter: 'on or after',
        before: 'before',
        beforeOrOn: 'before or on'
    }
};

describe('SmartFilterBarConditionsDialogComponent', () => {
    let component: SmartFilterBarConditionsDialogComponent;
    let fixture: ComponentFixture<SmartFilterBarConditionsDialogComponent>;

    const dialogConfig = new DialogConfig();

    const dialogRefMock: DialogRef<SmartFilterBarConditionBuilder> = new DialogRef<SmartFilterBarConditionBuilder>();
    dialogRefMock.data = mockData;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, PlatformSmartFilterBarModule],
            declarations: [SmartFilterBarConditionsDialogComponent],
            providers: [
                {
                    provide: DialogRef,
                    useValue: dialogRefMock
                },
                {
                    provide: DialogConfig,
                    useValue: dialogConfig
                }
            ]
        }).compileComponents();
    });

    beforeEach(async () => {
        fixture = TestBed.createComponent(SmartFilterBarConditionsDialogComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await whenStable(fixture);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add predefined conditions', () => {
        expect(component._formItems.length).toEqual(2);
    });

    it('should properly parse predefined conditions', () => {
        const formItems = component._formItems;

        formItems.forEach((form: DynamicFormFieldItem[], index: number) => {
            const operator = form.find((field) => field.name === 'operator').default;
            const firstValue = form.find((field) => field.name === 'value').default;
            const secondValue = form.find((field) => field.name === 'value2').default;

            expect(operator).toEqual(mockData.conditions[index].operator);
            expect(firstValue).toEqual(mockData.conditions[index].value);
            expect(secondValue).toEqual(mockData.conditions[index].value2);
        });
    });

    it('should add empty condition', () => {
        component.addCondition();
        expect(component._formItems.length).toEqual(3);
    });

    it('should remove condition', () => {
        component.removeCondition(0);

        expect(component._formItems.length).toEqual(1);
        expect((component._formItems[0][1] as DynamicFormFieldItem).default).toEqual(mockData.conditions[1].value);
    });

    it('should close dialog when all forms are submitted', async () => {
        const spy = spyOn(component, '_onFormSubmitted').and.callThrough();
        const dialogSpy = spyOn((component as any)._dialogRef, 'close');

        const formValue = mockData.conditions.map((condition: any) => {
            condition.value1 = condition.value;
            return condition;
        });

        component.applyConditions();

        await new Promise((resolve) => setTimeout(() => resolve(null), 200));

        expect(spy).toHaveBeenCalled();
        expect(dialogSpy).toHaveBeenCalledOnceWith(formValue);
    });
});
