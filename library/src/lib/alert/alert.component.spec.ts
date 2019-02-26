import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AlertComponent } from './alert.component';
import { HashService } from '../utils/hash.service';
import { AlertService } from './alert.service';

describe('AlertComponent', () => {
    let component: AlertComponent;
    let fixture: ComponentFixture<AlertComponent>;

    beforeEach(async(() => {
        const hashSpy = jasmine.createSpyObj('HashService', ['hash']);
        const alertServiceSpy = jasmine.createSpyObj('AlertService', ['open', 'popAlert']);

        TestBed.configureTestingModule({
            declarations: [AlertComponent],
            providers: [
                { provide: HashService, useValue: hashSpy },
                { provide: AlertService, useValue: alertServiceSpy }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AlertComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get an ID and handle the close event for that ID', () => {
        component.ngOnInit();
        expect(component.generatedId).toBeDefined();
        // tslint:disable-next-line:no-shadowed-variable
        component.close.subscribe(id => expect(id).toBe(component.id));
        component.handleClose();
        component.id = 'someId';
        const id = component.getId();
        expect(id).toEqual('someId');
    });

    it('should handle open function', fakeAsync(() => {
        component.ngOnInit();
        spyOn(component, 'getTop').and.returnValue('10px');
        spyOn(component, 'handleClose');
        component.open();
        expect(component.getTop).toHaveBeenCalled();
        expect(component.alertDiv.nativeElement.style.display).toEqual('block');
        expect(component.alertDiv.nativeElement.style.top).toEqual('10px');
        expect(component.show).toBeTruthy();
        fixture.whenStable().then(() => {
            tick(15000);
            fixture.detectChanges();
            expect(component.handleClose).toHaveBeenCalled();
            tick(1000);
            fixture.detectChanges();
            expect(component.handleClose).toHaveBeenCalled();
        });
    }));

    it('should handle open function when mousePersist is true', fakeAsync(() => {
        component.ngOnInit();
        spyOn(component, 'handleClose');
        component.mousePersist = true;
        component.open();
        component.mouseInAlert = true;
        fixture.whenStable().then(() => {
            tick(15000);
            expect(component.handleClose).not.toHaveBeenCalled();
            component.mouseInAlert = false;
            tick(600);
            expect(component.handleClose).toHaveBeenCalled();
        });
    }));

    it('should handle getTop function', () => {
        spyOn(document, 'querySelectorAll').and.returnValue([{ style: { display: 'block' }, offsetHeight: 10 }]);
        const retVal = component.getTop();
        expect(retVal).toEqual('30px');
    });

    it('should handle mouseenter/mouseleave events', () => {
        component.handleAlertMouseEvent({ type: 'mouseenter' });
        expect(component.mouseInAlert).toBeTruthy();
        component.handleAlertMouseEvent({ type: 'mouseleave' });
        expect(component.mouseInAlert).toBeFalsy();
    });
});
