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
    let fixture: ComponentFixture<TestComponent>, debugElement: DebugElement;
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

describe('ButtonComponent - AriaLabel Tests', () => {
    let fixture: ComponentFixture<TestComponent>;
    let debugElement: DebugElement;
    let component: DebugElement;
    let componentInstance: ButtonComponent;

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

    it('should return input ariaLabel if provided', () => {
        componentInstance.ariaLabel = 'Custom Aria Label';
        expect(componentInstance.buttonArialabel).toBe('Custom Aria Label');
    });

    it('should return element native aria-label attribute if no input ariaLabel provided', () => {
        const nativeElement: HTMLElement = componentInstance.elementRef.nativeElement;
        nativeElement.setAttribute('aria-label', 'Native Aria Label');
        expect(componentInstance.buttonArialabel).toBe('Native Aria Label');
    });

    it('should return label if fdType is special and label is provided', () => {
        componentInstance.fdType = 'emphasized';
        componentInstance.label = 'Button Label';
        expect(componentInstance.buttonArialabel).toBe('Button Label');
    });

    it('should return glyph with hyphen replaced as spaces if fdType is special and glyph is provided', () => {
        componentInstance.fdType = 'emphasized';
        // Ensure label is undefined to test glyph transformation.
        componentInstance.label = undefined;
        componentInstance.glyph = 'icon-glyph-name';
        expect(componentInstance.buttonArialabel).toBe('icon glyph name');
    });

    it('should return null if no conditions are met', () => {
        componentInstance.fdType = 'standard';
        expect(componentInstance.buttonArialabel).toBeNull();
    });
});
