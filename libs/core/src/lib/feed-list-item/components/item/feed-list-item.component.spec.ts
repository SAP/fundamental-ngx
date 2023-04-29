import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedListItemComponent } from './feed-list-item.component';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { LinkModule } from '@fundamental-ngx/core/link';
import { I18nModule } from '@fundamental-ngx/i18n';

const componentClassPrefix = 'fd-feed-list__item';

@Component({
    selector: 'fd-formatted-text',
    template: ``
})
class FormattedTextTestComponent {
    @Input()
    htmlText = '';
}

describe('FeedListItemComponent', () => {
    let component: FeedListItemComponent;
    let fixture: ComponentFixture<FeedListItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FeedListItemComponent, FormattedTextTestComponent],
            imports: [PipeModule, LinkModule, I18nModule]
        })
            .overrideComponent(FeedListItemComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FeedListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render author title with link', () => {
        const authorTitle = 'John Doe';
        const authorLink = 'http://example.com';
        component.authorTitle = authorTitle;
        component.authorLink = authorLink;
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.querySelector('.fd-feed-list__name a').innerHTML).toContain(
            authorTitle
        );
        expect(
            component.elementRef().nativeElement.querySelector('.fd-feed-list__name a').getAttribute('href')
        ).toEqual(authorLink);
    });

    it('should render author title as sample text', () => {
        component.authorTitle = 'John Doe';
        component.authorLink = null;
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.querySelector('.fd-feed-list__name a')).toBeNull();
    });

    it('should render only formatted text', () => {
        component.isRichText = true;
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef().nativeElement.classList.contains(`${componentClassPrefix}--collapsible`)).toBe(
            false
        );
        expect(component.elementRef().nativeElement.querySelector('.fd-feed-list__link--more')).toBeFalsy();
    });

    it(`should label's more and less buttons`, async () => {
        const moreLabel = 'more button text'.toLowerCase();
        const lessLabel = 'less button text'.toLowerCase();

        component.isCollapsed = true;
        component.isRichText = false;
        component.hasMore = true;
        component.moreLabel = moreLabel;
        component.lessLabel = lessLabel;
        fixture.detectChanges();
        const linkContent = (): string =>
            component
                .elementRef()
                .nativeElement.querySelector('.fd-feed-list__link--more .fd-link__content')
                .innerHTML.toLowerCase()
                .trim();
        await fixture.whenStable();
        expect(linkContent()).toEqual(moreLabel);
        component.isCollapsed = false;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(linkContent()).toEqual(lessLabel.toLowerCase());
    });

    it('should have ability to toggle view', () => {
        component.isCollapsed = true;
        component.isRichText = false;
        component.hasMore = true;
        fixture.detectChanges();
        component.toggleTextView();
        expect(component.isCollapsed).toBe(false);
        component.toggleTextView();
        expect(component.isCollapsed).toBe(true);
    });
});
