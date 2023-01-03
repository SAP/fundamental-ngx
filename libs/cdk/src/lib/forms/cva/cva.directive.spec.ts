import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { runValueAccessorTests } from 'ngx-cva-test-suite';
import { addCvaDirective } from '../helpers/cva';
import { CvaDirective } from './cva.directive';

let UNIQUE_ID = 0;

@Component({
    selector: 'fd-cva-test-control',
    template: `
        <input
            #comboboxInput
            class="combobox-input"
            type="text"
            [attr.list]="'inputOptions' + uniqueId"
            autocomplete="off"
            (input)="onInput($event)"
            (blur)="onBlur()"
        />
    `,
    hostDirectives: [addCvaDirective]
})
export class TestComponent implements ControlValueAccessor, AfterViewInit {
    @ViewChild('comboboxInput') comboboxInput: ElementRef<HTMLInputElement>;

    readonly uniqueId = ++UNIQUE_ID;

    private _viewInit = false;

    get value(): any {
        return this._directive.value;
    }

    constructor(private readonly _directive: CvaDirective, private readonly _renderer: Renderer2) {}

    onInput(event: Event): void {
        this.setValue((<HTMLInputElement>event.target).value ?? '', true);
    }

    onBlur(): void {
        this._directive.onTouched();
    }

    registerOnChange(fn: any): void {
        this._directive.registerOnChange(fn);
    }

    registerOnTouched(fn: any): void {
        this._directive.registerOnTouched(fn);
    }

    setDisabledState(isDisabled: boolean): void {
        this._directive.setDisabledState(isDisabled);
    }

    writeValue(obj: any): void {
        this._directive.writeValue(obj);
    }

    ngAfterViewInit(): void {
        this._viewInit = true;
    }

    setValue(value: any, emitOnChange = true): void {
        if (this._viewInit) {
            this._renderer.setProperty(this.comboboxInput.nativeElement, 'value', value);
        }
        this._directive.setValue(value, emitOnChange);
    }
}

describe('CvaDirective', () => {
    runValueAccessorTests({
        /** Component, that is being tested */
        component: TestComponent,
        /**
         * All the metadata required for this test to run.
         * Under the hood calls TestBed.configureTestingModule with provided config.
         */
        testModuleMetadata: {
            declarations: [TestComponent]
        },
        /** Whether component is able to track "onBlur" events separately */
        supportsOnBlur: true,
        /**
         * CSS selector for the element, that should dispatch `blur` event.
         * Required and used only if `supportsOnBlur` is set to true.
         */
        nativeControlSelector: 'input.combobox-input',
        /**
         * Tests the correctness of an approach that is used to set value in the component,
         * when the change is internal. It's optional and can be omitted by passing "null"
         */
        internalValueChangeSetter: (fixture, value) => {
            fixture.componentInstance.setValue(value, true);
        },
        /** Function to get the value of a component in a runtime. */
        getComponentValue: (fixture) => fixture.componentInstance.value
    });
});
