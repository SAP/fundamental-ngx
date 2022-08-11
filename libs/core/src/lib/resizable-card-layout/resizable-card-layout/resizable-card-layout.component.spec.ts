import { Component, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CommonModule } from '@angular/common';

import { CardModule } from '@fundamental-ngx/core/card';
import { ListModule } from '@fundamental-ngx/core/list';
import { IconModule } from '@fundamental-ngx/core/icon';
import { whenStable } from '@fundamental-ngx/core/tests';

import { ResizableCardLayoutComponent } from './resizable-card-layout.component';
import { ResizableCardItemComponent } from './resizable-card-item/resizable-card-item.component';
@Component({
    template: `
        <fd-resizable-card-layout>
            <fd-resizable-card-item
                title="card1"
                [rank]="1"
                [cardWidthColSpan]="1"
                [cardHeightRowSpan]="25"
                [cardMiniHeaderRowSpan]="5"
                [cardMiniContentRowSpan]="10"
            >
                <fd-card>
                    <fd-card-header>
                        <h2 fd-card-title>Card Title 1</h2>
                    </fd-card-header>
                    <fd-card-content>
                        <ul fd-list [noBorder]="true">
                            <li fd-list-item>
                                <span fd-list-title> item 1 </span>
                            </li>
                        </ul>
                    </fd-card-content>
                </fd-card>
            </fd-resizable-card-item>

            <fd-resizable-card-item
                title="card2"
                [rank]="2"
                [cardWidthColSpan]="1"
                [cardHeightRowSpan]="19"
                [cardMiniHeaderRowSpan]="5"
                [cardMiniContentRowSpan]="7"
            >
                <fd-card>
                    <fd-card-header>
                        <h2 fd-card-title>Card Title 2</h2>
                    </fd-card-header>
                    <fd-card-content>
                        <ul fd-list [noBorder]="true">
                            <li fd-list-item>
                                <span fd-list-title> item 1 </span>
                            </li>
                        </ul>
                    </fd-card-content>
                </fd-card>
            </fd-resizable-card-item>

            <fd-resizable-card-item
                title="card3"
                [rank]="3"
                [cardWidthColSpan]="2"
                [cardHeightRowSpan]="14"
                [cardMiniHeaderRowSpan]="5"
                [cardMiniContentRowSpan]="7"
            >
                <fd-card>
                    <fd-card-header>
                        <h2 fd-card-title>Card Title 3</h2>
                    </fd-card-header>
                    <fd-card-content>
                        <ul fd-list [noBorder]="true">
                            <li fd-list-item>
                                <span fd-list-title> item 1 </span>
                            </li>
                        </ul>
                    </fd-card-content>
                </fd-card>
            </fd-resizable-card-item>

            <fd-resizable-card-item
                title="card4"
                [rank]="4"
                [cardWidthColSpan]="1"
                [cardHeightRowSpan]="14"
                [cardMiniHeaderRowSpan]="5"
                [cardMiniContentRowSpan]="7"
            >
                <fd-card>
                    <fd-card-header>
                        <h2 fd-card-title>Card Title 4</h2>
                    </fd-card-header>
                    <fd-card-content>
                        <ul fd-list [noBorder]="true">
                            <li fd-list-item>
                                <span fd-list-title> item 1 </span>
                            </li>
                        </ul>
                    </fd-card-content>
                </fd-card>
            </fd-resizable-card-item>
        </fd-resizable-card-layout>
    `
})
class TestResizableCardLayoutComponent {
    @ViewChild(ResizableCardLayoutComponent)
    resizableCardLayout: ResizableCardLayoutComponent;

    @ViewChildren(ResizableCardItemComponent)
    cards: QueryList<ResizableCardItemComponent>;
}

describe('ResizableCardLayoutComponent', () => {
    let component: TestResizableCardLayoutComponent;
    let fixture: ComponentFixture<TestResizableCardLayoutComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [ResizableCardLayoutComponent, ResizableCardItemComponent, TestResizableCardLayoutComponent],
            imports: [CommonModule, CardModule, ListModule, IconModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestResizableCardLayoutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be placed in layout', () => {
        whenStable(fixture);

        spyOn(component.resizableCardLayout, 'getWidthAvailable').and.returnValue(1200);

        component.resizableCardLayout.onResize();
        whenStable(fixture);

        // for lg screen
        const cards = component.cards.toArray();

        expect(cards[0].cardWidth).toEqual(320);
        expect(cards[0].cardHeight).toEqual(400);
        expect(cards[0].cardWidthColSpan).toEqual(1);
        expect(cards[0].cardHeightRowSpan).toEqual(25);
        expect(cards[0].left).toEqual(16);
        expect(cards[0].top).toEqual(0);

        expect(cards[1].cardWidth).toEqual(320);
        expect(cards[1].cardHeight).toEqual(304);
        expect(cards[1].cardWidthColSpan).toEqual(1);
        expect(cards[1].cardHeightRowSpan).toEqual(19);
        expect(cards[1].left).toEqual(352);
        expect(cards[1].top).toEqual(0);

        expect(cards[2].cardWidth).toEqual(656);
        expect(cards[2].cardHeight).toEqual(224);
        expect(cards[2].cardWidthColSpan).toEqual(2);
        expect(cards[2].cardHeightRowSpan).toEqual(14);
        expect(cards[2].left).toEqual(352);
        expect(cards[2].top).toEqual(320);

        expect(cards[3].cardWidth).toEqual(320);
        expect(cards[3].cardHeight).toEqual(224);
        expect(cards[3].cardWidthColSpan).toEqual(1);
        expect(cards[3].cardHeightRowSpan).toEqual(14);
        expect(cards[3].left).toEqual(16);
        expect(cards[3].top).toEqual(416);
    });

    it('should layout cards again on changing width of any card 1', () => {
        // for lg screen
        whenStable(fixture);

        spyOn(component.resizableCardLayout, 'getWidthAvailable').and.returnValue(1200);

        component.resizableCardLayout.onResize();
        whenStable(fixture);

        const mouseEvent1 = new MouseEvent('changeWidth', { clientX: 7, clientY: 20 });
        const card = component.cards.toArray()[0];

        // increasing width
        card.onMouseDown(mouseEvent1, 'horizontal');
        const mouseEvent2 = new MouseEvent('changeWidth', { clientX: 200, clientY: 20 });
        card.onMouseMove(mouseEvent2);
        card.onMouseUp();

        fixture.detectChanges();

        expect(card.cardWidthColSpan).toEqual(2);
        expect(card.cardHeightRowSpan).toEqual(25);

        const cards = component.cards.toArray();
        expect(cards[0].left).toEqual(16);
        expect(cards[0].top).toEqual(0);

        expect(cards[1].left).toEqual(688);
        expect(cards[1].top).toEqual(0);

        expect(cards[2].left).toEqual(16);
        expect(cards[2].top).toEqual(416);

        expect(cards[3].left).toEqual(688);
        expect(cards[3].top).toEqual(320);
    });

    it('should layout cards again on changing width of any card 2', () => {
        // for lg screen
        whenStable(fixture);

        spyOn(component.resizableCardLayout, 'getWidthAvailable').and.returnValue(1200);

        component.resizableCardLayout.onResize();
        whenStable(fixture);

        const mouseEvent1 = new MouseEvent('changeWidth', { clientX: 7, clientY: 20 });
        const card = component.cards.toArray()[1];

        // increase width
        card.onMouseDown(mouseEvent1, 'horizontal');
        const mouseEvent2 = new MouseEvent('changeWidth', { clientX: 440, clientY: 20 });
        card.onMouseMove(mouseEvent2);
        card.onMouseUp();

        fixture.detectChanges();

        expect(card.cardWidthColSpan).toEqual(2);
        expect(card.cardHeightRowSpan).toEqual(19);

        const cards = component.cards.toArray();
        expect(cards[0].left).toEqual(16);
        expect(cards[0].top).toEqual(0);

        expect(cards[1].left).toEqual(352);
        expect(cards[1].top).toEqual(0);

        expect(cards[2].left).toEqual(16);
        expect(cards[2].top).toEqual(560);

        expect(cards[3].left).toEqual(352);
        expect(cards[3].top).toEqual(320);

        // decrease width

        const mouseEvent3 = new MouseEvent('changeWidth', { clientX: 7, clientY: 20 });
        const card2 = component.cards.toArray()[1];

        // decrease width
        card2.onMouseDown(mouseEvent3, 'horizontal');
        const mouseEvent4 = new MouseEvent('changeWidth', { clientX: 5, clientY: 20 });
        card2.onMouseMove(mouseEvent4);
        card2.onMouseUp();

        fixture.detectChanges();
        expect(card.cardWidthColSpan).toEqual(2);
        expect(card.cardHeightRowSpan).toEqual(19);

        // layout should also change
        expect(cards[0].left).toEqual(16);
        expect(cards[0].top).toEqual(0);

        expect(cards[1].left).toEqual(352);
        expect(cards[1].top).toEqual(0);

        expect(cards[2].left).toEqual(16);
        expect(cards[2].top).toEqual(560);

        expect(cards[3].left).toEqual(352);
        expect(cards[3].top).toEqual(320);
    });

    it('should layout cards again on changing height of any card', () => {
        // for lg screen
        whenStable(fixture);

        spyOn(component.resizableCardLayout, 'getWidthAvailable').and.returnValue(1200);

        component.resizableCardLayout.onResize();
        whenStable(fixture);

        const mouseEvent1 = new MouseEvent('changeWidth', { clientX: 7, clientY: 20 });
        const card = component.cards.toArray()[1];

        card.onMouseDown(mouseEvent1, 'vertical');
        const mouseEvent2 = new MouseEvent('changeWidth', { clientX: 7, clientY: 90 });
        card.onMouseMove(mouseEvent2);
        card.onMouseUp();

        fixture.detectChanges();

        expect(card.cardWidthColSpan).toEqual(1);
        expect(card.cardHeightRowSpan).toEqual(23); // from 19 row to 23 row height
        expect(card.cardWidth).toEqual(320);
        expect(card.cardHeight).toEqual(368);

        const cards = component.cards.toArray();
        expect(cards[0].left).toEqual(16);
        expect(cards[0].top).toEqual(0);

        expect(cards[1].left).toEqual(352);
        expect(cards[1].top).toEqual(0);

        expect(cards[2].left).toEqual(352);
        expect(cards[2].top).toEqual(384);

        expect(cards[3].left).toEqual(16);
        expect(cards[3].top).toEqual(416);
    });

    it('should layout cards again on changing width and height of any card', () => {
        // for lg screen
        whenStable(fixture);

        spyOn(component.resizableCardLayout, 'getWidthAvailable').and.returnValue(1200);

        component.resizableCardLayout.onResize();
        whenStable(fixture);

        const mouseEvent1 = new MouseEvent('changeWidth', { clientX: 7, clientY: 20 });
        const card = component.cards.toArray()[1];

        card.onMouseDown(mouseEvent1, 'both');
        const mouseEvent2 = new MouseEvent('changeWidth', { clientX: 440, clientY: 90 });
        card.onMouseMove(mouseEvent2);
        card.onMouseUp();

        fixture.detectChanges();

        expect(card.cardWidthColSpan).toEqual(2);
        expect(card.cardHeightRowSpan).toEqual(23);

        const cards = component.cards.toArray();
        expect(cards[0].left).toEqual(16);
        expect(cards[0].top).toEqual(0);

        expect(cards[1].left).toEqual(352);
        expect(cards[1].top).toEqual(0);

        expect(cards[2].left).toEqual(16);
        expect(cards[2].top).toEqual(624);

        expect(cards[3].left).toEqual(352);
        expect(cards[3].top).toEqual(384);
    });

    it('should not increase width of card more than the layout width capacity', () => {
        // for lg screen
        whenStable(fixture);

        spyOn(component.resizableCardLayout, 'getWidthAvailable').and.returnValue(1200);

        component.resizableCardLayout.onResize();
        whenStable(fixture);

        const mouseEvent1 = new MouseEvent('changeWidth', { clientX: 7, clientY: 20 });
        const card = component.cards.toArray()[1];

        card.onMouseDown(mouseEvent1, 'both');
        const mouseEvent2 = new MouseEvent('changeWidth', { clientX: 440, clientY: 90 });
        card.onMouseMove(mouseEvent2);
        card.onMouseUp();

        fixture.detectChanges();

        expect(card.cardWidthColSpan).toEqual(2);
        expect(card.cardHeightRowSpan).toEqual(23);

        const cards = component.cards.toArray();
        expect(cards[0].left).toEqual(16);
        expect(cards[0].top).toEqual(0);

        expect(cards[1].left).toEqual(352);
        expect(cards[1].top).toEqual(0);

        expect(cards[2].left).toEqual(16);
        expect(cards[2].top).toEqual(624);

        expect(cards[3].left).toEqual(352);
        expect(cards[3].top).toEqual(384);

        // increase width of card 2 again
        const mouseEvent3 = new MouseEvent('changeWidth', { clientX: 7, clientY: 20 });
        const card2 = component.cards.toArray()[1];

        card2.onMouseDown(mouseEvent3, 'both');
        const mouseEvent4 = new MouseEvent('changeWidth', { clientX: 440, clientY: 30 });
        card2.onMouseMove(mouseEvent4);
        card2.onMouseUp();

        fixture.detectChanges();

        // only increment in height. width did not increase
        expect(card.cardWidthColSpan).toEqual(3);
        expect(card.cardHeightRowSpan).toEqual(24);
    });

    it('should not decrease width of card less than 1 column', () => {
        // for lg screen
        whenStable(fixture);

        spyOn(component.resizableCardLayout, 'getWidthAvailable').and.returnValue(1200);

        component.resizableCardLayout.onResize();
        whenStable(fixture);

        const mouseEvent1 = new MouseEvent('changeWidth', { clientX: 7, clientY: 20 });
        const card = component.cards.toArray()[0];

        const cards1 = component.cards.toArray();
        expect(cards1[0].left).toEqual(16);
        expect(cards1[0].top).toEqual(0);

        expect(cards1[1].left).toEqual(352);
        expect(cards1[1].top).toEqual(0);

        expect(cards1[2].left).toEqual(352);
        expect(cards1[2].top).toEqual(320);

        expect(cards1[3].left).toEqual(16);
        expect(cards1[3].top).toEqual(416);

        // decreasing width
        card.onMouseDown(mouseEvent1, 'horizontal');
        const mouseEvent2 = new MouseEvent('changeWidth', { clientX: 6, clientY: 20 });
        card.onMouseMove(mouseEvent2);
        card.onMouseUp();

        fixture.detectChanges();

        expect(card.cardWidthColSpan).toEqual(1);
        expect(card.cardHeightRowSpan).toEqual(25);

        // verify no change in layout
        const cards = component.cards.toArray();
        expect(cards[0].left).toEqual(16);
        expect(cards[0].top).toEqual(0);

        expect(cards[1].left).toEqual(352);
        expect(cards[1].top).toEqual(0);

        expect(cards[2].left).toEqual(352);
        expect(cards[2].top).toEqual(320);

        expect(cards[3].left).toEqual(16);
        expect(cards[3].top).toEqual(416);
    });
});
