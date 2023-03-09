import { TestBed } from '@angular/core/testing';

import { SettingsGeneratorService } from './settings-generator.service';

describe('SettingsGeneratorService', () => {
    let service: SettingsGeneratorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(SettingsGeneratorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
