import { Component, signal, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FD_LANGUAGE_ENGLISH, FD_LANGUAGE_SIGNAL } from '@fundamental-ngx/i18n';

import { CardComponent } from './card.component';
import { CardModule } from './card.module';
import { CardType, CLASS_NAME } from './constants';
import { CardContentComponent } from './content/card-content.component';
import { CardTitleDirective } from './header-elements/card-title.directive';

@Component({
    template: `
        <fd-card [cardType]="cardType" [interactive]="interactive" [role]="role" [ariaDescription]="ariaDescription">
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

    titleText = 'Card Title';
    contentText = 'Card Content';
    loaderText = 'Loading...';

    cardType: CardType = 'standard';
    interactive = false;
    role = 'region';
    ariaDescription: string | null | undefined;
}

describe('CardComponent', () => {
    let fixture: ComponentFixture<CardHostTestComponent>;
    let host: CardHostTestComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CardHostTestComponent],
            providers: [{ provide: FD_LANGUAGE_SIGNAL, useValue: signal(FD_LANGUAGE_ENGLISH) }]
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
        const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardComponent)).nativeElement;
        expect(cardEl.classList).toContain(CLASS_NAME.card);
    });

    it('should add card type modifier class', () => {
        const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardComponent)).nativeElement;
        expect(cardEl.classList).toContain('fd-card--standard');
    });

    it('should update card type modifier class when cardType changes', () => {
        host.cardType = 'list';
        fixture.detectChanges();
        const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardComponent)).nativeElement;
        expect(cardEl.classList).toContain('fd-card--list');
        expect(cardEl.classList).not.toContain('fd-card--standard');
    });

    it('should add interactive modifier class when interactive is true', () => {
        host.interactive = true;
        fixture.detectChanges();
        const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardComponent)).nativeElement;
        expect(cardEl.classList).toContain('fd-card--interactive');
    });

    it('should not add interactive modifier class by default', () => {
        const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardComponent)).nativeElement;
        expect(cardEl.classList).not.toContain('fd-card--interactive');
    });

    it('should render title', () => {
        const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardTitleDirective)).nativeElement;
        expect(cardEl.textContent?.includes(host.titleText)).toBeTruthy();
    });

    it('should render content', () => {
        const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardContentComponent)).nativeElement;
        expect(cardEl.textContent?.includes(host.contentText)).toBeTruthy();
    });

    it('should render translated role description with card type', () => {
        const srSpans = fixture.debugElement.queryAll(By.css('.fd-card__sr-only'));
        const roleDescSpan = srSpans.find((el) => el.nativeElement.textContent.includes('Card'));
        expect(roleDescSpan).toBeTruthy();
        expect(roleDescSpan!.nativeElement.textContent).toContain('standard Card');
    });

    it('should use translated default aria description', () => {
        host.role = 'listitem';
        fixture.detectChanges();
        const srSpans = fixture.debugElement.queryAll(By.css('.fd-card__sr-only'));
        const descSpan = srSpans.find((el) => el.nativeElement.textContent.includes('Press Enter'));
        expect(descSpan).toBeTruthy();
        expect(descSpan!.nativeElement.textContent).toContain('Active, Press Enter to activate');
    });

    it('should use custom ariaDescription when provided', () => {
        host.role = 'listitem';
        host.ariaDescription = 'Custom description';
        fixture.detectChanges();
        const srSpans = fixture.debugElement.queryAll(By.css('.fd-card__sr-only'));
        const descSpan = srSpans.find((el) => el.nativeElement.textContent.includes('Custom description'));
        expect(descSpan).toBeTruthy();
    });
});
