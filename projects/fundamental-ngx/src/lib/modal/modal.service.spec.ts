import { ModalService } from './modal.service';
import { TestBed } from '@angular/core/testing';

xdescribe('ModalService', () => {
    let service;
    let ngbModalSpy: jasmine.SpyObj<NgbModal>;
    beforeEach(() => {
        const modalSpy = jasmine.createSpyObj('NgbModal', {
            open: {
                close: jasmine.createSpy('close'),
                dismiss: jasmine.createSpy('dismiss')
            }
        });

        TestBed.configureTestingModule({
            providers: [{ provide: NgbModal, useValue: modalSpy }]
        }).compileComponents();

        ngbModalSpy = TestBed.get(NgbModal);

        service = new ModalService(modalSpy);
    });

    it('should handle modal open', () => {
        service.open('modalType');
        expect(ngbModalSpy.open).toHaveBeenCalledWith('modalType');
    });

    it('should handle modal close', () => {
        service.modalRef = service.open('modalType');
        service.close();
        expect(service.modalRef.close).toHaveBeenCalled();
    });

    it('should handle modal dismiss', () => {
        service.modalRef = service.open('modalType');
        service.dismiss();
        expect(service.modalRef.dismiss).toHaveBeenCalled();
    });
});
