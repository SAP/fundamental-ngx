import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';

import { CardModule } from '@fundamental-ngx/core/card';
import { IconModule } from '@fundamental-ngx/core/icon';

import { ResizableCardItemComponent } from './resizable-card-item.component';

@Component({
    template: `
        <fd-resizable-card-item [config]="config"> 1 </fd-resizable-card-item>
        <fd-resizable-card-item [cardWidthColSpan]="2" [cardHeightRowSpan]="19" [left]="400" [top]="0">
            2
        </fd-resizable-card-item>
    `
})
class TestResizableCardItemComponent {
    config = {
        title: 'card1',
        rank: 1,
        cardWidthColSpan: 1,
        cardHeightRowSpan: 25,
        cardMiniHeaderRowSpan: 5,
        cardMiniContentRowSpan: 10,
        resizable: true
    };

    @ViewChildren(ResizableCardItemComponent)
    items: QueryList<ResizableCardItemComponent>;
}

describe('ResizableCardItemComponent', () => {
    let component: TestResizableCardItemComponent;
    let fixture: ComponentFixture<TestResizableCardItemComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ResizableCardItemComponent, TestResizableCardItemComponent],
            imports: [CommonModule, CardModule, IconModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestResizableCardItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should increase width in step of 20 rem and height in step of 1rem', () => {
        const mouseEvent1 = new MouseEvent('changeWidth', { clientX: 100, clientY: 20 });
        const card = component.items.toArray()[0];

        card.onMouseDown(mouseEvent1, 'both');
        const mouseEvent2 = new MouseEvent('changeWidth', { clientX: 200, clientY: 40 });
        card.onMouseMove(mouseEvent2);
        card.onMouseUp();

        fixture.detectChanges();

        expect(card.cardWidth).toEqual(320);
        expect(card.cardHeight).toEqual(416);
    });

    it('should decrease width in step of 20 rem and height in step of 1rem', () => {
        const mouseEvent1 = new MouseEvent('changeWidth', { clientX: 200, clientY: 40 });
        const card = component.items.toArray()[1];

        card.onMouseDown(mouseEvent1, 'both');
        const mouseEvent2 = new MouseEvent('changeWidth', { clientX: 100, clientY: 20 });
        card.onMouseMove(mouseEvent2);
        card.onMouseUp();

        fixture.detectChanges();

        expect(card.cardWidth).toEqual(656);
        expect(card.cardHeight).toEqual(288);
    });

    it('should emit resized event when resizing is completed', () => {
        const mouseEvent1 = new MouseEvent('resize', { clientX: 200, clientY: 40 });
        const card = component.items.toArray()[1];
        const cardResized = jest.spyOn(card.resized, 'emit');

        card.onMouseDown(mouseEvent1, 'both');
        const mouseEvent2 = new MouseEvent('resize', { clientX: 100, clientY: 20 });
        card.onMouseMove(mouseEvent2);
        card.onMouseUp();

        fixture.detectChanges();
        expect(cardResized).toHaveBeenCalled();
    });

    it('should revert back the resize when width resize offset is not reached', () => {
        const mouseEvent1 = new MouseEvent('resize', { clientX: 200, clientY: 40 });
        const card = component.items.toArray()[1];

        card.onMouseDown(mouseEvent1, 'both');
        const mouseEvent2 = new MouseEvent('resize', { clientX: 210, clientY: 40 });
        card.onMouseMove(mouseEvent2);
        card.onMouseUp();

        fixture.detectChanges();

        expect(card.cardWidth).toEqual(656);
        expect(card.cardHeight).toEqual(304);
    });

    it('should revert back the resize when height resize offset is not reached', () => {
        const mouseEvent1 = new MouseEvent('resize', { clientX: 200, clientY: 40 });
        const card = component.items.toArray()[1];

        card.onMouseDown(mouseEvent1, 'both');
        const mouseEvent2 = new MouseEvent('resize', { clientX: 200, clientY: 45 });
        card.onMouseMove(mouseEvent2);
        card.onMouseUp();

        fixture.detectChanges();

        expect(card.cardWidth).toEqual(656);
        expect(card.cardHeight).toEqual(304);
    });

    it('should adjust max card width 320 for sm layout size', () => {
        const card = component.items.toArray()[1];
        card.cardWidthColSpan = 6; // four column width card

        const layoutSize = 'sm';
        card.verifyUpdateCardWidth(layoutSize);
        fixture.detectChanges();

        expect(card.cardWidth).toEqual(320);
    });

    it('should adjust max card width 656 for md layout size', () => {
        const card = component.items.toArray()[1];
        card.cardWidthColSpan = 6;

        const layoutSize = 'md';
        card.verifyUpdateCardWidth(layoutSize);
        fixture.detectChanges();

        expect(card.cardWidth).toEqual(656);
    });

    it('should adjust max card width 992 for lg layout size', () => {
        const card = component.items.toArray()[1];
        card.cardWidthColSpan = 6;

        const layoutSize = 'lg';
        card.verifyUpdateCardWidth(layoutSize);
        fixture.detectChanges();

        expect(card.cardWidth).toEqual(992);
    });

    it('should adjust max card width 1328 for xl layout size', () => {
        const card = component.items.toArray()[1];
        card.cardWidthColSpan = 6;

        const layoutSize = 'xl';
        card.verifyUpdateCardWidth(layoutSize);
        fixture.detectChanges();

        expect(card.cardWidth).toEqual(1328);
    });
});
