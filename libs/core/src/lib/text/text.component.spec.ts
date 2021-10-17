import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextComponent } from './text.component';
import { ChangeDetectionStrategy } from '@angular/core';
import { LineClampModule, PipeModule } from '../utils/public_api';

describe('TextComponent', () => {
    let component: TextComponent;
    let fixture: ComponentFixture<TextComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TextComponent],
            imports: [PipeModule, LineClampModule]
        })
            .overrideComponent(TextComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
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

        expect(fixture.nativeElement.querySelector('span[fd-lineclamp-target]').innerText).toBe(text);
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
        expect(Number(target.style.webkitLineClamp)).toEqual(maxLines);
    });

    it(`should set labels for more and less buttons`, async () => {
        const moreLabel = 'label more'.toLowerCase();
        const lessLabel = 'label less'.toLowerCase();

        component.maxLines = 1;
        component.expandable = true;
        component._hasMore = true;

        component.moreLabel = moreLabel;
        component.lessLabel = lessLabel;
        fixture.detectChanges();
        await fixture.whenStable();

        const button = fixture.nativeElement.querySelector('.fd-text__link--more');

        expect(button.innerText.toLowerCase()).toEqual(moreLabel);

        component.isCollapsed = false;
        fixture.detectChanges();
        await fixture.whenStable();

        expect(button.innerText.toLowerCase()).toEqual(lessLabel);
    });

    it('should have ability to toggle text view', () => {
        component.expandable = true;
        component._hasMore = true;
        fixture.detectChanges();
        component.toggleTextView();
        expect(component.isCollapsed).toBeFalse();
        component.toggleTextView();
        expect(component.isCollapsed).toBeTrue();
    });
});
