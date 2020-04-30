import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchComponent } from './switch.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

describe('SwitchComponent', () => {
    let component: SwitchComponent;
    let fixture: ComponentFixture<SwitchComponent>;
    let changeDetectorRef: ChangeDetectorRef;
    let input;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule],
            declarations: [SwitchComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SwitchComponent);
        component = fixture.componentInstance;
        input = fixture.nativeElement.querySelector('.fd-switch__input');
        changeDetectorRef = fixture.componentRef.injector.get(ChangeDetectorRef);
        fixture.detectChanges();
    });

    function detectChangesOnPush() {
        changeDetectorRef.markForCheck();
        fixture.detectChanges();
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should accept custom id', () => {
        const id = 'custom-id';
        component.id = id;

        detectChangesOnPush();

        expect(input.id).toBe(component.innerInputId);
    });

    it('should auto-generate id', () => {
        expect(component.id).toBeTruthy();
    });

    it('should switch on click', () => {
        spyOn(component.checkedChange, 'emit');

        component.checked = false;
        fixture.detectChanges();

        input.click();
        fixture.detectChanges();

        expect(component.checkedChange.emit).toHaveBeenCalledWith(true);

        input.click();
        fixture.detectChanges();

        expect(component.checkedChange.emit).toHaveBeenCalledWith(false);
    });

    it('should focus inner input element', () => {
        spyOn(input, 'focus');

        detectChangesOnPush();

        component.focus();

        expect(input.focus).toHaveBeenCalled();
    });

    it('should display compact', () => {
        component.compact = true;

        detectChangesOnPush();

        const switchComp = fixture.nativeElement.querySelector('.fd-switch');
        expect(switchComp.classList).toContain('fd-switch--compact');
    });

    it('should display semantic', () => {
        component.semantic = true;

        detectChangesOnPush();

        const switchComp = fixture.nativeElement.querySelector('.fd-switch');
        expect(switchComp.classList).toContain('fd-switch--semantic');
    });

    it('should disable', async () => {
        spyOn(component.checkedChange, 'emit');
        component.disabled = true;

        detectChangesOnPush();
        await fixture.whenStable();

        input.click();

        const switchComp = fixture.nativeElement.querySelector('.fd-switch');

        expect(component.checkedChange.emit).not.toHaveBeenCalled();
        expect(switchComp.classList).toContain('is-disabled');
        expect(input.disabled).toBeTrue();
    });
});
