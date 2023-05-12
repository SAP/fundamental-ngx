import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ChangeDetectorRef, ElementRef } from '@angular/core';

import { OptionComponent } from './option.component';
import SpyInstance = jest.SpyInstance;

describe('OptionComponent', () => {
    let component: OptionComponent;
    let fixture: ComponentFixture<OptionComponent>;
    let keyHandlerSpy: SpyInstance<any>;
    let setSelectedSpy: SpyInstance<any>;

    const changeDetectorRef = { markForCheck: jest.fn() };
    const elementRef = new ElementRef(null);

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [OptionComponent],
            providers: [
                { provide: ChangeDetectorRef, useValue: changeDetectorRef },
                { provide: ElementRef, useValue: elementRef }
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OptionComponent);
        component = fixture.componentInstance;
        setSelectedSpy = jest.spyOn(component, '_selectViaInteraction');
        keyHandlerSpy = jest.spyOn(component, '_handleKeydown');
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should create', () => {
        fixture.detectChanges();
        expect(component).toBeTruthy();
    });

    it('should make HTML Element available', () => {
        fixture.detectChanges();
        expect(component._getHtmlElement()).toBeTruthy();
    });

    it('should be focusable', () => {
        fixture.detectChanges();
        component.focus();
        expect(document.activeElement).toBe(component._getHtmlElement());
    });

    it('should be selectable by click', () => {
        component._getHtmlElement().click();

        expect(component.selected).toBe(true);
        expect(setSelectedSpy).toHaveBeenCalled();
        expect(keyHandlerSpy).not.toHaveBeenCalled();
    });

    it('should be selectable by keyboard', () => {
        component._getHtmlElement().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        component._getHtmlElement().dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));

        expect(component.selected).toBe(true);
        expect(setSelectedSpy).toHaveBeenCalled();
        expect(keyHandlerSpy).toHaveBeenCalledTimes(2);
        expect(setSelectedSpy).toHaveBeenCalledTimes(2);
    });

    it('should not fire select event when disabled', () => {
        component.disabled = true;
        fixture.detectChanges();

        component._getHtmlElement().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        fixture.detectChanges();
        component._getHtmlElement().dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
        fixture.detectChanges();
        component._getHtmlElement().click();
        fixture.detectChanges();

        expect(keyHandlerSpy).toHaveBeenCalledTimes(2);
        expect(component.selected).toEqual(false);
    });
});
