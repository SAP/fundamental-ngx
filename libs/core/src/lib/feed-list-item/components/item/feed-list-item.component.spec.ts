import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedListItemComponent } from './feed-list-item.component';
import { PipeModule } from '@fundamental-ngx/cdk/utils';
import { LinkModule } from '@fundamental-ngx/core/link';
import { FD_LANGUAGE, FD_LANGUAGE_ENGLISH, I18nModule } from '@fundamental-ngx/i18n';
import { of } from 'rxjs';

const componentClassPrefix = 'fd-feed-list__item';

const moreLabel = 'more button text'.toLowerCase();
const lessLabel = 'less button text'.toLowerCase();

describe('FeedListItemComponent', () => {
    let component: FeedListItemComponent;
    let fixture: ComponentFixture<FeedListItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [FeedListItemComponent],
            imports: [PipeModule, LinkModule, I18nModule],
            providers: [
                {
                    provide: FD_LANGUAGE,
                    useValue: of({
                        ...FD_LANGUAGE_ENGLISH,
                        coreFeedListItem: { ...FD_LANGUAGE_ENGLISH.coreFeedListItem, moreLabel, lessLabel }
                    })
                }
            ]
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
        const authorLink = 'https://example.com';
        component.authorTitle = authorTitle;
        component.authorLink = authorLink;
        fixture.detectChanges();
        expect(
            component.elementRef.nativeElement.querySelector('.fd-feed-list__name a > .fd-link__content').innerHTML
        ).toContain(authorTitle);
        expect(component.elementRef.nativeElement.querySelector('.fd-feed-list__name a').getAttribute('href')).toEqual(
            authorLink
        );
    });

    it('should render author title as sample text', () => {
        component.authorTitle = 'John Doe';
        component.authorLink = null;
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.querySelector('.fd-feed-list__name a')).toBeNull();
    });

    it('should render only formatted text', () => {
        component.isRichText = true;
        component.buildComponentCssClass();
        fixture.detectChanges();
        expect(component.elementRef.nativeElement.classList.contains(`${componentClassPrefix}--collapsible`)).toBe(
            false
        );
        expect(component.elementRef.nativeElement.querySelector('.fd-feed-list__link--more')).toBeFalsy();
    });

    it(`should label's more and less buttons`, async () => {
        component.isCollapsed = true;
        component.isRichText = false;
        component.hasMore = true;
        fixture.detectChanges();
        await fixture.whenStable();
        let text = component.elementRef.nativeElement
            .querySelector('.fd-feed-list__link--more > .fd-link__content')
            .innerHTML.toLowerCase();
        expect(text).toEqual(moreLabel);
        component.isCollapsed = false;
        fixture.detectChanges();
        await fixture.whenStable();
        text = component.elementRef.nativeElement
            .querySelector('.fd-feed-list__link--more > .fd-link__content')
            .innerHTML.toLowerCase();
        expect(text).toEqual(lessLabel.toLowerCase());
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
