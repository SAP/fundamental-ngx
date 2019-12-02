import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SelectComponent } from './select.component';
import { ElementRef, ViewChild, Component } from '@angular/core';

@Component({
    selector: 'fdp-select',
    template: `
        <fdp-select class="fd-select-popover-custom fd-popover-custom" 
        [selectType]="'noborder'" 
        [gylph]="'filter'" 
        [list]="option"
        [placeholder]="'select from values'">
    `
})
class TestWrapperComponent {

    @ViewChild(SelectComponent, { static: true })
    selectRef: SelectComponent;

    @ViewChild(SelectComponent, { read: ElementRef, static: true })
    selectElement: ElementRef;

    wrapperValue: string;
}

describe('SelectComponent', () => {
    let component: SelectComponent;
    let fixture: ComponentFixture<SelectComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ SelectComponent ]
    })
    .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should start closed', fakeAsync(() => {
        expect(document.body.querySelector('#fdtest1')).toBeFalsy();
    }));

    it('should support custom view values', fakeAsync(() => {
        component.selectType = 'noborder';
        fixture.detectChanges();
        tick();
        expect(document.body.querySelector('#fdtest1')).toBeTruthy();
    }));
    it('should support custom view values', fakeAsync(() => {
        component.selectType = 'splitborder';
        fixture.detectChanges();
        tick();
        expect(document.body.querySelector('#fdtest1')).toBeTruthy();
    }));
});
