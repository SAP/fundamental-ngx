import { Component, DebugElement, QueryList, ViewChildren } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import {
    ContentDensityMode,
    ContentDensityModule,
    mockedLocalContentDensityDirective
} from '@fundamental-ngx/core/content-density';
import { FormControlComponent } from './form-control.component';

const { contentDensityDirectiveProvider, setContentDensity } = mockedLocalContentDensityDirective(
    ContentDensityMode.COMPACT
);

@Component({
    selector: 'fd-test-component',
    template: `
        <div fd-form-control="">FormControl</div>
        <textarea fd-form-control=""></textarea>
        <input fd-form-control="" />
    `,
    imports: [FormControlComponent, ContentDensityModule],
    providers: [contentDensityDirectiveProvider]
})
export class TestComponent {
    @ViewChildren(FormControlComponent)
    controls: QueryList<FormControlComponent>;
}

@Component({
    selector: 'fd-number-input-test',
    template: `
        <input
            fd-form-control
            type="number"
            [(ngModel)]="value"
            [min]="min"
            [max]="max"
            [step]="step"
            [largeStep]="largeStep"
            [stepMode]="stepMode"
            [valuePrecision]="valuePrecision"
            [useGrouping]="useGrouping"
            [validationMode]="validationMode"
            [textAlign]="textAlign"
            (validationChange)="onValidationChange($event)"
        />
    `,
    imports: [FormControlComponent, FormsModule]
})
export class NumberInputTestComponent {
    value: number | null = null;
    min: number | string | null = null;
    max: number | string | null = null;
    step: number | string | null = null;
    largeStep: number | string | null = null;
    stepMode: 'addition' | 'multiple' = 'addition';
    valuePrecision: number | string | null = null;
    useGrouping = false;
    validationMode: 'live' | 'delayed' = 'delayed';
    textAlign: 'start' | 'center' | 'end' = 'end';
    validationState: boolean | null = null;

    onValidationChange(isValid: boolean): void {
        this.validationState = isValid;
    }
}

@Component({
    selector: 'fd-number-locale-test',
    template: ` <input fd-form-control type="number" [(ngModel)]="value" [locale]="locale" [useGrouping]="true" /> `,
    imports: [FormControlComponent, FormsModule]
})
export class NumberLocaleTestComponent {
    value: number | null = null;
    locale = 'en-US';
}

@Component({
    selector: 'fd-number-live-precision-test',
    template: `
        <input fd-form-control type="number" [(ngModel)]="value" [valuePrecision]="2" [validationMode]="'live'" />
    `,
    imports: [FormControlComponent, FormsModule]
})
export class NumberLivePrecisionTestComponent {
    value: number | null = null;
}

describe('FormControlComponent', () => {
    let fixture: ComponentFixture<TestComponent>, testComponent: TestComponent, debugElement: DebugElement;

    let directive, componentInstance;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        debugElement = fixture.debugElement;
        fixture.detectChanges();
        directive = debugElement.query(By.directive(FormControlComponent));
        componentInstance = directive.injector.get(FormControlComponent);
    });

    it('should create', () => {
        expect(testComponent).toBeTruthy();
        expect(componentInstance).toBeTruthy();
    });

    it('should add appropriate classes', () => {
        testComponent.controls.forEach((control) => {
            const tagName = control.elementRef.nativeElement.tagName.toLowerCase();
            if (tagName === 'input') {
                expect(control.elementRef.nativeElement.classList).toContain('fd-input');
                expect(control.elementRef.nativeElement.classList).not.toContain('fd-textarea');
            } else if (tagName === 'textarea') {
                expect(control.elementRef.nativeElement.classList).toContain('fd-textarea');
                expect(control.elementRef.nativeElement.classList).not.toContain('fd-input');
            } else {
                expect(control.elementRef.nativeElement.classList).not.toContain('fd-input');
                expect(control.elementRef.nativeElement.classList).not.toContain('fd-textarea');
            }
        });
    });

    it('should be able to change the contentDensity to "compact"', async () => {
        setContentDensity(ContentDensityMode.COMPACT);

        fixture.detectChanges();
        await fixture.whenStable();

        expect(fixture.debugElement.query(By.directive(FormControlComponent)).nativeElement.classList).toContain(
            'is-compact'
        );
    });

    it('should not stamp a type attribute onto a textarea host', () => {
        const textarea: HTMLTextAreaElement = debugElement.query(By.css('textarea')).nativeElement;

        expect(textarea.hasAttribute('type')).toBe(false);
    });

    it('should set type="text" on an input host by default', () => {
        const input: HTMLInputElement = debugElement.query(By.css('input')).nativeElement;

        expect(input.getAttribute('type')).toBe('text');
    });
});

describe('FormControlComponent - Number Input', () => {
    let fixture: ComponentFixture<NumberInputTestComponent>;
    let testComponent: NumberInputTestComponent;
    let inputElement: HTMLInputElement;
    let formControlInstance: FormControlComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NumberInputTestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NumberInputTestComponent);
        testComponent = fixture.componentInstance;
        inputElement = fixture.nativeElement.querySelector('input');
        formControlInstance = fixture.debugElement.query(By.directive(FormControlComponent)).componentInstance;
        fixture.detectChanges();
    });

    describe('Basic Validation', () => {
        it('should block non-numeric characters', () => {
            const event = new KeyboardEvent('keydown', { key: 'a', bubbles: true, cancelable: true });
            const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

            inputElement.dispatchEvent(event);

            expect(preventDefaultSpy).toHaveBeenCalled();
        });

        it('should allow numeric characters', () => {
            const event = new KeyboardEvent('keydown', { key: '5', bubbles: true, cancelable: true });
            const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

            inputElement.dispatchEvent(event);

            // Should not prevent default for valid numeric input
            expect(preventDefaultSpy).not.toHaveBeenCalled();
        });

        it('should allow minus sign at the beginning', () => {
            inputElement.value = '';
            inputElement.setSelectionRange(0, 0);

            const event = new KeyboardEvent('keydown', { key: '-', bubbles: true, cancelable: true });
            const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

            inputElement.dispatchEvent(event);

            expect(preventDefaultSpy).not.toHaveBeenCalled();
        });

        it('should block minus sign when not at the beginning', () => {
            inputElement.value = '123';
            inputElement.setSelectionRange(3, 3);

            const event = new KeyboardEvent('keydown', { key: '-', bubbles: true, cancelable: true });
            const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

            inputElement.dispatchEvent(event);

            expect(preventDefaultSpy).toHaveBeenCalled();
        });

        it('should allow decimal separator only once', () => {
            inputElement.value = '';
            inputElement.setSelectionRange(0, 0);

            const event1 = new KeyboardEvent('keydown', { key: '.', bubbles: true, cancelable: true });
            const preventDefaultSpy1 = jest.spyOn(event1, 'preventDefault');

            inputElement.dispatchEvent(event1);
            expect(preventDefaultSpy1).not.toHaveBeenCalled();

            inputElement.value = '3.14';
            inputElement.setSelectionRange(4, 4);

            const event2 = new KeyboardEvent('keydown', { key: '.', bubbles: true, cancelable: true });
            const preventDefaultSpy2 = jest.spyOn(event2, 'preventDefault');

            inputElement.dispatchEvent(event2);
            expect(preventDefaultSpy2).toHaveBeenCalled();
        });

        it('should allow scientific notation (e/E)', () => {
            inputElement.value = '1';
            inputElement.setSelectionRange(1, 1);

            const event = new KeyboardEvent('keydown', { key: 'e', bubbles: true, cancelable: true });
            const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

            inputElement.dispatchEvent(event);

            expect(preventDefaultSpy).not.toHaveBeenCalled();
        });

        it('should allow control keys', () => {
            const keys = ['Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'ArrowLeft', 'ArrowRight', 'Home', 'End'];

            keys.forEach((key) => {
                const event = new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true });
                const preventDefaultSpy = jest.spyOn(event, 'preventDefault');

                inputElement.dispatchEvent(event);

                // Control keys should not be blocked (though some like Escape/Enter may call preventDefault for their own logic)
                if (key !== 'Escape' && key !== 'Enter') {
                    expect(preventDefaultSpy).not.toHaveBeenCalled();
                }
            });
        });
    });

    describe('Step Size - Addition Mode', () => {
        beforeEach(fakeAsync(() => {
            testComponent.step = 5;
            testComponent.value = 3;
            fixture.detectChanges();
            tick();
        }));

        it('should increment value by step on ArrowUp', fakeAsync(() => {
            testComponent.value = 3;
            fixture.detectChanges();
            tick();

            const event = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true });
            inputElement.dispatchEvent(event);

            fixture.detectChanges();
            tick();

            expect(testComponent.value).toBe(8);
        }));

        it('should decrement value by step on ArrowDown', fakeAsync(() => {
            testComponent.value = 13;
            fixture.detectChanges();
            tick();

            const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true });
            inputElement.dispatchEvent(event);

            fixture.detectChanges();
            tick();

            expect(testComponent.value).toBe(8);
        }));
    });

    describe('Larger Step Size', () => {
        beforeEach(fakeAsync(() => {
            testComponent.step = 5;
            testComponent.largeStep = 3;
            testComponent.value = 5;
            fixture.detectChanges();
            tick();
        }));

        it('should increment by step * largeStep on PageUp', fakeAsync(() => {
            const event = new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true, cancelable: true });
            inputElement.dispatchEvent(event);

            fixture.detectChanges();
            tick();

            // 5 + (5 * 3) = 5 + 15 = 20
            expect(testComponent.value).toBe(20);
        }));

        it('should decrement by step * largeStep on PageDown', fakeAsync(() => {
            testComponent.value = 20;
            fixture.detectChanges();
            tick();

            const event = new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true, cancelable: true });
            inputElement.dispatchEvent(event);

            fixture.detectChanges();
            tick();

            // 20 - (5 * 3) = 20 - 15 = 5
            expect(testComponent.value).toBe(5);
        }));
    });

    describe('Step Mode - Multiple', () => {
        beforeEach(fakeAsync(() => {
            testComponent.step = 5;
            testComponent.stepMode = 'multiple';
            testComponent.value = 1;
            fixture.detectChanges();
            tick();
        }));

        it('should round to next multiple on ArrowUp', fakeAsync(() => {
            const event = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true });
            inputElement.dispatchEvent(event);

            fixture.detectChanges();
            tick();

            // 1 + 5 = 6, floor(6/5) * 5 = 1 * 5 = 5
            expect(testComponent.value).toBe(5);
        }));

        it('should handle multiple mode with largeStep correctly', fakeAsync(() => {
            testComponent.largeStep = 3;
            testComponent.value = 3;
            fixture.detectChanges();
            tick();

            const event = new KeyboardEvent('keydown', { key: 'PageUp', bubbles: true, cancelable: true });
            inputElement.dispatchEvent(event);

            fixture.detectChanges();
            tick();

            // 3 + (5 * 3) = 3 + 15 = 18, floor(18/5) * 5 = 3 * 5 = 15
            expect(testComponent.value).toBe(15);
        }));

        it('should round down to 0 on PageDown from 15', fakeAsync(() => {
            testComponent.largeStep = 3;
            testComponent.value = 15;
            fixture.detectChanges();
            tick();

            const event = new KeyboardEvent('keydown', { key: 'PageDown', bubbles: true, cancelable: true });
            inputElement.dispatchEvent(event);

            fixture.detectChanges();
            tick();

            // 15 - (5 * 3) = 15 - 15 = 0, floor(0/5) * 5 = 0
            expect(testComponent.value).toBe(0);
        }));
    });

    describe('Min & Max Boundaries', () => {
        beforeEach(fakeAsync(() => {
            testComponent.min = 0;
            testComponent.max = 10;
            testComponent.step = 1;
            testComponent.value = 5;
            fixture.detectChanges();
            tick();
        }));

        it('should clamp value to max on ArrowUp', fakeAsync(() => {
            testComponent.value = 10;
            fixture.detectChanges();
            tick();

            const event = new KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true, cancelable: true });
            inputElement.dispatchEvent(event);

            fixture.detectChanges();
            tick();

            expect(testComponent.value).toBe(10);
        }));

        it('should clamp value to min on ArrowDown', fakeAsync(() => {
            testComponent.value = 0;
            fixture.detectChanges();
            tick();

            const event = new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true, cancelable: true });
            inputElement.dispatchEvent(event);

            fixture.detectChanges();
            tick();

            expect(testComponent.value).toBe(0);
        }));
    });

    describe('Value Precision', () => {
        beforeEach(fakeAsync(() => {
            testComponent.valuePrecision = 2;
            fixture.detectChanges();
            tick();
        }));

        it('should have valuePrecision input configured', () => {
            expect(formControlInstance.valuePrecision()).toBe(2);
        });

        it('should truncate to precision and sync the number on blur', fakeAsync(() => {
            inputElement.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
            inputElement.value = '3.14159';
            inputElement.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
            fixture.detectChanges();
            tick();

            expect(inputElement.value).toBe('3.14');
            expect(testComponent.value).toBe(3.14);
        }));

        it('should not block an over-precision keystroke in delayed mode (default)', fakeAsync(() => {
            inputElement.value = '3.14';
            inputElement.setSelectionRange(4, 4);
            const event = new KeyboardEvent('keydown', { key: '5', bubbles: true, cancelable: true });
            inputElement.dispatchEvent(event);

            expect(event.defaultPrevented).toBe(false);
        }));
    });

    describe('Escape Key Reset', () => {
        it('should restore value before focus on Escape', fakeAsync(() => {
            testComponent.value = 50;
            fixture.detectChanges();
            tick();

            inputElement.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
            fixture.detectChanges();
            tick();

            inputElement.value = '99';
            const event = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true });
            inputElement.dispatchEvent(event);

            fixture.detectChanges();
            tick();

            expect(inputElement.value).toBe('50');
        }));
    });

    describe('Enter Key Behavior', () => {
        it('should set value to 0 when Enter pressed on empty field', fakeAsync(() => {
            testComponent.value = null;
            fixture.detectChanges();
            tick();

            inputElement.value = '';
            const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
            inputElement.dispatchEvent(event);

            fixture.detectChanges();
            tick();

            expect(testComponent.value).toBe(0);
        }));

        it('should validate and sync the number on Enter without re-focusing', fakeAsync(() => {
            testComponent.valuePrecision = 2;
            fixture.detectChanges();
            tick();

            inputElement.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
            const blurSpy = jest.spyOn(inputElement, 'blur');

            inputElement.value = '12.3456';
            const event = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, cancelable: true });
            inputElement.dispatchEvent(event);
            fixture.detectChanges();
            tick();

            // No blur/focus round-trip is used to commit the value
            expect(blurSpy).not.toHaveBeenCalled();
            expect(inputElement.value).toBe('12.35');
            expect(testComponent.value).toBe(12.35);
        }));
    });

    describe('Focus Behavior', () => {
        it('should select all text on focus', fakeAsync(() => {
            testComponent.value = 123;
            fixture.detectChanges();
            tick();

            const selectSpy = jest.spyOn(inputElement, 'select');

            inputElement.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
            fixture.detectChanges();
            tick();

            expect(selectSpy).toHaveBeenCalled();
        }));
    });

    describe('Thousands Separator', () => {
        beforeEach(fakeAsync(() => {
            testComponent.useGrouping = true;
            fixture.detectChanges();
            tick();
        }));

        it('should have useGrouping input configured', () => {
            expect(formControlInstance.useGrouping()).toBe(true);
        });
    });

    describe('Mouse Wheel Scroll', () => {
        beforeEach(fakeAsync(() => {
            testComponent.step = 1;
            testComponent.value = 10;
            fixture.detectChanges();
            tick();
        }));

        it('should have step configured for wheel events', () => {
            expect(formControlInstance.step()).toBe(1);
        });
    });

    describe('Paste Behavior', () => {
        it('should use NumberInputService for paste validation', () => {
            const service = formControlInstance['numberInputService'];
            expect(service).toBeDefined();
            expect(service.isValidPaste('123.45', '.')).toBe(true);
            expect(service.isValidPaste('abc', '.')).toBe(false);
        });
    });

    describe('Text Alignment', () => {
        it('should apply text-align style for number inputs', () => {
            testComponent.textAlign = 'end';
            fixture.detectChanges();

            expect(inputElement.style.textAlign).toBe('end');
        });
    });
});

describe('FormControlComponent - Number Input Locale Support', () => {
    let fixture: ComponentFixture<NumberLocaleTestComponent>;
    let testComponent: NumberLocaleTestComponent;
    let inputElement: HTMLInputElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NumberLocaleTestComponent]
        });
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NumberLocaleTestComponent);
        testComponent = fixture.componentInstance;
        inputElement = fixture.nativeElement.querySelector('input');
        fixture.detectChanges();
    });

    describe('en-US Locale (dot decimal)', () => {
        beforeEach(() => {
            testComponent.locale = 'en-US';
            fixture.detectChanges();
        });

        it('should configure en-US locale', () => {
            const formControl = fixture.debugElement.query(By.directive(FormControlComponent)).componentInstance;
            expect(formControl.locale()).toBe('en-US');
        });
    });

    describe('de-DE Locale (comma decimal)', () => {
        beforeEach(() => {
            testComponent.locale = 'de-DE';
            fixture.detectChanges();
        });

        it('should use dot during editing for ngModel compatibility', fakeAsync(() => {
            testComponent.value = 1234.56;
            fixture.detectChanges();
            tick();

            inputElement.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
            fixture.detectChanges();
            tick();

            // During editing, always use dot
            expect(inputElement.value).toBe('1234.56');
        }));

        it('should display the grouped locale value but keep the model a plain number on blur', fakeAsync(() => {
            inputElement.dispatchEvent(new FocusEvent('focus', { bubbles: true }));
            inputElement.value = '1234.56';
            inputElement.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
            fixture.detectChanges();
            tick();

            // Display is formatted for the locale (period thousands, comma decimal)
            expect(inputElement.value).toBe('1.234,56');
            // ...but the bound model receives a canonical, JS-parseable numeric string
            expect(parseFloat(testComponent.value as unknown as string)).toBe(1234.56);
        }));
    });

    describe('fr-FR Locale (comma decimal)', () => {
        beforeEach(() => {
            testComponent.locale = 'fr-FR';
            fixture.detectChanges();
        });

        it('should configure fr-FR locale', () => {
            const formControl = fixture.debugElement.query(By.directive(FormControlComponent)).componentInstance;
            expect(formControl.locale()).toBe('fr-FR');
        });
    });
});

describe('FormControlComponent - Number Input Precision (live & paste)', () => {
    let fixture: ComponentFixture<NumberLivePrecisionTestComponent>;
    let inputElement: HTMLInputElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NumberLivePrecisionTestComponent]
        });
    }));

    beforeEach(fakeAsync(() => {
        fixture = TestBed.createComponent(NumberLivePrecisionTestComponent);
        inputElement = fixture.nativeElement.querySelector('input');
        fixture.detectChanges();
        tick();
    }));

    it('should block a digit keystroke that would exceed precision', () => {
        inputElement.value = '3.14';
        inputElement.setSelectionRange(4, 4);
        const event = new KeyboardEvent('keydown', { key: '5', bubbles: true, cancelable: true });
        inputElement.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(true);
    });

    it('should allow a digit keystroke that stays within precision', () => {
        inputElement.value = '3.1';
        inputElement.setSelectionRange(3, 3);
        const event = new KeyboardEvent('keydown', { key: '4', bubbles: true, cancelable: true });
        inputElement.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(false);
    });

    it('should allow a digit typed before the decimal separator', () => {
        inputElement.value = '3.14';
        inputElement.setSelectionRange(0, 0);
        const event = new KeyboardEvent('keydown', { key: '9', bubbles: true, cancelable: true });
        inputElement.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(false);
    });

    it('should prevent pasting a value that exceeds the configured precision', () => {
        const event = new Event('paste', { bubbles: true, cancelable: true });
        Object.defineProperty(event, 'clipboardData', { value: { getData: (): string => '3.14159' } });
        inputElement.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(true);
    });

    it('should allow pasting a value within the configured precision', () => {
        const event = new Event('paste', { bubbles: true, cancelable: true });
        Object.defineProperty(event, 'clipboardData', { value: { getData: (): string => '3.14' } });
        inputElement.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(false);
    });
});
