import { ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { ProductSwitchComponent } from './product-switch.component';

describe('ProductSwitchComponent', () => {
    let component: ProductSwitchComponent;
    let fixture: ComponentFixture<ProductSwitchComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ProductSwitchComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProductSwitchComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have default placement of bottom-end', () => {
        expect(component.placement()).toBe('bottom-end');
    });

    it('should accept input values', () => {
        fixture.componentRef.setInput('placement', 'top-start');
        fixture.componentRef.setInput('disabled', true);
        fixture.componentRef.setInput('closeOnEscapeKey', false);
        fixture.detectChanges();

        expect(component.placement()).toBe('top-start');
        expect(component.disabled()).toBe(true);
        expect(component.closeOnEscapeKey()).toBe(false);
    });

    it('should support isOpen model signal', () => {
        expect(component.isOpen()).toBe(false);

        component.isOpen.set(true);
        fixture.detectChanges();

        expect(component.isOpen()).toBe(true);
    });

    it('should have noArrow set to true by default', () => {
        expect(component.noArrow()).toBe(true);
    });

    it('should accept triggers input', () => {
        fixture.componentRef.setInput('triggers', ['mouseenter', 'mouseleave']);
        fixture.detectChanges();

        expect(component.triggers()).toEqual(['mouseenter', 'mouseleave']);
    });

    it('should apply disabled class binding when disabled', () => {
        fixture.componentRef.setInput('disabled', true);
        fixture.detectChanges();

        expect(fixture.nativeElement.classList.contains('fd-popover-custom--disabled')).toBe(true);
    });

    it('should emit isOpenChange when open state changes', fakeAsync(() => {
        const emittedValues: boolean[] = [];
        component.isOpenChange.subscribe((value: boolean) => emittedValues.push(value));

        component.isOpen.set(true);
        fixture.detectChanges();
        tick();

        component.isOpen.set(false);
        fixture.detectChanges();
        tick();

        expect(emittedValues).toContain(true);
        expect(emittedValues).toContain(false);
    }));
});
