import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';
import { ButtonModule } from './button.module';

@Component({
    selector: 'fd-test-component',
    template: '<button fd-button label="Button"></button>',
    standalone: true,
    imports: [ButtonComponent]
})
export class TestComponent {}

@Component({
    selector: 'fd-disabled-test-component',
    template: '<button fd-button label="Button" disabled></button>',
    standalone: true,
    imports: [ButtonComponent]
})
export class DisabledTestComponent {}

@Component({
    selector: 'fd-aria-disabled-test-component',
    template: '<button fd-button label="Button" aria-disabled="true"></button>',
    standalone: true,
    imports: [ButtonComponent]
})
export class AriaDisabledTestComponent {}

describe('ButtonComponent', () => {
    let fixture: ComponentFixture<TestComponent>,
        debugElement: DebugElement;
    let component, componentInstance: ButtonComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule, TestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        debugElement = fixture.debugElement;
        fixture.detectChanges();
        component = debugElement.query(By.directive(ButtonComponent));
        componentInstance = component.injector.get(ButtonComponent);
    });

    it('should create TestComponent', () => {
        expect(component).toBeTruthy();
    });

    it('should add appropriate classes', () => {
        componentInstance.fdType = 'standard';
        componentInstance.fdMenu = true;
        componentInstance.buildComponentCssClass();

        const cssClass = componentInstance.buildComponentCssClass().join(' ');
        expect(cssClass).toContain('fd-button--standard');
        expect(cssClass).toContain('fd-button--menu');
    });

    it('should handle content density when compact input is not provided', () => {
        jest.spyOn(componentInstance, 'buildComponentCssClass');
        componentInstance.ngOnInit();
        expect(componentInstance.buildComponentCssClass).toHaveBeenCalled();
    });
});

describe('ButtonComponent – Disabled', () => {
    let disabledFixture: ComponentFixture<DisabledTestComponent>,
        ariaDisabledFixture: ComponentFixture<AriaDisabledTestComponent>,
        debugElement: DebugElement;
    let component, componentInstance: ButtonComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule, DisabledTestComponent, AriaDisabledTestComponent]
        }).compileComponents();
    }));

    it('should add is-disabled class to [disabled] button', () => {
        disabledFixture = TestBed.createComponent(DisabledTestComponent);
        debugElement = disabledFixture.debugElement;
        disabledFixture.detectChanges();
        component = debugElement.query(By.directive(ButtonComponent));
        componentInstance = component.injector.get(ButtonComponent);
        componentInstance.buildComponentCssClass();

        const cssClass = componentInstance.buildComponentCssClass().join(' ');
        expect(cssClass).toContain('is-disabled');
    });

    it('should add is-disabled class to [aria-disabled="true"] button', () => {
        ariaDisabledFixture = TestBed.createComponent(AriaDisabledTestComponent);
        debugElement = ariaDisabledFixture.debugElement;
        ariaDisabledFixture.detectChanges();
        component = debugElement.query(By.directive(ButtonComponent));
        componentInstance = component.injector.get(ButtonComponent);
        componentInstance.buildComponentCssClass();

        const cssClass = componentInstance.buildComponentCssClass().join(' ');
        expect(cssClass).toContain('is-disabled');
    });
});
