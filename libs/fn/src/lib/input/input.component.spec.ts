import { FormsModule } from '@angular/forms';
import { DisabledBehaviorModule, ReadonlyBehaviorModule } from '@fundamental-ngx/fn/cdk';
import { runValueAccessorTests } from 'ngx-cva-test-suite';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { InputState } from './input-base';
import { InputModule } from './input.module';

describe('InputComponent', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [InputComponent],
            imports: [DisabledBehaviorModule, ReadonlyBehaviorModule, FormsModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(InputComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should appropriate states', () => {
        const states: InputState[] = ['positive', 'negative', 'critical', 'info'];

        states.forEach((state) => {
            component.state = state;
            component.ngOnChanges();
            fixture.detectChanges();

            expect(fixture.nativeElement.classList).toContain(`fn-input--${state}`);
        });
    });

    it('should writeValue', () => {
        component.writeValue('test');
        expect(component.inputText).toBe('test');
    });

    it('should call onTouched and onChange', () => {
        spyOn(component, 'onTouched');
        spyOn(component, 'onChange');
        component.inputText = 'test';
        expect(component.onTouched).toHaveBeenCalled();
        expect(component.onChange).toHaveBeenCalled();
    });

    it('should setDisabledState', () => {
        component.setDisabledState(true);
        expect(component.disabledByForm).toBeTruthy();
    });
});

const INPUT_IDENTIFIER = 'fn-input-unit-test';

runValueAccessorTests({
    component: InputComponent,
    testModuleMetadata: {
        imports: [InputModule]
    },
    supportsOnBlur: false,
    nativeControlSelector: `input[id="${INPUT_IDENTIFIER}"]`,
    internalValueChangeSetter: (fixture, value) => {
        fixture.componentInstance.inputText = value;
    },
    getComponentValue: (fixture) => fixture.componentInstance.inputText
});
