import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionComponent } from './option.component';

describe('OptionComponent', () => {
    let component: OptionComponent;
    let fixture: ComponentFixture<OptionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OptionComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(OptionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should make HTML Element available', () => {
        expect(component.getHtmlElement()).toBeTruthy();
    });

    xit('should be focusable', () => {
        component.focus();
        expect(document.activeElement).toBe(component.getHtmlElement());
    });

    it('should be selectable programmatically', () => {
        spyOn(component.selectedChange, 'emit');
        component.setSelected(true, true);
        expect(component.selectedChange.emit).toHaveBeenCalled();
        expect(component.selected).toBe(true);
    });

    it('should be selectable by click', () => {
        spyOn(component.selectedChange, 'emit');
        spyOn(component, 'selectionHandler').and.callThrough();
        component.getHtmlElement().click();
        expect(component.selectionHandler).toHaveBeenCalled();
        expect(component.selectedChange.emit).toHaveBeenCalled();
        expect(component.selected).toBe(true);
    });

    it('should be selectable by keyboard', () => {
        spyOn(component, 'selectionHandler').and.callThrough();
        spyOn(component.selectedChange, 'emit');
        component.getHtmlElement().dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
        expect(component.selectionHandler).toHaveBeenCalled();
        expect(component.selectedChange.emit).toHaveBeenCalled();
        expect(component.selected).toBe(true);
    });

    it('should not fire select event when disabled', () => {
        spyOn(component.selectedChange, 'emit');
        component.disabled = true;
        component.selectionHandler();
        expect(component.selectedChange.emit).not.toHaveBeenCalled();
    });

    it('should support custom view value', () => {
        component.value = 'value';
        expect(component.viewValueText).toBeFalsy();
        component.viewValue = 'viewValue';
        expect(component.viewValueText).toBe('viewValue');
    });
});
