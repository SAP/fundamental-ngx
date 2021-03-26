import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ButtonComponent } from './button.component';
import { ContentDensityService, DEFAULT_CONTENT_DENSITY } from '../utils/public_api';

@Component({
    selector: 'fd-test-component',
    template: '<button fd-button label="Button"></button>'
})
export class TestComponent {}

describe('ButtonComponent', () => {
    let fixture: ComponentFixture<TestComponent>, debugElement: DebugElement, element: HTMLElement;

    let component, componentInstance: ButtonComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonComponent, TestComponent],
            providers: [ContentDensityService]
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
        componentInstance.fdType = 'standard';
        componentInstance.fdMenu = true;
        componentInstance.buildComponentCssClass();

        const cssClass = componentInstance.buildComponentCssClass().join(' ');
        expect(cssClass).toContain('standard');
        expect(cssClass).toContain('fd-button--menu');
        expect(cssClass).toContain('compact');
    });

    it('should handle content density when compact input is not provided', () => {
        spyOn(componentInstance, 'buildComponentCssClass').and.callThrough();
        componentInstance.ngOnInit();
        expect(componentInstance.compact).toBe(DEFAULT_CONTENT_DENSITY !== 'cozy');
        expect(componentInstance.buildComponentCssClass).toHaveBeenCalled();
    });
});

@Component({
    selector: 'fd-disabled-test-component',
    template: '<button fd-button label="Button" disabled></button>'
})
export class DisabledTestComponent {}

@Component({
    selector: 'fd-aria-disabled-test-component',
    template: '<button fd-button label="Button" aria-disabled="true"></button>'
})
export class AriaDisabledTestComponent {}

describe('ButtonComponent – Disabled', () => {
    let disabledFixture: ComponentFixture<DisabledTestComponent>,
        ariaDisabledFixture: ComponentFixture<AriaDisabledTestComponent>,
        debugElement: DebugElement,
        element: HTMLElement;

    let component, componentInstance: ButtonComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ButtonComponent, DisabledTestComponent, AriaDisabledTestComponent]
        });
    }));

    it('should add is-disabled class to [disabled] button', () => {
        disabledFixture = TestBed.createComponent(DisabledTestComponent);
        debugElement = disabledFixture.debugElement;
        element = debugElement.nativeElement;
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
        element = debugElement.nativeElement;
        ariaDisabledFixture.detectChanges();
        component = debugElement.query(By.directive(ButtonComponent));
        componentInstance = component.injector.get(ButtonComponent);
        componentInstance.buildComponentCssClass();

        const cssClass = componentInstance.buildComponentCssClass().join(' ');
        expect(cssClass).toContain('is-disabled');
    });
});
