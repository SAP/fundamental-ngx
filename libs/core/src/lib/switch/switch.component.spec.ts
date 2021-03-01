import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { SwitchComponent } from './switch.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

describe('SwitchComponent', () => {
    let component: SwitchComponent;
    let fixture: ComponentFixture<SwitchComponent>;
    let changeDetectorRef: ChangeDetectorRef;
    let input;

    beforeEach(waitForAsync(() => {
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

    function detectChangesOnPush(): void {
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

    it('should accept custom name', () => {
        const name = 'custom-name';
        component.name = name;

        detectChangesOnPush();

        expect(input.getAttribute('ng-reflect-name')).toEqual(component.name);
    });

    it('should auto-generate id', () => {
        expect(component.id).toBeTruthy();
    });

    it('should switch on click', fakeAsync(() => {

        const checkedChangeSpy = spyOn(component.checkedChange, 'emit');

        component.isChecked = true;

        expect(checkedChangeSpy).toHaveBeenCalledWith(true);

        component.isChecked = false;

        expect(checkedChangeSpy).toHaveBeenCalledWith(false);
    }));

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
});
