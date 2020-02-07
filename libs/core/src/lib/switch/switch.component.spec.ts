import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchComponent } from './switch.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

describe('SwitchComponent', () => {
    let component: SwitchComponent;
    let fixture: ComponentFixture<SwitchComponent>;
    let input;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule],
            declarations: [SwitchComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SwitchComponent);
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
        expect(component.id).toBe(id);
    });

    it('should generate id', () => {
        expect(component.id).toBeTruthy();
    });

    it('should switch on click', () => {
        spyOn(component, 'onChange');
        spyOn(component.checkedChange, 'emit');

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

    it('should focus inner input element', () => {
        console.log(spyOn(component.inputElement.nativeElement, 'focus'));
        console.log(component.focus());
        console.log(expect(component.inputElement.nativeElement.focus).toHaveBeenCalled());
        spyOn(component.inputElement.nativeElement, 'focus');
        component.focus();
        expect(component.inputElement.nativeElement.focus).toHaveBeenCalled();
    });


    it('should display compact and semantic', () => {
        component.semantic = true;
        component.compact = true;
        component.disabled = true;
        (component as any).changeDetectorRef.markForCheck();
        fixture.detectChanges();

        const switchComp = fixture.nativeElement.querySelector('.fd-switch');
        expect(switchComp.classList).toContain('fd-switch--compact');
        expect(switchComp.classList).toContain('fd-switch--semantic');
        expect(switchComp.classList).toContain('fd-switch--disabled');
    });

});
