import { TestBed } from '@angular/core/testing';
import { PanelService } from './panel.service';

describe('PanelService', () => {
    let service: PanelService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [PanelService]
        });
        service = TestBed.get(PanelService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
