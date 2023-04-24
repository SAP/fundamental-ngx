import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { createMouseEvent } from '@fundamental-ngx/core/tests';

import { MessageStripComponent, MessageStripState } from './message-strip.component';
import { MessageStripModule } from './message-strip.module';

@Component({
    selector: 'fn-test-component',
    template: `
        <fn-message-strip
            [state]="state"
            [glyph]="glyph"
            [dismissible]="dismissible"
            (dismiss)="dismiss()"
        ></fn-message-strip>
    `
})
export class TestComponent {
    glyph: string;
    state: MessageStripState;
    dismissible = true;

    @ViewChild(MessageStripComponent, { read: ElementRef })
    messageStrip: ElementRef<HTMLElement>;

    dismiss(): void {}
}

describe('MessageStripComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MessageStripModule],
            declarations: [TestComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        nativeElement = component.messageStrip.nativeElement;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should apply appropriate state', () => {
        const states: MessageStripState[] = ['information', 'success', 'warning', 'error'];

        states.forEach((state) => {
            component.state = state;
            fixture.detectChanges();

            expect(nativeElement.classList).toContain(`fn-message-strip--${state}`);
        });
    });

    it('should render icon', async () => {
        component.glyph = 'message-information';
        fixture.detectChanges();

        await fixture.whenStable();
        fixture.detectChanges();

        expect(nativeElement.querySelector('.fn-message-strip__icon')).toBeTruthy();
    });

    it('should trigger dismiss event', () => {
        const eventSpy = jest.spyOn(component, 'dismiss');

        const clickEvent = createMouseEvent('click');

        const dismissButton = nativeElement.querySelector('.fn-message-strip__close-button') as HTMLElement;

        dismissButton.dispatchEvent(clickEvent);

        expect(eventSpy).toHaveBeenCalled();
    });
});
