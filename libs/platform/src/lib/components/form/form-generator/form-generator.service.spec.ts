import { TestBed } from '@angular/core/testing';

import { FormGeneratorService } from './form-generator.service';
import { DynamicFormItem } from './interfaces/dynamic-form-item';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const dummyFormItems: DynamicFormItem[] = [
    {
        type: 'input',
        name: 'something',
        message: 'wow',
        default: 'test'
    }
];

export const brokenFormItems: DynamicFormItem[] = [
    {
        type: 'notExistingControlType',
        name: 'shouldNotBeInForm',
        message: 'wow',
        default: 'test'
    },
    {
        type: 'input',
        name: 'something',
        message: 'wow',
        default: 'test'
    }
];

describe('FormGeneratorService', () => {
    let service: FormGeneratorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, ReactiveFormsModule]
        });
        service = TestBed.inject(FormGeneratorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should create empty form', async () => {

        const form = await service.generateForm([]);

        expect(Object.keys(form.controls).length).toBe(0);
    });

    it('should create form with controls', async () => {

        const form = await service.generateForm(dummyFormItems);

        expect(form.controls.something).toBeTruthy();
    });

    it ('should skip unknown form item type', async () => {
        const form = await service.generateForm(brokenFormItems);
        expect(form.controls['shouldNotBeInForm']).toBeUndefined();
    });
});
