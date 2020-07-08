import { InitialFocusDirective } from './initial-focus.directive';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

@Component({ template: '<button fd-initial-focus #elementToFocus></button>' })
class TestComponent {
    @ViewChild('elementToFocus') elementToFocus: ElementRef;
}

describe('InitialFocusDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, InitialFocusDirective]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should focus element', () => {
        expect(document.activeElement).toBe(component.elementToFocus.nativeElement);
    });
});
