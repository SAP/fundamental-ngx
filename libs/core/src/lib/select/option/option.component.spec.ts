import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionComponent } from './option.component';
import { ChangeDetectorRef, ElementRef } from '@angular/core';
import Spy = jasmine.Spy;
import { SelectProxy } from '../select-proxy.service';

describe('OptionComponent', () => {
    let component: OptionComponent;
    let fixture: ComponentFixture<OptionComponent>;
    let keyHandlerSpy: Spy<any>;
    let setSelectedSpy: Spy<any>;
    const selectValue = 'Pineapple';

    const changeDetectorRef = jasmine.createSpyObj('ChangeDetectorRef', ['markForCheck']);
    const elementRef = new ElementRef(null);

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OptionComponent],
            providers: [
                SelectProxy,
                {provide: ChangeDetectorRef, useValue: changeDetectorRef},
                {provide: ElementRef, useValue: elementRef}
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OptionComponent);
        component = fixture.componentInstance;
        setSelectedSpy = spyOn(component, 'setSelected').and.callThrough();
        keyHandlerSpy = spyOn(component, 'selectionHandler').and.callThrough();
        fixture.detectChanges();
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

    it('should be selected based on control state', () => {
        component.value = selectValue;
        component['_selectProxy'].value$.next(selectValue);

        expect(setSelectedSpy).toHaveBeenCalled();
        expect(component.selected).toBe(true);
    });

    it('should be selectable by click', () => {

        component.getHtmlElement().click();

        expect(component.selected).toBe(true);
        expect(keyHandlerSpy).toHaveBeenCalled();
        expect(setSelectedSpy).toHaveBeenCalledWith(true, true);
    });

    it('should be selectable by keyboard', () => {

        component.getHtmlElement().dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
        component.getHtmlElement().dispatchEvent(new KeyboardEvent('keydown', {key: ' '}));

        expect(component.selected).toBe(true);
        expect(setSelectedSpy).toHaveBeenCalledWith(true, true);
        expect(keyHandlerSpy).toHaveBeenCalledTimes(2);
        expect(setSelectedSpy).toHaveBeenCalledTimes(2);
    });

    it('should not fire select event when disabled', () => {
        component.disabled = true;
        fixture.detectChanges();

        component.getHtmlElement().dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
        fixture.detectChanges();
        component.getHtmlElement().dispatchEvent(new KeyboardEvent('keydown', {key: ' '}));
        fixture.detectChanges();
        component.getHtmlElement().click();
        fixture.detectChanges();

        expect(keyHandlerSpy).toHaveBeenCalledTimes(3);
        expect(component.selected).toEqual(false);
    });
});
