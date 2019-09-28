import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { SelectModule } from './select.module';
import { Component, ElementRef, TemplateRef, ViewChild } from '@angular/core';

@Component({
    selector: 'fd-test-wrapper-select',
    template: `
        <fd-select [(value)]="wrapperValue" formControlName="selectControl">
            <fd-option id="fdtest1" [value]="'test1'">Test1</fd-option>
            <fd-option id="fdtest2" [value]="'test2'">Test2</fd-option>
            <fd-option id="viewValue1" [value]="'viewValue1'" [viewValue]="'testViewValue'">Test3</fd-option>
            <div>
                <fd-option id="nestedOption" [value]="'nestedOption'">Nested</fd-option>
            </div>
        </fd-select>
    `
})
class TestWrapperComponent {
    @ViewChild(SelectComponent, { static: true })
    selectRef: SelectComponent;

    @ViewChild(SelectComponent, { read: ElementRef, static: true  })
    selectElement: ElementRef;

    wrapperValue: string;
}

describe('SelectComponent', () => {
    let component: SelectComponent;
    let element: ElementRef;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [SelectModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.componentInstance.selectRef;
        element = fixture.componentInstance.selectElement;
        fixture.detectChanges();

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should start closed', fakeAsync(() => {
        expect(document.body.querySelector('#fdtest1')).toBeFalsy();
    }));

    it('should open', fakeAsync(() => {
        component.isOpen = true;
        fixture.detectChanges();
        tick();
        expect(document.body.querySelector('#fdtest1')).toBeTruthy();
    }));

    it('should close', fakeAsync(() => {
        component.isOpen = true;
        fixture.detectChanges();
        tick();
        expect(document.body.querySelector('#fdtest1')).toBeTruthy();
        component.isOpen = false;
        fixture.detectChanges();
        tick();
        expect(document.body.querySelector('#fdtest1')).toBeFalsy();

    }));

    it('should open on click', fakeAsync(() => {
        component.isOpen = false;
        element.nativeElement.querySelector('.fd-button').click();
        fixture.detectChanges();
        tick();
        expect(component.isOpen).toBe(true);
        expect(document.body.querySelector('#fdtest1')).toBeTruthy();
    }));

    it('should close on click while open', fakeAsync(() => {
        component.isOpen = true;
        fixture.detectChanges();
        tick();
        expect(document.body.querySelector('#fdtest1')).toBeTruthy();
        element.nativeElement.querySelector('.fd-button').click();
        fixture.detectChanges();
        tick();
        expect(component.isOpen).toBe(false);
        expect(document.body.querySelector('#fdtest1')).toBeFalsy();
    }));

    it('should close on outside click', fakeAsync(() => {
        component.isOpen = true;
        fixture.detectChanges();
        tick();
        expect(document.body.querySelector('#fdtest1')).toBeTruthy();
        document.body.click();
        fixture.detectChanges();
        tick();
        expect(document.body.querySelector('#fdtest1')).toBeFalsy();
    }));

    it('should select an option', fakeAsync(() => {
        spyOn(component.valueChange, 'emit').and.callThrough();
        component.isOpen = true;
        expect(component.value).toBeFalsy();
        fixture.detectChanges();
        tick();
        document.body.querySelector('#fdtest1').dispatchEvent(new MouseEvent('click'));
        expect(component.value).toBe('test1');
        expect(component.valueChange.emit).toHaveBeenCalledWith('test1');
    }));

    it('should be disabled', fakeAsync(() => {
        component.disabled = true;
        fixture.detectChanges();
        tick();
        element.nativeElement.querySelector('.fd-button').click();
        fixture.detectChanges();
        tick();
        expect(document.body.querySelector('#fdtest1')).toBeFalsy();
    }));

    it('should change value programmatically', fakeAsync(() => {
        const testValue = 'test1';
        expect(component.value).toBeFalsy();
        fixture.componentInstance.wrapperValue = testValue;
        fixture.detectChanges();
        tick();
        expect(component.value).toBe(testValue);
        expect(component.options.find(option => option.value === testValue).selected).toBe(true);
        expect((component as any).selected).toBeTruthy();
        expect((component as any).selected.value).toBe(testValue);
    }));

    it('should support custom view values', fakeAsync(() => {
        const testValue = 'viewValue1';
        expect(component.value).toBeFalsy();
        fixture.componentInstance.wrapperValue = testValue;
        fixture.detectChanges();
        tick();
        expect(component.triggerValue).toBe('testViewValue');
        expect(component.value).toBe(testValue);
    }));

    it('should detect nested options', fakeAsync(() => {
        component.isOpen = true;
        fixture.detectChanges();
        tick();
        document.body.querySelector('#nestedOption').dispatchEvent(new MouseEvent('click'));
        expect(component.value).toBe('nestedOption');
        expect(component.triggerValue).toBe('Nested');
    }));

});
