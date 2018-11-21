import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './modal.component';

import { ModalService } from './modal.service';

describe('ModalComponent', () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;
    let modalSpy: jasmine.SpyObj<ModalService>;

    beforeEach(async(() => {
        modalSpy = jasmine.createSpyObj('ModalService', ['open']);

        TestBed.configureTestingModule({
            declarations: [ModalComponent],
            providers: [{ provide: ModalService, useValue: modalSpy }]
        }).compileComponents();
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
        expect(modalSpy.open).toHaveBeenCalled();
    });
});
