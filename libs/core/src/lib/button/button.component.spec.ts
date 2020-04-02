import { ButtonComponent } from './button.component';
import { Component, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

@Component({
    selector: 'fd-test-component',
    template: '<button fd-button>Button</button>',
})
export class TestComponent {}

describe('ButtonComponent', () => {
    let fixture: ComponentFixture<TestComponent>, debugElement: DebugElement, element: HTMLElement;

    let component, componentInstance: ButtonComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonComponent, TestComponent],
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        debugElement = fixture.debugElement;
        element = debugElement.nativeElement;
        fixture.detectChanges();
        component = debugElement.query(By.directive(ButtonComponent));
        componentInstance = component.injector.get(ButtonComponent);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add appropriate classes', () => {
        componentInstance.compact = true;
        componentInstance.glyph = 'someGlyph';
        componentInstance.fdType = 'standard';
        componentInstance.buildComponentCssClass();

        const cssClass = componentInstance.buildComponentCssClass();
        expect(cssClass).toContain('someGlyph');
        expect(cssClass).toContain('standard');
    });
});
