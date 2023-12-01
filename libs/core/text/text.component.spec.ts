import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { TextComponent } from './text.component';
import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { patchLanguage } from '@fundamental-ngx/i18n';

const moreLabel = 'label more'.toLowerCase();
const lessLabel = 'label less'.toLowerCase();

describe('TextComponent', () => {
    let component: TextComponent;
    let fixture: ComponentFixture<TextComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [TextComponent],
            schemas: [NO_ERRORS_SCHEMA]
        })
            .overrideComponent(TextComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                    providers: [patchLanguage({ coreText: { moreLabel, lessLabel } })]
                }
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have expected text', () => {
        const text = 'Sample test text';
        component.text = text;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('span[fdkLineClampTarget]').innerHTML).toBe(text);
    });

    it('should enable whitespaces', () => {
        component.whitespaces = true;
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.fd-text').classList).toContain('fd-text--pre-wrap');
    });

    it('should enable hyphenation', () => {
        component.hyphenation = 'auto';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.fd-text').style.hyphens).toEqual('auto');
    });

    it('should disable hyphenation', () => {
        component.hyphenation = 'none';
        fixture.detectChanges();

        expect(fixture.nativeElement.querySelector('.fd-text').style.hyphens).toEqual('none');
    });

    it('should enable line-clamps', () => {
        const maxLines = 3;
        const target = fixture.nativeElement.querySelector('.fd-text__lineclamp');

        component.maxLines = maxLines;
        fixture.detectChanges();

        expect(target).toBeTruthy();
        expect(Number(target.style['-webkit-line-clamp'])).toEqual(maxLines);
    });

    it(`should set labels for more and less buttons`, fakeAsync(() => {
        component.maxLines = 1;
        component.expandable = true;
        component._hasMore = true;

        fixture.detectChanges();
        tick();

        const button = fixture.nativeElement.querySelector('.fd-text__link--more .fd-link__content');

        expect(button.innerHTML.toLowerCase().trim()).toEqual(moreLabel);

        component.isCollapsed = false;
        fixture.detectChanges();
        tick();

        expect(button.innerHTML.toLowerCase().trim()).toEqual(lessLabel);
    }));

    it('should have ability to toggle text view', () => {
        component.expandable = true;
        component._hasMore = true;
        fixture.detectChanges();
        component.toggleTextView();
        expect(component.isCollapsed).toBe(false);
        component.toggleTextView();
        expect(component.isCollapsed).toBe(true);
    });
});
