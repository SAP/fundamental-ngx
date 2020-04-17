import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionComponent } from './option.component';
import { SelectComponent } from '@fundamental-ngx/core';
import { BehaviorSubject } from 'rxjs';
import { ChangeDetectorRef, ElementRef } from '@angular/core';

describe('OptionComponent', () => {
    let component: OptionComponent;
    let fixture: ComponentFixture<OptionComponent>;
    const selectValue = 'Pineapple';
    const selectComponent: Partial<SelectComponent> = {
        value$: new BehaviorSubject<any>(selectValue),
        setSelectedOption: (option, controlChange) => {}
    };
    const changeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);
    const elementRef = new ElementRef(null);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OptionComponent],
            providers: [
                {provide: ChangeDetectorRef, useValue: changeDetectorRef},
                {provide: SelectComponent, useValue: selectComponent},
                {provide: ElementRef, useValue: elementRef}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OptionComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should make HTML Element available', () => {
        fixture.detectChanges();
        expect(component.getHtmlElement()).toBeTruthy();
    });

    it('should be focusable', () => {
        fixture.detectChanges();
        component.focus();
        expect(document.activeElement).toBe(component.getHtmlElement());
    });

    it('should be selected based on control state', async () => {
        spyOn(component, 'setSelected');
        spyOn(component.selectedChange, 'emit');
        component.value = selectValue;

        fixture.detectChanges();
        await fixture.whenStable();

        expect(component.selectedChange.emit).toHaveBeenCalled();
        expect(component.setSelected).toHaveBeenCalled();
        expect(component.selected).toBe(true);
    });

    it('should be selectable by click', () => {
        spyOn(component, 'setSelected');
        spyOn(component, 'selectionHandler');
        spyOn(component.selectedChange, 'emit');
        fixture.detectChanges();

        component.getHtmlElement().click();
        fixture.detectChanges();

        expect(component.selected).toBe(true);
        expect(component.selectionHandler).toHaveBeenCalled();
        expect(component.selectedChange.emit).toHaveBeenCalled();
        expect(component.setSelected).toHaveBeenCalledWith(true, true);
    });

    it('should be selectable by keyboard', () => {
        fixture.detectChanges();
        spyOn(component, 'setSelected');
        spyOn(component, 'selectionHandler');
        spyOn(component.selectedChange, 'emit');

        component.getHtmlElement().dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
        fixture.detectChanges();
        component.getHtmlElement().dispatchEvent(new KeyboardEvent('keydown', {key: ' '}));
        fixture.detectChanges();

        expect(component.selected).toBe(true);
        expect(component.setSelected).toHaveBeenCalledTimes(2);
        expect(component.selectionHandler).toHaveBeenCalledTimes(2);
        expect(component.selectedChange.emit).toHaveBeenCalledTimes(2);
        expect(component.setSelected).toHaveBeenCalledWith(true, true);
    });

    it('should not fire select event when disabled', () => {
        component.disabled = true;
        fixture.detectChanges();

        spyOn(component, 'setSelected');
        spyOn(component, 'selectionHandler');
        spyOn(component.selectedChange, 'emit');

        component.getHtmlElement().dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
        fixture.detectChanges();
        component.getHtmlElement().dispatchEvent(new KeyboardEvent('keydown', {key: ' '}));
        fixture.detectChanges();
        component.getHtmlElement().click();
        fixture.detectChanges();

        expect(component.setSelected).not.toHaveBeenCalled();
        expect(component.selectedChange.emit).not.toHaveBeenCalled();
        expect(component.selectionHandler).toHaveBeenCalledTimes(3);
    });

    it('should support custom view value', () => {
        component.value = 'value';
        component.viewValue = 'viewValue';
        fixture.detectChanges();

        expect(component.viewValueText).toBe('viewValue')
    });
});
