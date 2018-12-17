import { ModalService } from './modal.service';
import { TestBed } from '@angular/core/testing';

describe('ModalService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({}).compileComponents();

        service = new ModalService();
    });

    it('should handle modal open and close', () => {
        const modalRefSpy = jasmine.createSpyObj(['open', 'close']);
        service.open(modalRefSpy);
        expect(modalRefSpy.open).toHaveBeenCalled();
        service.close();
        expect(modalRefSpy.close).toHaveBeenCalled();
    });
});
