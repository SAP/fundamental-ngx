import { ModalService } from './modal.service';
import { TestBed } from '@angular/core/testing';
import { ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';

describe('ModalService', () => {
    let service, cfrMock, appRefMock, injectorMock;
    cfrMock = jasmine.createSpyObj('ComponentFactoryResolver', ['']);
    appRefMock = jasmine.createSpyObj('ApplicationRef', ['']);
    injectorMock = jasmine.createSpyObj('Injector', ['']);
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: 'ComponentFactoryResolver', useFactory: (() => cfrMock ) },
                { provide: 'ApplicationRef', useFactory: (() => appRefMock ) },
                { provide: 'Injector', useFactory: (() => injectorMock ) }
            ]
        }).compileComponents();

        service = new ModalService(cfrMock, appRefMock, injectorMock);
    });

    it('should handle modal open and close', () => {
        const modalRefSpy = jasmine.createSpyObj(['open', 'close']);
        service.open(modalRefSpy);
        expect(modalRefSpy.open).toHaveBeenCalled();
        service.close();
        expect(modalRefSpy.close).toHaveBeenCalled();
    });
});
