import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { SmartFilterBarService } from './smart-filter-bar.service';
import { PlatformSmartFilterBarModule } from './smart-filter-bar.module';
import { SmartFilterBarCondition } from './interfaces/smart-filter-bar-condition';
import { SmartFilterBarCustomFilterConfig } from './interfaces/smart-filter-bar-custom-filter-config';
import { BaseDynamicFormGeneratorControl } from '@fundamental-ngx/platform/form';

@Component({
    selector: 'fdp-smart-filter-bar-slider-test',
    template: ``
})
class TestFilterComponent extends BaseDynamicFormGeneratorControl {
    constructor() {
        super();
    }
}

const filterConfig: SmartFilterBarCustomFilterConfig = {
    conditionComponent: TestFilterComponent,
    filterStrategies: ['equalTo', 'greaterThan', 'greaterThanOrEqualTo', 'lessThan', 'lessThanOrEqualTo'],
    valueRenderer: (condition: SmartFilterBarCondition<string>) => {
        const value1 = condition.value;
        const value2 = condition.value2;

        return `${value1}-${value2}`;
    },
    types: ['test']
};

describe('SmartFilterBarService', () => {
    let service: SmartFilterBarService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PlatformSmartFilterBarModule],
            declarations: [TestFilterComponent]
        });
        service = TestBed.inject(SmartFilterBarService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add custom filter', () => {
        const result = service.addCustomFilter(filterConfig);
        expect(result).toBe(true);
    });

    it('should return custom filter configuration', () => {
        service.addCustomFilter(filterConfig);
        const configuration = service.getCustomFilterConfiguration('test');
        expect(configuration).toEqual(filterConfig);
    });

    it('should return applicable filter condition operators', () => {
        service.addCustomFilter(filterConfig);
        const operators = service.getApplicableFilterConditions('test');
        expect(operators).toEqual(filterConfig.filterStrategies!);
    });

    it('should use custom value renderer', async () => {
        service.addCustomFilter(filterConfig);
        const condition: SmartFilterBarCondition<string> = {
            value: 'value one',
            value2: 'value two',
            operator: 'equalTo'
        };
        const displayValue = await service.getDisplayValue(condition, 'test');
        expect(displayValue).toEqual(`${condition.value}-${condition.value2}`);
    });
});
