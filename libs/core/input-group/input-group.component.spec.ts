import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Type } from '@angular/core';
import { ControlValueAccessor, FormsModule } from '@angular/forms';
import { CVATestSteps, runValueAccessorTests } from 'ngx-cva-test-suite';
import { first } from 'rxjs/operators';
import {
    InputGroupAddOnDirective,
    InputGroupInputDirective,
    InputGroupTextareaDirective
} from './input-group-directives';
import { InputGroupComponent } from './input-group.component';

describe('InputGroupComponent', () => {
    let component: InputGroupComponent;
    let fixture: ComponentFixture<InputGroupComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [
                FormsModule,
                InputGroupInputDirective,
                InputGroupAddOnDirective,
                InputGroupTextareaDirective,
                InputGroupComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(InputGroupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get an ID and handle the close event for that ID', (done) => {
        component.addOnButtonClicked.pipe(first()).subscribe(($event) => {
            expect($event).toBeDefined();
            done();
        });
        component._buttonClicked({} as any);
    });

    describe('Accessibility - Non-Button Icon Addon (aria-label placement)', () => {
        it('should NOT place aria-label on role-less span when glyph is provided (non-button)', () => {
            component.glyph = 'search';
            component.glyphAriaLabel = 'Search Icon';
            fixture.detectChanges();

            const addonSpan = fixture.nativeElement.querySelector('[fd-input-group-addon]');
            expect(addonSpan).toBeTruthy();
            expect(addonSpan.getAttribute('aria-label')).toBeNull();
        });

        it('should place ariaLabel on fd-icon when glyph is provided (non-button)', () => {
            component.glyph = 'search';
            component.glyphAriaLabel = 'Search Icon';
            fixture.detectChanges();

            const icon = fixture.nativeElement.querySelector('fd-icon');
            expect(icon).toBeTruthy();
            expect(icon.getAttribute('aria-label')).toBe('Search Icon');
            // When ariaLabel is set, role should be 'img' (from IconComponent)
            expect(icon.getAttribute('role')).toBe('img');
        });

        it('should fallback to glyph name when glyphAriaLabel is not provided (non-button)', () => {
            component.glyph = 'search';
            component.glyphAriaLabel = null;
            fixture.detectChanges();

            const icon = fixture.nativeElement.querySelector('fd-icon');
            expect(icon).toBeTruthy();
            expect(icon.getAttribute('aria-label')).toBe('search');
            expect(icon.getAttribute('role')).toBe('img');
        });

        it('should NOT have aria-label on icon when only text add-on is provided (non-button)', () => {
            component.addOnText = 'USD';
            component.button = false;
            fixture.detectChanges();

            const icon = fixture.nativeElement.querySelector('fd-icon');
            expect(icon).toBeFalsy(); // Icon should not exist when only text is shown
            const addonSpan = fixture.nativeElement.querySelector('[fd-input-group-addon]');
            expect(addonSpan).toBeTruthy();
            expect(addonSpan.getAttribute('aria-label')).toBeNull();
            expect(addonSpan.textContent).toContain('USD');
        });
    });

    describe('Accessibility - Button Addon (aria-label placement)', () => {
        it('should place ariaLabel on fd-button when glyph is provided (button addon)', () => {
            component.glyph = 'search';
            component.glyphAriaLabel = 'Search Button';
            component.button = true;
            fixture.detectChanges();

            const button = fixture.nativeElement.querySelector('button[fd-button]');
            expect(button).toBeTruthy();
            expect(button.getAttribute('aria-label')).toBe('Search Button');
        });

        it('should fallback to glyph name when glyphAriaLabel is not provided (button addon)', () => {
            component.glyph = 'search';
            component.glyphAriaLabel = null;
            component.button = true;
            fixture.detectChanges();

            const button = fixture.nativeElement.querySelector('button[fd-button]');
            expect(button).toBeTruthy();
            expect(button.getAttribute('aria-label')).toBe('search');
        });

        it('should use addOnText as fallback for ariaLabel when no glyph (button addon)', () => {
            component.glyph = null;
            component.addOnText = 'USD';
            component.button = true;
            fixture.detectChanges();

            const button = fixture.nativeElement.querySelector('button[fd-button]');
            expect(button).toBeTruthy();
            expect(button.getAttribute('aria-label')).toBe('USD');
        });
    });
});

describe('InputGroup component CVA', () => {
    runValueAccessorTests({
        /** Component, that is being tested */
        component: InputGroupComponent as unknown as Type<Required<ControlValueAccessor>>,
        /**
         * All the metadata required for this test to run.
         * Under the hood calls TestBed.configureTestingModule with provided config.
         */
        testModuleMetadata: {
            imports: [InputGroupComponent]
        },
        hostTemplate: {
            hostComponent: InputGroupComponent,
            getTestingComponent: (fixture) => fixture.componentInstance._cvaControl.cvaDirective!
        },
        /** Whether component is able to track "onBlur" events separately */
        supportsOnBlur: false,
        /**
         * CSS selector for the element, that should dispatch `blur` event.
         * Required and used only if `supportsOnBlur` is set to true.
         */
        nativeControlSelector: 'fd-input-group input',
        /**
         * Tests the correctness of an approach that is used to set value in the component,
         * when the change is internal. It's optional and can be omitted by passing "null"
         */
        internalValueChangeSetter: (fixture, value) => {
            fixture.componentInstance._cvaControl.cvaDirective?.setValue(value, true);
        },
        /** Function to get the value of a component in a runtime. */
        getComponentValue: (fixture: ComponentFixture<InputGroupComponent>) => fixture.componentInstance.inputText,

        excludeSteps: [CVATestSteps.ValueChangedInternally]
    });
});
