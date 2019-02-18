import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';

describe('ModalComponent', () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;
    let modalServiceSpy;

    beforeEach(async(() => {
        modalServiceSpy = jasmine.createSpyObj('ModalService', ['getModalCount', 'popModal']);
        TestBed.configureTestingModule({
            declarations: [ModalComponent],
            providers: [{provide: ModalService, useValue: modalServiceSpy}]
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

    it('should set styles', () => {
        expect(fixture.debugElement.nativeElement.style.display).toBe('none');
        component.open();
    });

    it('should handle modal open', () => {
        spyOn(component, 'focusModal');
        component.open();
        expect(component.result).toBeDefined();
        expect(modalServiceSpy.getModalCount).toHaveBeenCalled();
        expect(component.focusModal).toHaveBeenCalled();
        expect(fixture.debugElement.nativeElement.style.display).toBe('block');
    });

    it('should handle close', () => {
        component.open();
        spyOn(component, 'resolve');
        component.close();
        expect(fixture.debugElement.nativeElement.style.display).toBe('none');
        expect(modalServiceSpy.popModal).toHaveBeenCalled();
        expect(modalServiceSpy.getModalCount).toHaveBeenCalled();
        expect(component.resolve).toHaveBeenCalled();

    });

    it('should handle dismiss', () => {
        component.open();
        spyOn(component, 'reject');
        component.dismiss();
        expect(fixture.debugElement.nativeElement.style.display).toBe('none');
        expect(modalServiceSpy.popModal).toHaveBeenCalled();
        expect(modalServiceSpy.getModalCount).toHaveBeenCalled();
        expect(component.reject).toHaveBeenCalled();
    });

    it('should focus the first element in the modal', () => {
        const elemSpy = jasmine.createSpyObj(['focus']);
        spyOn(fixture.debugElement.nativeElement, 'querySelectorAll').and.returnValue([elemSpy]);
        component.focusModal();
        expect(elemSpy.focus).toHaveBeenCalled();
    });

    it('should handle keydown', () => {
        const elemSpy1 = jasmine.createSpyObj(['focus']);
        const elemSpy2 = jasmine.createSpyObj(['focus']);
        spyOn(document, 'activeElement').and.returnValue(elemSpy2);
        spyOn(fixture.debugElement.nativeElement, 'querySelectorAll').and.returnValue([elemSpy1, elemSpy2]);
        component.focusModal();
        component.onModalKeydown({key: 'Tab'});
        expect(elemSpy1.focus).toHaveBeenCalled();
    });

    it('should handle sizing', () => {
        const width = 700;
        const height = 200;
        component.width = width + 'px';
        component.height = height + 'px';
        fixture.detectChanges();
        component.open();

        const fdModal = fixture.debugElement.nativeElement.querySelector('.fd-modal');
        expect(fdModal.offsetWidth).toBe(width);

        const fdModalContent = fixture.debugElement.nativeElement.querySelector('.fd-modal__content');
        expect(fdModalContent.offsetHeight).toBe(height);
    });
});
