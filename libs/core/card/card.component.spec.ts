import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CardComponent } from './card.component';
import { CardModule } from './card.module';
import { CardType } from './constants';
import { CardContentComponent } from './content/card-content.component';
import { CardTitleDirective } from './header-elements/card-title.directive';

import { CLASS_NAME } from './constants';

@Component({
    template: `
        <fd-card>
            <fd-card-header>
                <h2 fd-card-title>{{ titleText }}</h2>
            </fd-card-header>
            <fd-card-content>{{ contentText }}</fd-card-content>

            <fd-card-loader>{{ loaderText }}</fd-card-loader>
        </fd-card>
    `,
    standalone: true,
    imports: [CardModule]
})
class CardHostTestComponent {
    @ViewChild(CardComponent) card: CardComponent;

    badgeText = 'New';
    titleText = 'Card Title';
    contentText = 'Card Content';
    footerText = 'Card Footer';
    loaderText = 'Loading...';

    isLoading = false;
    isCompact: boolean | undefined = undefined;
    cardType: CardType = 'standard';
}

describe('CardComponent', () => {
    let fixture: ComponentFixture<CardHostTestComponent>;
    let host: CardHostTestComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CardHostTestComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CardHostTestComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should add card className to host', () => {
        const cardDebugEl = fixture.debugElement.query(By.directive(CardComponent));
        expect(cardDebugEl.nativeElement.className.includes(CLASS_NAME.card)).toBe(true);
    });

    it('should render title', () => {
        const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardTitleDirective)).nativeElement;
        expect(cardEl.textContent?.includes(host.titleText)).toBeTruthy();
    });

    it('should render content', () => {
        const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardContentComponent)).nativeElement;
        expect(cardEl.textContent?.includes(host.contentText)).toBeTruthy();
    });
});
