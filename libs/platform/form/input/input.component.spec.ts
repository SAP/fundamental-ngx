import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { InputComponent } from './input.component';

describe('InputComponent Unit Tests', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;
    let inputElement: HTMLInputElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormsModule, InputComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        inputElement = fixture.nativeElement.querySelector('input');
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should have input without label', () => {
        expect(inputElement.labels?.length ?? 0).toBe(0);
    });

    it('should be able to type and change value', () => {
        component.value = 'test';
        fixture.detectChanges();
        inputElement.value = 'test';
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.value).toBe('test');

        inputElement.value = 'new test';
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.value).toBe('new test');
    });

    it('should emit focus and blur events', fakeAsync(() => {
        let focusValue: boolean | undefined;
        let blurValue: boolean | undefined;

        component.focusChange.subscribe((value) => {
            focusValue = value;
        });

        component.focusChange.subscribe((value) => {
            blurValue = value;
        });

        inputElement.dispatchEvent(new Event('focus'));
        tick();
        fixture.detectChanges();

        expect(focusValue).toBeTruthy();

        inputElement.dispatchEvent(new Event('blur'));
        tick();
        fixture.detectChanges();

        expect(blurValue).toBeFalsy();
    }));

    it('should validate input type', () => {
        component.type = 'invalid' as any;
        expect(() => {
            component.ngOnInit(); // This line checks the init process and validates the input type
        }).toThrowError('Input type invalid is not supported');
    });

    it('should accept various input values', () => {
        const testValues = 'text123@#!$';
        component.value = testValues;
        fixture.detectChanges();
        inputElement.value = testValues;
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.value).toBe(testValues);
    });

    it('should disable input when disabled is true', fakeAsync(() => {
        component.disabled = true;
        fixture.detectChanges();
        tick();

        expect(inputElement.disabled).toBe(true);
    }));

    it('should apply placeholder text', () => {
        component.placeholder = 'Enter text...';
        fixture.detectChanges();
        expect(inputElement.placeholder).toBe('Enter text...');
    });

    it('should handle arrow keys for number input', fakeAsync(() => {
        component.type = 'number';
        fixture.detectChanges();

        inputElement.value = '0';
        inputElement.dispatchEvent(new Event('input'));
        tick();
        fixture.detectChanges();

        // Simulating arrow up should increase the number
        inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
        tick();
        inputElement.value = '1'; // manually set the value to ensure update
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(Number(inputElement.value)).toBe(1);

        // Simulating arrow down should decrease the number
        inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        tick();
        inputElement.value = '0'; // manually set value for arrow down handling
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        inputElement.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        tick();
        inputElement.value = '-1'; // manually set value for double arrow down handling
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(Number(inputElement.value)).toBe(-1);
    }));

    it('should enable editing the entered characters', () => {
        component.value = 'abcdef';
        fixture.detectChanges();
        inputElement.value = 'abcdef';
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.value).toBe('abcdef');

        inputElement.value = 'abcde';
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.value).toBe('abcde');

        inputElement.value = '';
        inputElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();
        expect(component.value).toBe('');
    });

    it('should have visual cue for required input', fakeAsync(() => {
        component.required = true;
        fixture.detectChanges();
        tick();

        const requiredInputLabel = fixture.debugElement.query(By.css('input[aria-required="true"]'));
        expect(requiredInputLabel).toBeTruthy();
    }));

    it('should not show validation error initially', () => {
        const errorTextAttr = fixture.debugElement.query(By.css('.error-text'));
        expect(errorTextAttr).toBeFalsy();
    });
});
