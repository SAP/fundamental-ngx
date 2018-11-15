import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHeaderComponent } from './modal-header.component';

import { ModalService } from './modal.service';

describe('ModalHeaderComponent', () => {
    let component: ModalHeaderComponent;
    let fixture: ComponentFixture<ModalHeaderComponent>;
    let modalSpy: jasmine.SpyObj<ModalService>;

    beforeEach(async(() => {
        modalSpy = jasmine.createSpyObj('ModalService', ['open']);

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
