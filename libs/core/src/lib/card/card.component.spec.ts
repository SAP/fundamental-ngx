import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardModule } from './card.module';
import { CardComponent } from './card.component';
import { By } from '@angular/platform-browser';
import { CardType } from './constants';

@Component({
    template: `
        <fd-card [badge]="badgeText" [isLoading]="isLoading" [compact]="isCompact" [cardType]="cardType">
            <fd-card-header>
                <fd-card-title>{{ titleText }}</fd-card-title>
            </fd-card-header>
            <fd-card-content>{{ contentText }}</fd-card-content>
            <fd-card-footer>{{ footerText }}</fd-card-footer>

            <fd-card-loader>{{ loaderText }}</fd-card-loader>
        </fd-card>
    `
})
class CardHostCardComponentTestComponent {
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
    let fixture: ComponentFixture<CardHostCardComponentTestComponent>;
    let host: CardHostCardComponentTestComponent;
    let card: CardComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [CardModule],
            declarations: [CardComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardHostCardComponentTestComponent);
        host = fixture.componentInstance;
        card = host.card;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    describe('badge option', () => {
        it('should has banding', () => {
            expect(card.badge).toBe(host.badgeText);
        });

        it('should render it in view', () => {
            const badgeEl: HTMLElement = fixture.debugElement.query(By.css('[fd-badge]')).nativeElement;
            expect(badgeEl?.innerText).toBe(host.badgeText);
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
        it('should has banding', () => {
            expect(card.isLoading).toBe(host.isLoading);
        });

        it('should render loader template if isLoading = true', () => {
            host.isLoading = true;

            fixture.detectChanges();

            const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardComponent)).nativeElement;

            expect(cardEl.textContent.includes(host.loaderText)).toBeTruthy();
            expect(cardEl.textContent.includes(host.titleText)).not.toBeTruthy();
            expect(cardEl.textContent.includes(host.contentText)).not.toBeTruthy();
            expect(cardEl.textContent.includes(host.footerText)).not.toBeTruthy();
        });

        it('should not render other content if isLoading = true', () => {
            host.isLoading = true;

            fixture.detectChanges();

            const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardComponent)).nativeElement;

            expect(cardEl.textContent.includes(host.loaderText)).toBeTruthy();
            expect(cardEl.textContent.includes(host.titleText)).not.toBeTruthy();
            expect(cardEl.textContent.includes(host.contentText)).not.toBeTruthy();
            expect(cardEl.textContent.includes(host.footerText)).not.toBeTruthy();
        });
    });

    describe('compact', () => {
        it('should has banding', () => {
            expect(card.compact).toBe(host.isCompact);
        });

        it('should apply corresponding className', () => {
            //
        });
    });
});
