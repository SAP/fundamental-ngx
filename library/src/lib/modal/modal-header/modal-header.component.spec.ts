import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHeaderComponent } from './modal-header.component';
import { ModalModule } from '../modal.module';
import { ModalRef } from '../modal-utils/modal-ref';

describe('ModalHeaderComponent', () => {
    let component: ModalHeaderComponent;
    let fixture: ComponentFixture<ModalHeaderComponent>;
    const modalRef = jasmine.createSpyObj('ModalRef', ['dismiss']);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [ModalModule],
            providers: [
                { provide: ModalRef, useValue: modalRef },
            ]
        }).compileComponents();
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
