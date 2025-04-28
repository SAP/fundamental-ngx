import { Component, signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LegendItemComponent } from './calendar-legend-item.component';

@Component({
    template: `
        <fd-calendar-legend-item
            [text]="text()"
            [color]="color()"
            [circle]="circle()"
            [id]="id()"
            [type]="type()"
            (focusedElementEvent)="onFocus($event)"
        ></fd-calendar-legend-item>
    `,
    imports: [LegendItemComponent]
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
    let legendItem: LegendItemComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [LegendItemHostTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LegendItemHostTestComponent);
        host = fixture.componentInstance;
        legendItem = fixture.debugElement.query(By.directive(LegendItemComponent)).componentInstance;
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

    it('should set the id correctly', () => {
        expect(legendItem.id()).toBe('fd-calendar-legend-item-1');
    });

    it('should set the type correctly', () => {
        expect(legendItem.type()).toBe('appointment');
    });

    it('should emit the focused element event', () => {
        const eventSpy = jest.spyOn(host, 'onFocus');
        legendItem.onFocus();
        fixture.detectChanges();
        expect(eventSpy).toHaveBeenCalledWith('fd-calendar-legend-item-1');
    });
});
