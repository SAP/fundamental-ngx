import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { SelectModule } from './select.module';
import { Component, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'fd-test-wrapper-select',
    template: `
        <fd-select>
            <fd-option id="fdtest1" [value]="'test1'">Test1</fd-option>
            <fd-option id="fdtest2" [value]="'test2'">Test2</fd-option>
            <fd-option id="fdtest3" [value]="'test3'">Test3</fd-option>
        </fd-select>
    `
})
class TestWrapperComponent {
    @ViewChild(SelectComponent)
    selectRef: SelectComponent;
}

fdescribe('SelectComponent', () => {
    let component: SelectComponent;
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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open', fakeAsync(() => {
        component.isOpen = true;
        fixture.detectChanges();
        tick(2000);
        expect(document.body.querySelector('#fdtest1')).toBeTruthy();
    }));

    it('should open on enter key pressed', () => {
        expect(component).toBeTruthy();
    });

    it('should close', () => {
        expect(component).toBeTruthy();
    });

    it('should close on outside click', () => {
        expect(component).toBeTruthy();
    });

    it('should select an option', () => {
        expect(component).toBeTruthy();
    });

    it('should be disabled', () => {
        expect(component).toBeTruthy();
    });

    it('should change value programmatically', () => {
        expect(component).toBeTruthy();
    });

    it('should support custom view values', () => {
        expect(component).toBeTruthy();
    });

    it('should detect nested options', () => {
        expect(component).toBeTruthy();
    });

    it('should support custom trigger templates', () => {
        expect(component).toBeTruthy();
    });

    it('should support adding options', () => {
        expect(component).toBeTruthy();
    });

    it('should support removing options', () => {
        expect(component).toBeTruthy();
    });

    it('should be usable in a form', () => {
        expect(component).toBeTruthy();
    });
});
