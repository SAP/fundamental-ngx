import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleComponent } from './toggle.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('ToggleComponent', () => {
    let component: ToggleComponent;
    let fixture: ComponentFixture<ToggleComponent>;
    let input;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule],
            declarations: [ToggleComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ToggleComponent);
        component = fixture.componentInstance;
        input = fixture.nativeElement.querySelector('input');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should accept custom id', () => {
        const id = 'custom-id';
        component.id = id;
        component.ngOnInit();
        expect(component.id).toBe(id);
    });

    it('should generate id', () => {
        component.ngOnInit();
        expect(component.id).toBeTruthy();
    });

    it('should toggle on click', () => {
        spyOn(component, 'onChange');
        spyOn(component.checkedChange, 'emit');

        component.ngOnInit();
        component.checked = false;
        fixture.detectChanges();

        input.click();
        fixture.detectChanges();

        expect(component.onChange).toHaveBeenCalledWith(true);
        expect(component.checkedChange.emit).toHaveBeenCalledWith(true);

        input.click();
        fixture.detectChanges();

        expect(component.onChange).toHaveBeenCalledWith(false);
        expect(component.checkedChange.emit).toHaveBeenCalledWith(false);
    });

    it('should have a default size', () => {
        component.size = 'test';
        component.ngOnInit();
        expect(component.size).toBeNull();
    });

    it('should focus inner input element', () => {
        spyOn(component.inputElement.nativeElement, 'focus');
        component.focus();
        expect(component.inputElement.nativeElement.focus).toHaveBeenCalled();
    });

    it('should display size', () => {
        const size = 'l';
        component.size = size;
        component.ngOnInit();
        fixture.detectChanges();

        const toggle = fixture.nativeElement.querySelector('.fd-toggle');
        expect(toggle.classList).toContain('fd-toggle--' + size)
    });

});
