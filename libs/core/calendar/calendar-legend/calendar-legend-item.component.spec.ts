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
            [id]="id()"
        ></fd-calendar-legend-item>
    `,
    imports: [CalendarLegendItemComponent]
})
export class LegendItemHostTestComponent {
    text = signal<string>('Legend Item');
    color = signal<string>('placeholder-1');
    circle = signal<boolean>(false);
    id = signal<string>('fd-calendar-legend-item-1');
    type = signal<string>('appointment');
    onFocus = (event: string): void => {
        console.log('Focused element:', event);
    };
}

describe('LegendItemComponent', () => {
    let fixture: ComponentFixture<LegendItemHostTestComponent>;
    let host: LegendItemHostTestComponent;
    let legendItem: CalendarLegendItemComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [LegendItemHostTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LegendItemHostTestComponent);
        host = fixture.componentInstance;
        legendItem = fixture.debugElement.query(By.directive(CalendarLegendItemComponent)).componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should set the text correctly', () => {
        expect(legendItem.text()).toBe('Legend Item');
    });

    it('should set the color correctly', () => {
        expect(legendItem.color()).toBe('placeholder-1');
    });
});
