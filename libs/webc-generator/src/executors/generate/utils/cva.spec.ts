// Mock @angular/core before importing cva.ts to avoid ESM parsing issues in jest (node env)
jest.mock('@angular/core', () => ({
    Directive: () => () => undefined,
    inject: jest.fn(),
    ElementRef: class {},
    ChangeDetectorRef: class {},
    InjectionToken: class {
        constructor(public desc: string) {}
    },
    forwardRef: (fn: () => any) => fn
}));
jest.mock('@angular/forms', () => ({
    NG_VALUE_ACCESSOR: 'NG_VALUE_ACCESSOR'
}));

import { CvaConfig, GenericControlValueAccessor } from './cva';

// rAF runs synchronously in tests
global.requestAnimationFrame = (cb: FrameRequestCallback): number => {
    cb(0);
    return 0;
};

function makeDirective(config?: CvaConfig, elementOverrides: Record<string, any> = {}): GenericControlValueAccessor {
    const mockElement = {
        addEventListener: jest.fn(),
        disabled: false,
        value: 'A',
        checked: false,
        ...elementOverrides
    };
    // Use Object.create to avoid Angular inject() being called in the constructor
    const directive = Object.create(GenericControlValueAccessor.prototype) as GenericControlValueAccessor;
    (directive as any)['elementRef'] = { nativeElement: mockElement };
    (directive as any)['cdr'] = { markForCheck: jest.fn() };
    (directive as any)['config'] = config ?? null;
    // Initialize private state fields that would normally be set by the constructor
    (directive as any)['_value'] = null;
    (directive as any)['_valueSet'] = false;
    (directive as any)['_initialized'] = false;
    (directive as any)['_disabled'] = false;
    return directive;
}

function getElement(directive: GenericControlValueAccessor): Record<string, any> {
    return (directive as any)['elementRef'].nativeElement;
}

function getCdr(directive: GenericControlValueAccessor): { markForCheck: jest.Mock } {
    return (directive as any)['cdr'];
}

const defaultConfig: CvaConfig = {
    property: 'value',
    events: ['change'],
    transformValue: (v) => v || ''
};

describe('GenericControlValueAccessor', () => {
    describe('registerOnChange / registerOnTouched', () => {
        it('stores the onChange callback', () => {
            const directive = makeDirective(defaultConfig);
            const fn = jest.fn();
            directive.registerOnChange(fn);
            expect((directive as any)['onChange']).toBe(fn);
        });

        it('stores the onTouched callback', () => {
            const directive = makeDirective(defaultConfig);
            const fn = jest.fn();
            directive.registerOnTouched(fn);
            expect((directive as any)['onTouched']).toBe(fn);
        });
    });

    describe('writeValue', () => {
        it('stores the value but does not write to element before initialization', () => {
            const directive = makeDirective(defaultConfig);
            directive.writeValue('hello');
            expect(getElement(directive).value).not.toBe('hello');
            expect((directive as any)['_valueSet']).toBe(true);
        });

        it('writes to element immediately when called after initialization', () => {
            const directive = makeDirective(defaultConfig);
            directive.ngAfterViewInit();
            directive.writeValue('hello');
            expect(getElement(directive).value).toBe('hello');
        });
    });

    describe('setDisabledState', () => {
        it('stores disabled flag without touching element before initialization', () => {
            const directive = makeDirective(defaultConfig);
            directive.setDisabledState(true);
            expect(getElement(directive).disabled).toBe(false);
        });

        it('sets element.disabled and calls markForCheck after initialization', () => {
            const directive = makeDirective(defaultConfig);
            directive.ngAfterViewInit();
            directive.setDisabledState(true);
            expect(getElement(directive).disabled).toBe(true);
            expect(getCdr(directive).markForCheck).toHaveBeenCalled();
        });
    });

    describe('ngAfterViewInit — event listener wiring', () => {
        it('registers an event listener for each configured event', () => {
            const directive = makeDirective({ property: 'value', events: ['change', 'input'] });
            directive.ngAfterViewInit();
            const el = getElement(directive);
            const registeredEvents = (el.addEventListener as jest.Mock).mock.calls.map((c: any[]) => c[0]);
            expect(registeredEvents).toContain('change');
            expect(registeredEvents).toContain('input');
        });

        it('registers a focusout listener', () => {
            const directive = makeDirective(defaultConfig);
            directive.ngAfterViewInit();
            const el = getElement(directive);
            const registeredEvents = (el.addEventListener as jest.Mock).mock.calls.map((c: any[]) => c[0]);
            expect(registeredEvents).toContain('focusout');
        });
    });

    describe('event handling', () => {
        it('calls onChange with transformed value when configured event fires', () => {
            const onChange = jest.fn();
            const directive = makeDirective(defaultConfig);
            directive.registerOnChange(onChange);
            directive.ngAfterViewInit();

            const el = getElement(directive);
            const changeListener = (el.addEventListener as jest.Mock).mock.calls.find(
                (c: any[]) => c[0] === 'change'
            )?.[1];
            changeListener({ target: { value: 'hello' } });

            expect(onChange).toHaveBeenCalledWith('hello');
        });

        it('applies transformValue — falsy input becomes empty string', () => {
            const onChange = jest.fn();
            const directive = makeDirective(defaultConfig);
            directive.registerOnChange(onChange);
            directive.ngAfterViewInit();

            const el = getElement(directive);
            const changeListener = (el.addEventListener as jest.Mock).mock.calls.find(
                (c: any[]) => c[0] === 'change'
            )?.[1];
            changeListener({ target: { value: null } });

            expect(onChange).toHaveBeenCalledWith('');
        });

        it('calls onTouched and markForCheck when focusout fires', () => {
            const onTouched = jest.fn();
            const directive = makeDirective(defaultConfig);
            directive.registerOnTouched(onTouched);
            directive.ngAfterViewInit();

            const el = getElement(directive);
            const focusoutListener = (el.addEventListener as jest.Mock).mock.calls.find(
                (c: any[]) => c[0] === 'focusout'
            )?.[1];
            focusoutListener({});

            expect(onTouched).toHaveBeenCalled();
            expect(getCdr(directive).markForCheck).toHaveBeenCalled();
        });
    });

    describe('default config (no CVA_CONFIG provided)', () => {
        it('falls back to property: value', () => {
            const directive = makeDirective(undefined);
            const effectiveConfig = (directive as any)['effectiveConfig'];
            expect(effectiveConfig.property).toBe('value');
        });

        it('falls back to events: [change, input]', () => {
            const directive = makeDirective(undefined);
            const effectiveConfig = (directive as any)['effectiveConfig'];
            expect(effectiveConfig.events).toEqual(['change', 'input']);
        });
    });

    describe('_valueSet guard', () => {
        it('does not write to element when writeValue was never called', () => {
            const directive = makeDirective(defaultConfig, { value: 'native-value' });
            directive.ngAfterViewInit();
            expect(getElement(directive).value).toBe('native-value');
        });
    });
});
