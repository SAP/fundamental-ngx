import { AlertService } from './alert.service';
import { TestBed } from '@angular/core/testing';
import { ComponentFactoryResolver, ApplicationRef, Injector } from '@angular/core';

describe('AlertService', () => {
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

        service = new AlertService(cfrMock, appRefMock, injectorMock);
    });

    it('should handle alert open and close', () => {
        const alertRefSpy = jasmine.createSpyObj(['open', 'handleClose']);
        service.open(alertRefSpy);
        expect(alertRefSpy.open).toHaveBeenCalled();
        service.close();
        expect(alertRefSpy.handleClose).toHaveBeenCalled();
    });
});
