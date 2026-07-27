import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActionSheetBodyComponent } from './action-sheet-body.component';

describe('ActionSheetBodyComponent', () => {
    let component: ActionSheetBodyComponent;
    let fixture: ComponentFixture<ActionSheetBodyComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ActionSheetBodyComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ActionSheetBodyComponent);
        component = fixture.componentInstance;
    });

    it('should prevent Tab and emit tabKeyPressed on desktop', () => {
        const tabPressedSpy = jest.fn();
        const subscription = component.tabKeyPressed$.subscribe(tabPressedSpy);

        const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        component.keyDownHandler(event);

        expect(event.defaultPrevented).toBe(true);
        expect(tabPressedSpy).toHaveBeenCalledTimes(1);

        subscription.unsubscribe();
    });

    it('should prevent Tab and emit tabKeyPressed on mobile', () => {
        const tabPressedSpy = jest.fn();
        const subscription = component.tabKeyPressed$.subscribe(tabPressedSpy);

        component.mobile = true;

        const event = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
        component.keyDownHandler(event);

        expect(event.defaultPrevented).toBe(true);
        expect(tabPressedSpy).toHaveBeenCalledTimes(1);

        subscription.unsubscribe();
    });
});
