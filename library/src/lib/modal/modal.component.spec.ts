import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
    let component: ModalComponent;
    let fixture: ComponentFixture<ModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ModalComponent]
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
        expect(fixture.debugElement.nativeElement.style.display).toBe('block');
        component.close();
        expect(fixture.debugElement.nativeElement.style.display).toBe('none');
    });
});
