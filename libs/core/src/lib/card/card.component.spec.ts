import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { CardModule } from './card.module';
import { CardComponent } from './card.component';
import { CardType, CLASS_NAME } from './constants';
import { getCardModifierClassNameByCardType } from './utils';

@Component({
    template: `
        <fd-card [badge]="badgeText" [isLoading]="isLoading" [compact]="isCompact" [cardType]="cardType">
            <fd-card-header>
                <h2 fd-card-title>{{ titleText }}</h2>
            </fd-card-header>
            <fd-card-content>{{ contentText }}</fd-card-content>
            <fd-card-footer>{{ footerText }}</fd-card-footer>

            <fd-card-loader>{{ loaderText }}</fd-card-loader>
        </fd-card>
    `
})
class CardHostTestComponent {
    @ViewChild(CardComponent) card: CardComponent;

    badgeText = 'New';
    titleText = 'Card Title';
    contentText = 'Card Content';
    footerText = 'Card Footer';
    loaderText = 'Loading...';

    isLoading = false;
    isCompact = false;
    cardType: CardType = 'standard';
}
describe('CardComponent', () => {
    let fixture: ComponentFixture<CardHostTestComponent>;
    let host: CardHostTestComponent;
    let card: CardComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CommonModule, CardModule],
            declarations: [CardHostTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardHostTestComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
        card = host.card;
    });

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should add card className to host', () => {
        const cardDebugEl = fixture.debugElement.query(By.directive(CardComponent));
        expect(cardDebugEl.classes[CLASS_NAME.card]).toBeTrue();
    });

    describe('badge option', () => {
        it('should has binding', () => {
            expect(card.badge).toBe(host.badgeText);
        });

        it('should render it in view', () => {
            const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardComponent)).nativeElement;
            expect(cardEl.textContent.includes(host.badgeText)).toBeTruthy();
        });
    });

    it('should render title', () => {
        const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardComponent)).nativeElement;
        expect(cardEl.textContent.includes(host.titleText)).toBeTruthy();
    });

    it('should render content', () => {
        const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardComponent)).nativeElement;
        expect(cardEl.textContent.includes(host.contentText)).toBeTruthy();
    });

    it('should render footer', () => {
        const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardComponent)).nativeElement;
        expect(cardEl.textContent.includes(host.footerText)).toBeTruthy();
    });

    describe('loader', () => {
        it('should has binding', () => {
            expect(card.isLoading).toBe(host.isLoading);
        });

        it('should render only loader template if isLoading = true', () => {
            host.isLoading = true;

            fixture.detectChanges();

            const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardComponent)).nativeElement;

            expect(cardEl.textContent).toEqual(host.loaderText);
        });
    });

    describe('compact', () => {
        it('should has binding', () => {
            expect(card.compact).toBe(host.isCompact);
        });

        it('should apply corresponding className', () => {
            host.isCompact = true;

            fixture.detectChanges();

            const cardDebugEl = fixture.debugElement.query(By.directive(CardComponent));

            expect(cardDebugEl.classes[CLASS_NAME.cardCompact]).toBeTrue();
        });
    });

    describe('cardType', () => {
        it('should has binding', () => {
            expect(card.cardType).toBe(host.cardType);
        });

        it('should apply corresponding className and remove previous', () => {
            const cardDebugEl = fixture.debugElement.query(By.directive(CardComponent));

            const prevCardType = card.cardType;
            const prevCardTypeModifier = getCardModifierClassNameByCardType(prevCardType);
            expect(cardDebugEl.classes[prevCardTypeModifier]).toBeTrue();

            host.cardType = 'analytical';
            const analyticalModifier = getCardModifierClassNameByCardType('analytical');
            fixture.detectChanges();
            expect(cardDebugEl.classes[analyticalModifier]).toBeTrue();
            expect(cardDebugEl.classes[prevCardTypeModifier]).not.toBeTrue();
        });
    });
});
