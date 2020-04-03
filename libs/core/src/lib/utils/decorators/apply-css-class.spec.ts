import { Component, Directive, OnChanges, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ButtonComponent } from '../../button/public_api';
import { CssClassBuilder, applyCssClass } from '../../utils/public_api';

const testDirectiveClass = 'fd-test-directive';

@Directive({
    // tslint:disable-next-line: directive-selector
    selector: '[fd-test-directive]',
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
    buildComponentCssClass(): string {
        return testDirectiveClass;
    }

    elementRef(): ElementRef<any> {
        return this._elementRef;
    }
}

@Component({
    selector: 'fd-test-component',
    template: '<button #element fd-test-directive fd-button>Button</button>',
})
export class TestComponent {
    @ViewChild('element') element: ElementRef;
}

describe('ButtonComponent', () => {
    let fixture: ComponentFixture<TestComponent>;

    let testDirectiveInstance: TestDirective, buttonInstance: ButtonComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TestDirective, ButtonComponent, TestComponent],
        });
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
        await fixture.whenStable();
        buttonInstance = (fixture.componentInstance.element as unknown) as ButtonComponent;
        testDirectiveInstance = (fixture.componentInstance.element as unknown) as TestDirective;
    });

    it('should handle styles for 2 directives', async () => {
        buttonInstance.compact = true;
        buttonInstance.fdType = 'standard';

        buttonInstance.ngOnInit();
        testDirectiveInstance.ngOnInit();

        await fixture.whenStable();

        const componentClasses = (buttonInstance.elementRef().nativeElement as HTMLElement).className;
        expect(componentClasses).toContain('standard');
        expect(componentClasses).toContain('compact');
        expect(componentClasses).toContain(testDirectiveClass);
    });
});
