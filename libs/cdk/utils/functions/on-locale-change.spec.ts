import { Injector, runInInjectionContext, signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { onLocaleChange } from './on-locale-change';

describe('onLocaleChange', () => {
    let injector: Injector;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        injector = TestBed.inject(Injector);
    });

    it('should NOT call fn on the initial (set-up) read', () => {
        const locale = signal('en');
        const fn = jest.fn();

        runInInjectionContext(injector, () => {
            onLocaleChange({ locale }, fn);
        });

        TestBed.tick();
        expect(fn).not.toHaveBeenCalled();
    });

    it('should call fn on each subsequent locale change', () => {
        const locale = signal('en');
        const fn = jest.fn();

        runInInjectionContext(injector, () => {
            onLocaleChange({ locale }, fn);
        });

        TestBed.tick(); // initial read, skipped
        expect(fn).not.toHaveBeenCalled();

        locale.set('de');
        TestBed.tick();
        expect(fn).toHaveBeenCalledTimes(1);

        locale.set('fr');
        TestBed.tick();
        expect(fn).toHaveBeenCalledTimes(2);
    });

    it('should not call fn when locale is set to the same value', () => {
        const locale = signal('en');
        const fn = jest.fn();

        runInInjectionContext(injector, () => {
            onLocaleChange({ locale }, fn);
        });

        TestBed.tick();
        locale.set('en'); // same value -> signal does not notify
        TestBed.tick();
        expect(fn).not.toHaveBeenCalled();
    });
});
