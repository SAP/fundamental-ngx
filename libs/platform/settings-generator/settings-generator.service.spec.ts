import { TestBed } from '@angular/core/testing';
import { FormGeneratorComponent } from '@fundamental-ngx/platform/form';
import { BehaviorSubject } from 'rxjs';

import { SettingsGeneratorService } from './settings-generator.service';

const formGeneratorResultValue: any = {
    result: 'ok'
};

class MockFormGenerator {
    loading$ = new BehaviorSubject<boolean>(false);

    formSubmittedStatus$ = new BehaviorSubject<any>({ success: true, value: formGeneratorResultValue });

    submit(): void {}
}

describe('SettingsGeneratorService', () => {
    let service: SettingsGeneratorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SettingsGeneratorService]
        });
        service = TestBed.inject(SettingsGeneratorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should add form generator', () => {
        service._addFormGenerator(['root'], new MockFormGenerator() as unknown as FormGeneratorComponent);

        expect((service as any)._formGenerators.get('root')).toBeTruthy();
    });

    it('should remove form generator', () => {
        service._removeFormGenerator(['root']);

        expect((service as any)._formGenerators.get('root')).toBeFalsy();
    });

    it('should return correct object on submit', (doneFn) => {
        service._addFormGenerator(
            ['level1', 'level2', 'level3', 'level4'],
            new MockFormGenerator() as unknown as FormGeneratorComponent
        );

        service.submit().subscribe((data) => {
            expect(data).toEqual({
                level1: {
                    level2: {
                        level3: {
                            level4: formGeneratorResultValue
                        }
                    }
                }
            });
            doneFn();
        });
    });
});
