import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusyIndicatorComponent } from './busy-indicator.component';
import { Component, ElementRef } from '@angular/core';
import { BusyIndicatorModule } from '@fundamental-ngx/core';


@Component({
    template: `
        <input type="text" id="input-1">

        <fd-busy-indicator [loading]="loading" [size]="size">
            <button *ngIf="hasContent">Button</button>
        </fd-busy-indicator>

        <input type="text" id="input-2">
    `
})
class TestWrapperComponent {
    loading: boolean = true;
    hasContent: boolean = true;
    size: 's' | 'm' | 'l' = 'm';

    constructor(public elementRef: ElementRef) {}
}

describe('BusyIndicatorComponent', () => {
    let component: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestWrapperComponent],
            imports: [BusyIndicatorModule]
        }).compileComponents();


        fixture = TestBed.createComponent(TestWrapperComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display loading state', () => {
        expect(fixture.nativeElement.querySelector('.fd-busy-indicator')).toBeTruthy();

        fixture.componentInstance.loading = false;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.fd-busy-indicator')).toBeFalsy();
    });

    it('should display proper size', () => {
        component.size = 's';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.fd-busy-indicator--s')).toBeTruthy();

        component.size = 'm';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.fd-busy-indicator--m')).toBeTruthy();

        component.size = 'l';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.fd-busy-indicator--l')).toBeTruthy();
    });

    it('should manage focus', () => {
        const input1 = fixture.nativeElement.querySelector('#input-1');
        const input2 = fixture.nativeElement.querySelector('#input-2');

        input1.focus();
        fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'Tab'}));
        fixture.detectChanges();

        expect(document.activeElement).toBe(fixture.nativeElement.querySelector('fd-busy-indicator'));

        fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'Tab'}));
        fixture.detectChanges();

        expect(document.activeElement).toBe(input2);

        fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'Tab', shiftKey: true}));
        fixture.detectChanges();

        expect(document.activeElement).toBe(fixture.nativeElement.querySelector('fd-busy-indicator'));

        fixture.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'Tab', shiftKey: true}));
        fixture.detectChanges();

        expect(document.activeElement).toBe(input1);
    });

    it('should display properly with content projection', () => {
        expect(fixture.nativeElement.querySelector('.fd-busy-indicator--absolute')).toBeTruthy();
        expect(fixture.nativeElement.querySelector('.fd-busy-indicator__overlay--transparent')).toBeFalsy();
    });

    it('should display properly with no projection', () => {
        component.hasContent = false;

        fixture.detectChanges();
        expect(fixture.nativeElement.querySelector('.fd-busy-indicator--absolute')).toBeFalsy();
        expect(fixture.nativeElement.querySelector('.fd-busy-indicator__overlay--transparent')).toBeTruthy();
    });
});
