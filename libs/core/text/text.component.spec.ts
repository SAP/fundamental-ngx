import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { ChangeDetectionStrategy, NO_ERRORS_SCHEMA } from '@angular/core';
import { patchLanguage } from '@fundamental-ngx/i18n';
import { TextComponent } from './text.component';

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

    describe('Text rendering', () => {
        it('should render provided text content', () => {
            const text = 'Sample test text';
            fixture.componentRef.setInput('text', text);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('span[fdkLineClampTarget]').innerHTML).toBe(text);
        });

        it('should apply whitespace preservation when enabled', () => {
            fixture.componentRef.setInput('whitespaces', true);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.fd-text').classList).toContain('fd-text--pre-wrap');
        });

        it('should not apply whitespace class when disabled', () => {
            fixture.componentRef.setInput('whitespaces', false);
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.fd-text').classList).not.toContain('fd-text--pre-wrap');
        });
    });

    describe('Hyphenation', () => {
        it('should apply hyphenation style', () => {
            fixture.componentRef.setInput('hyphenation', 'auto');
            fixture.detectChanges();

            expect(fixture.nativeElement.querySelector('.fd-text').style.hyphens).toEqual('auto');
        });
    });

    describe('Line clamping', () => {
        it('should apply line clamp with maxLines', () => {
            const maxLines = 3;
            const target = fixture.nativeElement.querySelector('.fd-text__lineclamp');

            fixture.componentRef.setInput('maxLines', maxLines);
            fixture.detectChanges();

            expect(target).toBeTruthy();
            expect(Number(target.style['-webkit-line-clamp'])).toEqual(maxLines);
        });

        it('should set _hasMore when line count exceeds maxLines', () => {
            fixture.componentRef.setInput('maxLines', 3);
            component['checkLineCount'](5);

            expect(component['_hasMore']()).toBe(true);
        });

        it('should not set _hasMore when line count is within maxLines', () => {
            fixture.componentRef.setInput('maxLines', 5);
            component['checkLineCount'](3);

            expect(component['_hasMore']()).toBe(false);
        });

        it('should not set _hasMore when maxLines is null', () => {
            fixture.componentRef.setInput('maxLines', null);
            component['checkLineCount'](10);

            expect(component['_hasMore']()).toBe(false);
        });
    });

    describe('Computed signals', () => {
        it('should compute _isCollapsed as true when collapsed with valid maxLines', () => {
            fixture.componentRef.setInput('isCollapsed', true);
            fixture.componentRef.setInput('maxLines', 3);

            expect(component['_isCollapsed']()).toBe(true);
        });

        it('should compute _isCollapsed as false when not collapsed', () => {
            fixture.componentRef.setInput('isCollapsed', false);
            fixture.componentRef.setInput('maxLines', 3);

            expect(component['_isCollapsed']()).toBe(false);
        });

        it('should compute _isCollapsed as false when maxLines is null', () => {
            fixture.componentRef.setInput('isCollapsed', true);
            fixture.componentRef.setInput('maxLines', null);

            expect(component['_isCollapsed']()).toBe(false);
        });

        it('should compute _expandable as true when expandable with valid maxLines', () => {
            fixture.componentRef.setInput('expandable', true);
            fixture.componentRef.setInput('maxLines', 3);

            expect(component['_expandable']()).toBe(true);
        });

        it('should compute _expandable as false when not expandable', () => {
            fixture.componentRef.setInput('expandable', false);
            fixture.componentRef.setInput('maxLines', 3);

            expect(component['_expandable']()).toBe(false);
        });

        it('should compute _expandable as false when maxLines is null', () => {
            fixture.componentRef.setInput('expandable', true);
            fixture.componentRef.setInput('maxLines', null);

            expect(component['_expandable']()).toBe(false);
        });
    });

    describe('Expandable functionality', () => {
        it('should toggle between more and less labels when expanding/collapsing', fakeAsync(() => {
            fixture.componentRef.setInput('maxLines', 1);
            fixture.componentRef.setInput('expandable', true);
            component['_hasMore'].set(true);

            fixture.detectChanges();
            tick();

            const button = fixture.nativeElement.querySelector('.fd-text__link--more .fd-link__content');

            expect(button.innerHTML.toLowerCase().trim()).toEqual(moreLabel);

            fixture.componentRef.setInput('isCollapsed', false);
            fixture.detectChanges();
            tick();

            expect(button.innerHTML.toLowerCase().trim()).toEqual(lessLabel);
        }));

        it('should toggle isCollapsed model signal when toggleTextView is called', () => {
            fixture.componentRef.setInput('expandable', true);
            component['_hasMore'].set(true);
            fixture.detectChanges();

            expect(component.isCollapsed()).toBe(true);

            component['toggleTextView']();
            expect(component.isCollapsed()).toBe(false);

            component['toggleTextView']();
            expect(component.isCollapsed()).toBe(true);
        });

        it('should not show more/less link when expandable is false', () => {
            fixture.componentRef.setInput('maxLines', 1);
            fixture.componentRef.setInput('expandable', false);
            component['_hasMore'].set(true);
            fixture.detectChanges();

            const button = fixture.nativeElement.querySelector('.fd-text__link--more');
            expect(button).toBeFalsy();
        });

        it('should not show more/less link when _hasMore is false', () => {
            fixture.componentRef.setInput('maxLines', 1);
            fixture.componentRef.setInput('expandable', true);
            component['_hasMore'].set(false);
            fixture.detectChanges();

            const button = fixture.nativeElement.querySelector('.fd-text__link--more');
            expect(button).toBeFalsy();
        });
    });
});
