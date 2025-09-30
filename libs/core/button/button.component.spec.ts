import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ButtonComponent } from './button.component';
import { ButtonModule } from './button.module';

@Component({
    selector: 'fd-test-component',
    template: '<button fd-button [ariaLabel]="ariaLabel" label="Button"></button>',
    standalone: true,
    imports: [ButtonComponent]
})
export class TestComponent {
    ariaLabel: string | null = null;
}

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
    let fixture: ComponentFixture<ButtonComponent>, componentInstance: ButtonComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ButtonComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonComponent);
        fixture.detectChanges();
        componentInstance = fixture.componentInstance;
    });

    it('should create ButtonComponent', () => {
        expect(componentInstance).toBeTruthy();
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

    it('should set a default id', () => {
        expect(componentInstance.id()).toBe('fd-button-4');
    });

    it('should set a custom id if such is provided', () => {
        fixture.componentRef.setInput('id', 'custom-id');
        fixture.detectChanges();
        expect(componentInstance.id()).toBe('custom-id');
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
        const hostInstance = fixture.componentInstance;
        hostInstance.ariaLabel = 'Custom Aria Label';
        fixture.detectChanges();

        expect(componentInstance.buttonArialabel()).toBe('Custom Aria Label');
    });

    it('should return null if no conditions are met', () => {
        componentInstance.fdType = 'standard';
        expect(componentInstance.buttonArialabel()).toBeNull();
    });
});
