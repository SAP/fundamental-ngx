import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ModalHeaderComponent } from './modal-header.component';

describe('ModalHeaderComponent', () => {
    let component: ModalHeaderComponent;
    let fixture: ComponentFixture<ModalHeaderComponent>;
    let ngbModalSpy: jasmine.SpyObj<NgbModal>;

    beforeEach(async(() => {
        const modalSpy = jasmine.createSpyObj('NgbModal', ['open']);

        TestBed.configureTestingModule({
            declarations: [ModalHeaderComponent],
            providers: [{ provide: NgbModal, useValue: modalSpy }]
        }).compileComponents();

        ngbModalSpy = TestBed.get(NgbModal);
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ModalHeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
