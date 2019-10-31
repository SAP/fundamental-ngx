import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SelectPlatformComponent } from './select-platform.component';
import { Component, ViewChild, ElementRef } from '@angular/core';

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

    @ViewChild(SelectPlatformComponent, { static: true })
    selectRef: SelectPlatformComponent;

    @ViewChild(SelectPlatformComponent, { read: ElementRef, static: true })
    selectElement: ElementRef;

    wrapperValue: string;
}

describe('SelectPlatformComponent', () => {
    let component: SelectPlatformComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent]
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
        component.selectType = 'regularborder';
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
