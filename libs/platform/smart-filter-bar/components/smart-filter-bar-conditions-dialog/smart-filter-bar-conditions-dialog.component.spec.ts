import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfig, DialogRef, FD_DIALOG_FOCUS_TRAP_ERROR } from '@fundamental-ngx/core/dialog';
import { whenStable } from '@fundamental-ngx/core/tests';
import { DynamicFormFieldItem, FormGeneratorService } from '@fundamental-ngx/platform/form';
import { FilterableColumnDataType } from '@fundamental-ngx/platform/table';
import { SmartFilterBarConditionBuilder } from '../../interfaces/smart-filter-bar-condition';
import { SmartFilterBarService } from '../../smart-filter-bar.service';
import { SmartFilterBarConditionsDialogComponent } from './smart-filter-bar-conditions-dialog.component';

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
    controlType: 'text'
};

describe('SmartFilterBarConditionsDialogComponent', () => {
    let component: SmartFilterBarConditionsDialogComponent;
    let fixture: ComponentFixture<SmartFilterBarConditionsDialogComponent>;

    const dialogConfig = new DialogConfig();

    const dialogRefMock: DialogRef<SmartFilterBarConditionBuilder> = new DialogRef<SmartFilterBarConditionBuilder>();
    dialogRefMock.data = mockData;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            providers: [
                SmartFilterBarService,
                FormGeneratorService,
                {
                    provide: DialogRef,
                    useValue: dialogRefMock
                },
                {
                    provide: DialogConfig,
                    useValue: dialogConfig
                },
                {
                    provide: FD_DIALOG_FOCUS_TRAP_ERROR,
                    useValue: true
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
        const formItems = component._formItems as DynamicFormFieldItem[][];

        formItems.forEach((form, index) => {
            const operator = form.find((field) => field.name === 'operator')?.default;
            const firstValue = form.find((field) => field.name === 'value')?.default;
            const secondValue = form.find((field) => field.name === 'value2')?.default;

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
        fixture.detectChanges();
        await new Promise((resolve) => setTimeout(() => resolve(null), 200));
        const spy = jest.spyOn(component, '_onFormSubmitted');
        const dialogSpy = jest.spyOn((component as any)._dialogRef, 'close');

        const formValue = mockData.conditions.map((condition: any) => {
            condition.value1 = condition.value;
            return condition;
        });

        component.applyConditions();

        await new Promise((resolve) => setTimeout(() => resolve(null), 200));

        expect(spy).toHaveBeenCalled();
        expect(dialogSpy).toHaveBeenCalledTimes(1);
        expect(dialogSpy).toHaveBeenCalledWith(formValue);
    });
});
