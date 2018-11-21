import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;
    let ngbModalSpy: jasmine.SpyObj<NgbModal>;

    beforeEach(async(() => {
        const modalSpy = jasmine.createSpyObj('NgbModal', ['open']);

        TestBed.configureTestingModule({
            declarations: [ModalComponent],
            providers: [{ provide: NgbModal, useValue: modalSpy }]
        }).compileComponents();

        ngbModalSpy = TestBed.get(NgbModal);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call modal service open', () => {
        component.open();
        expect(ngbModalSpy.open).toHaveBeenCalled();
    });
});
