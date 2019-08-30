import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHeaderComponent } from './modal-header.component';
import { ModalModule } from '../modal.module';
import { DynamicComponentRef } from '../../utils/dynamic-component/dynamic-component-ref';

describe('ModalHeaderComponent', () => {
    let component: ModalHeaderComponent;
    let fixture: ComponentFixture<ModalHeaderComponent>;
    const modalRef = jasmine.createSpyObj('PopupRef', ['dismiss']);

    beforeEach(async(() => {

        TestBed.configureTestingModule({
            imports: [ModalModule],
            providers: [
                { provide: DynamicComponentRef, useValue: modalRef },
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
