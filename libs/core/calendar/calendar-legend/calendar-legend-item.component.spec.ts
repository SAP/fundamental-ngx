import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CalendarLegendItemComponent } from './calendar-legend-item.component';

@Component({
    template: `
        <fd-calendar-legend-item
            [text]="text()"
            [color]="color()"
            [circle]="circle()"
            [class]="customClass()"
        ></fd-calendar-legend-item>
    `,
    imports: [CalendarLegendItemComponent]
})
export class LegendItemHostTestComponent {
    text = signal<string>('Legend Item');
    color = signal<string>('placeholder-1');
    circle = signal<boolean>(false);
    customClass = signal<string>('');
}

describe('CalendarLegendItemComponent', () => {
    let fixture: ComponentFixture<LegendItemHostTestComponent>;
    let host: LegendItemHostTestComponent;
    let legendItem: CalendarLegendItemComponent;
    let nativeElement: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [LegendItemHostTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LegendItemHostTestComponent);
        host = fixture.componentInstance;
        legendItem = fixture.debugElement.query(By.directive(CalendarLegendItemComponent)).componentInstance;
        nativeElement = fixture.debugElement.query(By.directive(CalendarLegendItemComponent)).nativeElement;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(host).toBeTruthy();
        expect(legendItem).toBeTruthy();
    });

    describe('signal inputs', () => {
        it('should set the text correctly', () => {
            expect(legendItem.text()).toBe('Legend Item');
        });

        it('should update text when signal changes', () => {
            host.text.set('Updated Text');
            fixture.detectChanges();
            expect(legendItem.text()).toBe('Updated Text');
        });

        it('should set the color correctly', () => {
            expect(legendItem.color()).toBe('placeholder-1');
        });

        it('should update color when signal changes', () => {
            host.color.set('placeholder-5');
            fixture.detectChanges();
            expect(legendItem.color()).toBe('placeholder-5');
        });

        it('should set circle property correctly', () => {
            expect(legendItem.circle()).toBe(false);
        });

        it('should update circle when signal changes', () => {
            host.circle.set(true);
            fixture.detectChanges();
            expect(legendItem.circle()).toBe(true);
        });

        it('should set custom class correctly', () => {
            host.customClass.set('custom-test-class');
            fixture.detectChanges();
            expect(legendItem.class()).toBe('custom-test-class');
        });
    });

    describe('computed CSS classes', () => {
        it('should have base fd-calendar-legend__item class', () => {
            expect(nativeElement.classList.contains('fd-calendar-legend__item')).toBe(true);
        });

        it('should add appointment class when circle is true', () => {
            host.circle.set(true);
            fixture.detectChanges();
            expect(nativeElement.classList.contains('fd-calendar-legend__item--appointment')).toBe(true);
        });

        it('should not add appointment class when circle is false', () => {
            host.circle.set(false);
            fixture.detectChanges();
            expect(nativeElement.classList.contains('fd-calendar-legend__item--appointment')).toBe(false);
        });

        it('should add color class when color is provided', () => {
            host.color.set('placeholder-5');
            fixture.detectChanges();
            expect(nativeElement.classList.contains('fd-calendar-legend__item--placeholder-5')).toBe(true);
        });

        it('should not add color class when color is empty', () => {
            host.color.set('');
            fixture.detectChanges();
            const colorClasses = Array.from(nativeElement.classList).filter((c) => c.includes('placeholder'));
            expect(colorClasses.length).toBe(0);
        });

        it('should include custom class in computed classes', () => {
            host.customClass.set('my-custom-class');
            fixture.detectChanges();
            expect(nativeElement.classList.contains('my-custom-class')).toBe(true);
        });

        it('should combine all classes correctly', () => {
            host.circle.set(true);
            host.color.set('placeholder-10');
            host.customClass.set('test-class');
            fixture.detectChanges();
            expect(nativeElement.classList.contains('fd-calendar-legend__item')).toBe(true);
            expect(nativeElement.classList.contains('fd-calendar-legend__item--appointment')).toBe(true);
            expect(nativeElement.classList.contains('fd-calendar-legend__item--placeholder-10')).toBe(true);
            expect(nativeElement.classList.contains('test-class')).toBe(true);
        });
    });

    describe('host bindings', () => {
        it('should apply computed classes to host element', () => {
            host.circle.set(true);
            host.color.set('placeholder-5');
            fixture.detectChanges();

            expect(nativeElement.classList.contains('fd-calendar-legend__item')).toBe(true);
            expect(nativeElement.classList.contains('fd-calendar-legend__item--appointment')).toBe(true);
            expect(nativeElement.classList.contains('fd-calendar-legend__item--placeholder-5')).toBe(true);
        });

        it('should update host classes when signal inputs change', () => {
            expect(nativeElement.classList.contains('fd-calendar-legend__item--appointment')).toBe(false);

            host.circle.set(true);
            fixture.detectChanges();

            expect(nativeElement.classList.contains('fd-calendar-legend__item--appointment')).toBe(true);
        });

        it('should have tabindex attribute', () => {
            expect(nativeElement.getAttribute('tabindex')).toBe('0');
        });
    });

    describe('inject() usage', () => {
        it('should inject ElementRef using inject() function', () => {
            expect(legendItem.elementRef).toBeTruthy();
            expect(legendItem.elementRef.nativeElement).toBe(nativeElement);
        });
    });
});
