import { Component, Directive, OnChanges, OnInit, ElementRef, ViewChild, ContentChild, Renderer2 } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from '../../button/public_api';
import { CssClassBuilder, applyCssClass } from '../../utils/public_api';

const TEST_DIRECTIVE_CLASS = 'fd-test-directive';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fd-test-directive]'
})
export class TestDirective implements OnInit, OnChanges, CssClassBuilder {
    class: string;

    constructor(private _elementRef: ElementRef) {}

    ngOnInit(): void {
        this.buildComponentCssClass();
    }

    ngOnChanges(): void {
        this.buildComponentCssClass();
    }

    @applyCssClass
    buildComponentCssClass(): string[] {
        return [TEST_DIRECTIVE_CLASS];
    }

    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}

const TEST_CONTENT_CHILD_PHASE_CLASS_NAME = 'content-child-phase-class-name';

@Component({
    selector: 'fd-test-proxy-component',
    template: '<ng-content></ng-content>'
})
export class TestProxyComponent {
    @ContentChild(ButtonComponent, { read: ElementRef })
    set buttonElementRef(elementRef: ElementRef<HTMLElement>) {
        this._renderer.addClass(elementRef?.nativeElement, TEST_CONTENT_CHILD_PHASE_CLASS_NAME);
    }

    constructor(private _renderer: Renderer2) {}
}

const TEST_VIEW_CHILD_PHASE_CLASS_NAME = 'view-child-phase-class-name';

@Component({
    selector: 'fd-test-component',
    template: `
        <fd-test-proxy-component>
            <button class="initial-button-class" #element fd-test-directive fd-button>Button</button>
        </fd-test-proxy-component>
    `
})
export class TestComponent {
    @ViewChild('element')
    element: ButtonComponent;

    @ViewChild('element', { read: ElementRef })
    set viewChildClassName(elementRef: ElementRef<HTMLElement>) {
        this._renderer.addClass(elementRef?.nativeElement, TEST_VIEW_CHILD_PHASE_CLASS_NAME);
    }

    constructor(private _renderer: Renderer2) {}
}

describe('ButtonComponent', () => {
    let fixture: ComponentFixture<TestComponent>;

    let testDirectiveInstance: TestDirective, buttonInstance: ButtonComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule],
            declarations: [TestDirective, ButtonComponent, TestComponent, TestProxyComponent]
        });
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        buttonInstance = (fixture.componentInstance.element as unknown) as ButtonComponent;
        testDirectiveInstance = (fixture.componentInstance.element as unknown) as TestDirective;
    });

    beforeEach(() => {
        /**
         * We have to check that calling buildComponentCssClass() in a row
         * at the beginning does not impact on expected result
         */
        buttonInstance.buildComponentCssClass();
        buttonInstance.buildComponentCssClass();
    });

    it('should keep initial class', async () => {
        const componentClasses = (buttonInstance.elementRef().nativeElement as HTMLElement).className;
        expect(componentClasses).toContain('initial-button-class');
    });

    it('should handle styles for 2 directives', async () => {
        buttonInstance.compact = true;
        buttonInstance.fdType = 'standard';

        testDirectiveInstance.ngOnInit();

        await fixture.whenStable();

        const componentClasses = (buttonInstance.elementRef().nativeElement as HTMLElement).className;

        expect(componentClasses).toContain('standard');
        expect(componentClasses).toContain('compact');
        expect(componentClasses).toContain(TEST_DIRECTIVE_CLASS);
    });

    it('should keep classes added at @ContentChild phase', async () => {
        const componentClasses = (buttonInstance.elementRef().nativeElement as HTMLElement).className;

        expect(componentClasses).toContain(TEST_CONTENT_CHILD_PHASE_CLASS_NAME);
    });

    it('should keep classes added at @ViewChild phase', async () => {
        const componentClasses = (buttonInstance.elementRef().nativeElement as HTMLElement).className;

        expect(componentClasses).toContain(TEST_VIEW_CHILD_PHASE_CLASS_NAME);
    });
});
