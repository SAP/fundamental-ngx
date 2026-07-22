import { Component, input, signal, ViewChild } from '@angular/core';
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
        <fd-card
            [cardType]="cardType()"
            [interactive]="interactive()"
            [role]="role()"
            [ariaDescription]="ariaDescription()"
            [badge]="badge()"
            [badgeIcon]="badgeIcon()"
            [secondBadge]="secondBadge()"
            [ariaDescribedby]="ariaDescribedby()"
            [ariaRoledescription]="ariaRoledescription()"
        >
            <fd-card-header>
                <h2 fd-card-title>{{ titleText() }}</h2>
                @if (showSubtitle()) {
                    <h3 fd-card-subtitle>{{ subtitleText() }}</h3>
                }
                @if (showSecondSubtitle()) {
                    <h4 fd-card-second-subtitle>{{ secondSubtitleText() }}</h4>
                }
                @if (showCounter()) {
                    <span fd-card-counter>{{ counterText() }}</span>
                }
            </fd-card-header>
            <fd-card-content>{{ contentText() }}</fd-card-content>
            <fd-card-loader>{{ loaderText() }}</fd-card-loader>
        </fd-card>
    `,
    imports: [CardModule]
})
class CardHostTestComponent {
    @ViewChild(CardComponent) card: CardComponent;

    readonly titleText = input('Card Title');
    readonly contentText = input('Card Content');
    readonly loaderText = input('Loading...');
    readonly subtitleText = input('Card Subtitle');
    readonly secondSubtitleText = input('Card Second Subtitle');
    readonly counterText = input('5');

    readonly cardType = input<CardType>('standard');
    readonly interactive = input(false);
    readonly role = input('region');
    readonly ariaDescription = input<string | null | undefined>(undefined);
    readonly ariaDescribedby = input<string | null | undefined>(undefined);
    readonly ariaRoledescription = input<string | null | undefined>(undefined);
    readonly badge = input<string | null | undefined>(undefined);
    readonly badgeIcon = input<string | null | undefined>(undefined);
    readonly secondBadge = input<string | null | undefined>(undefined);
    readonly showSubtitle = input(false);
    readonly showSecondSubtitle = input(false);
    readonly showCounter = input(false);
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
        fixture.componentRef.setInput('cardType', 'list');
        fixture.detectChanges();
        const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardComponent)).nativeElement;
        expect(cardEl.classList).toContain('fd-card--list');
        expect(cardEl.classList).not.toContain('fd-card--standard');
    });

    it('should add interactive modifier class when interactive is true', () => {
        fixture.componentRef.setInput('interactive', true);
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
        expect(cardEl.textContent?.includes(host.titleText())).toBeTruthy();
    });

    it('should render content', () => {
        const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardContentComponent)).nativeElement;
        expect(cardEl.textContent?.includes(host.contentText())).toBeTruthy();
    });

    it('should render translated role description with card type', () => {
        const srSpans = fixture.debugElement.queryAll(By.css('.fd-card__sr-only'));
        const roleDescSpan = srSpans.find((el) => el.nativeElement.textContent.includes('Card'));
        expect(roleDescSpan).toBeTruthy();
        expect(roleDescSpan!.nativeElement.textContent).toContain('standard Card');
    });

    it('should use translated default aria description', () => {
        fixture.componentRef.setInput('role', 'listitem');
        fixture.detectChanges();
        const srSpans = fixture.debugElement.queryAll(By.css('.fd-card__sr-only'));
        const descSpan = srSpans.find((el) => el.nativeElement.textContent.includes('Press Enter'));
        expect(descSpan).toBeTruthy();
        expect(descSpan!.nativeElement.textContent).toContain('Active, Press Enter to activate');
    });

    it('should use custom ariaDescription when provided', () => {
        fixture.componentRef.setInput('role', 'listitem');
        fixture.componentRef.setInput('ariaDescription', 'Custom description');
        fixture.detectChanges();
        const srSpans = fixture.debugElement.queryAll(By.css('.fd-card__sr-only'));
        const descSpan = srSpans.find((el) => el.nativeElement.textContent.includes('Custom description'));
        expect(descSpan).toBeTruthy();
    });

    it('should include badge IDs in aria-describedby when badges are present', () => {
        fixture.componentRef.setInput('badge', 'New');
        fixture.componentRef.setInput('secondBadge', 'Featured');
        fixture.detectChanges();
        const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardComponent)).nativeElement;
        const ariaDescribedby = cardEl.getAttribute('aria-describedby');
        expect(ariaDescribedby).toBeTruthy();
        expect(ariaDescribedby).toContain(`${host.card.id()}-badge`);
        expect(ariaDescribedby).toContain(`${host.card.id()}-second-badge`);
    });

    it('should include subtitle ID in aria-describedby when subtitle is present', () => {
        fixture.componentRef.setInput('showSubtitle', true);
        fixture.detectChanges();
        const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardComponent)).nativeElement;
        const ariaDescribedby = cardEl.getAttribute('aria-describedby');
        expect(ariaDescribedby).toBeTruthy();
        const subtitleId = host.card.cardSubtitle()?.id();
        expect(subtitleId).toBeTruthy();
        expect(ariaDescribedby).toContain(subtitleId!);
    });

    it('should include second subtitle ID in aria-describedby when second subtitle is present', () => {
        fixture.componentRef.setInput('showSecondSubtitle', true);
        fixture.detectChanges();
        const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardComponent)).nativeElement;
        const ariaDescribedby = cardEl.getAttribute('aria-describedby');
        expect(ariaDescribedby).toBeTruthy();
        const secondSubtitleId = host.card.cardSecondSubtitle()?.id();
        expect(secondSubtitleId).toBeTruthy();
        expect(ariaDescribedby).toContain(secondSubtitleId!);
    });

    it('should include counter ID in aria-describedby when counter is present', () => {
        fixture.componentRef.setInput('showCounter', true);
        fixture.detectChanges();
        const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardComponent)).nativeElement;
        const ariaDescribedby = cardEl.getAttribute('aria-describedby');
        expect(ariaDescribedby).toBeTruthy();
        const counterId = host.card.cardCounter()?.id();
        expect(counterId).toBeTruthy();
        expect(ariaDescribedby).toContain(counterId!);
    });

    it('should include additional ariaDescribedby input in aria-describedby attribute', () => {
        fixture.componentRef.setInput('ariaDescribedby', 'custom-id-1 custom-id-2');
        fixture.detectChanges();
        const cardEl: HTMLElement = fixture.debugElement.query(By.directive(CardComponent)).nativeElement;
        const ariaDescribedby = cardEl.getAttribute('aria-describedby');
        expect(ariaDescribedby).toBeTruthy();
        expect(ariaDescribedby).toContain('custom-id-1 custom-id-2');
    });

    it('should use translated role description with interpolated card type', () => {
        fixture.componentRef.setInput('cardType', 'analytical');
        fixture.detectChanges();
        const srSpans = fixture.debugElement.queryAll(By.css('.fd-card__sr-only'));
        const roleDescSpan = srSpans.find((el) => el.nativeElement.textContent.includes('Card'));
        expect(roleDescSpan).toBeTruthy();
        expect(roleDescSpan!.nativeElement.textContent).toContain('analytical Card');
    });

    it('should use custom ariaRoledescription when provided', () => {
        fixture.componentRef.setInput('ariaRoledescription', 'Custom Product Card');
        fixture.detectChanges();
        const srSpans = fixture.debugElement.queryAll(By.css('.fd-card__sr-only'));
        const roleDescSpan = srSpans.find((el) => el.nativeElement.textContent.includes('Custom Product Card'));
        expect(roleDescSpan).toBeTruthy();
        expect(roleDescSpan!.nativeElement.textContent).toContain('Custom Product Card');
    });
});
