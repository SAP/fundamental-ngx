import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalService } from './modal.service';

import { ModalHeaderComponent } from './modal-header.component';

describe('ModalHeaderComponent', () => {
    let component: ModalHeaderComponent;
    let fixture: ComponentFixture<ModalHeaderComponent>;

    beforeEach(async(() => {
        const modalSpy = jasmine.createSpyObj('ModalService', ['close']);

        TestBed.configureTestingModule({
            declarations: [ModalHeaderComponent],
            providers: [{ provide: ModalService, useValue: modalSpy }]
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
