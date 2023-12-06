import { TestBed } from '@angular/core/testing';

import { FormGeneratorComponentsAccessorService } from './form-generator-components-accessor.service';
import { TestCustomComponent } from './form-generator.service.spec';

describe('FormGeneratorComponentsAccessorService', () => {
    let service: FormGeneratorComponentsAccessorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FormGeneratorComponentsAccessorService]
        });
        service = TestBed.inject(FormGeneratorComponentsAccessorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add custom component', async () => {
        expect(service.addComponent(TestCustomComponent, ['slider'])).toBeTruthy();
    });

    it('should add custom component and return it by the type', async () => {
        service.addComponent(TestCustomComponent, ['slider']);

        expect(service.getComponentDefinitionByType('slider')?.component).toEqual(TestCustomComponent);
    });
});
