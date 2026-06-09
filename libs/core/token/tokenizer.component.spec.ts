import { Component, ContentChildren, QueryList, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControlComponent } from '@fundamental-ngx/core/form';

import { DEFAULT_CONTENT_DENSITY, RtlService } from '@fundamental-ngx/cdk/utils';
import { ContentDensityModule } from '@fundamental-ngx/core/content-density';
import { whenStable } from '@fundamental-ngx/core/tests';
import { TokenizerInputDirective } from './token-input.directive';
import { TokenComponent } from './token.component';
import { TokenizerComponent } from './tokenizer.component';

@Component({
    selector: 'fd-tokenizer-test-component',
    template: `
        <fd-tokenizer [fdCompact]="compact" [externalHiddenCount]="externalHiddenCount">
            <fd-token>Token 1</fd-token>
            <fd-token>Token 2</fd-token>
            <fd-token>Token 3</fd-token>
            <input fd-tokenizer-input fd-form-control />
        </fd-tokenizer>
    `,
    standalone: true,
    imports: [TokenComponent, TokenizerComponent, TokenizerInputDirective, FormControlComponent, ContentDensityModule]
})
class HostComponent {
    @ViewChild(TokenizerComponent) tokenizer: TokenizerComponent;
    @ViewChild(FormControlComponent) formControl: FormControlComponent;

    @ContentChildren(TokenComponent, { read: TokenComponent })
    tokenList: QueryList<TokenComponent>;

    compact: boolean | undefined = undefined;
    externalHiddenCount = 0;
}

describe('TokenizerComponent', () => {
    let component: TokenizerComponent;
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [HostComponent],
            providers: [RtlService]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(HostComponent);
        await whenStable(fixture);

        component = fixture.componentInstance.tokenizer;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(component._tokenizerHasFocus).toBeFalsy();
    });

    it('should handle content density when compact input is not provided', () => {
        jest.spyOn(component, 'buildComponentCssClass');
        component.ngOnInit();
        expect(component._contentDensityObserver.isCompact).toBe(DEFAULT_CONTENT_DENSITY !== 'cozy');
        expect(component.buildComponentCssClass).toHaveBeenCalled();
    });

    it('should addEventListener to input during ngAfterViewInit and handle keydown', async () => {
        jest.spyOn(component, 'handleKeyDown');
        await whenStable(fixture);
        component.ngAfterViewInit();

        await whenStable(fixture);

        component.input.nativeElement.focus();
        const event = new KeyboardEvent('keydown', {
            key: 'ArrowLeft'
        });
        component.input.nativeElement.dispatchEvent(event);

        await whenStable(fixture);

        expect(component.handleKeyDown).toHaveBeenCalledWith(event, component.tokenList.length);
    });

    it('should handleKeyDown on ArrowLeft when last token is focused', () => {
        jest.spyOn(component.input.nativeElement, 'focus');
        jest.spyOn(component, 'focusTokenElement');
        const event = new KeyboardEvent('keydown', {
            key: 'ArrowLeft'
        });
        component.handleKeyDown(event, component.tokenList.length - 1);

        expect(component.input.nativeElement.focus).not.toHaveBeenCalled();
        expect(component.focusTokenElement).toHaveBeenCalledWith(component.tokenList.length - 2);
    });

    it('should handleKeyDown on ArrowRight when last token is focused', () => {
        jest.spyOn(component.input.nativeElement, 'focus');
        jest.spyOn(component, 'focusTokenElement');
        const event = new KeyboardEvent('keydown', {
            key: 'ArrowRight'
        });
        component.handleKeyDown(event, component.tokenList.length - 1);

        expect(component.input.nativeElement.focus).toHaveBeenCalled();
        expect(component.focusTokenElement).not.toHaveBeenCalled();
    });

    it('should handleKeyDown on ArrowRight when second to last token is focused', () => {
        jest.spyOn(component, 'focusTokenElement');
        const event = new KeyboardEvent('keydown', {
            key: 'ArrowRight'
        });
        component.handleKeyDown(event, component.tokenList.length - 2);

        expect(component.focusTokenElement).toHaveBeenCalledWith(component.tokenList.length - 1);
    });

    it('should select using control or command', () => {
        const event = new MouseEvent('click', {
            ctrlKey: true
        });
        component.ngAfterViewInit();
        (component.tokenList.first.elementRef.nativeElement.querySelector('.fd-token') as HTMLElement).dispatchEvent(
            event
        );
        (component.tokenList.last.elementRef.nativeElement.querySelector('.fd-token') as HTMLElement).dispatchEvent(
            event
        );

        expect(component.tokenList.first.selected()).toBeTruthy();
        expect(component.tokenList.last.selected()).toBeTruthy();
    });

    it('should deselect using control or command', () => {
        component.ngAfterViewInit();
        const event = new MouseEvent('click', {
            ctrlKey: true
        });
        (component.tokenList.first.elementRef.nativeElement.querySelector('.fd-token') as HTMLElement).dispatchEvent(
            event
        );
        (component.tokenList.last.elementRef.nativeElement.querySelector('.fd-token') as HTMLElement).dispatchEvent(
            event
        );
        (component.tokenList.last.elementRef.nativeElement.querySelector('.fd-token') as HTMLElement).dispatchEvent(
            event
        );

        expect(component.tokenList.first.selected()).toBeTruthy();
        expect(component.tokenList.last.selected()).toBeFalsy();
    });

    it('should select using shift', () => {
        component.ngAfterViewInit();
        const event = new MouseEvent('click', {
            ctrlKey: false,
            shiftKey: true
        });
        (component.tokenList.first.elementRef.nativeElement.querySelector('.fd-token') as HTMLElement).dispatchEvent(
            event
        );

        expect(component.tokenList.first.selected()).toBeTruthy();
    });

    it('should focus a token element', async () => {
        component.tokenList.forEach((token) =>
            jest.spyOn(token.elementRef.nativeElement.querySelector('.fd-token'), 'focus')
        );
        jest.spyOn(component, 'handleKeyDown');

        component.focusTokenElement(1);

        await whenStable(fixture);
        await fixture.whenRenderingDone();

        const elementToCheck = component.tokenList
            .filter((element, index) => index === 1)[0]
            .elementRef.nativeElement.querySelector('.fd-token');
        expect(elementToCheck.focus).toHaveBeenCalled();
    });

    it('should handle resize - getting smaller', () => {
        fixture.componentInstance.compact = true;
        fixture.detectChanges();
        jest.spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').mockReturnValue({ width: 1 });
        jest.spyOn(component, 'getCombinedTokenWidth').mockReturnValue(2);
        component.previousElementWidth = 2;
        component.onResize();
        component.moreTokensLeft.length = 0;
        component.onResize();

        component.tokenList.forEach((token) => {
            expect(token.elementRef.nativeElement.style.display).toBe('none');
        });
        expect(component.moreTokensLeft.length).toBe(3);
        expect(component.previousElementWidth).toBe(1);
    });

    it('should handle resize - getting bigger', () => {
        fixture.componentInstance.compact = true;
        fixture.detectChanges();
        // need to collapse the tokens before running expand
        jest.spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').mockReturnValue({ width: 1 });
        jest.spyOn(component, 'getCombinedTokenWidth').mockReturnValue(2);
        component.onResize();
        component.elementRef.nativeElement.getBoundingClientRect.mockReturnValue({ width: 3 });
        component.previousElementWidth = 1;
        component.onResize();

        expect(component.previousElementWidth).toBe(3);
        component.tokenList.forEach((token) => {
            expect(token.elementRef.nativeElement.style.display).toBe('inline-block');
        });
    });

    it('should handle resize - getting bigger', () => {
        fixture.componentInstance.compact = true;
        fixture.detectChanges();
        // need to collapse the tokens before running expand
        jest.spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').mockReturnValue({ width: 1 });
        jest.spyOn(component, 'getCombinedTokenWidth').mockReturnValue(2);
        component.onResize();
        component.elementRef.nativeElement.getBoundingClientRect.mockReturnValue({ width: 3 });
        component.previousElementWidth = 1;
        component.onResize();

        expect(component.previousElementWidth).toBe(3);
        component.tokenList.forEach((token) => {
            expect(token.elementRef.nativeElement.style.display).toBe('inline-block');
        });
        expect(component.moreTokensLeft.length).toBe(0);
    });

    it('should get the combined token width', () => {
        component.tokenList.forEach((token) => {
            jest.spyOn(token.tokenWrapperElement()!.nativeElement, 'getBoundingClientRect').mockReturnValue({
                width: 1
            });
        });
        jest.spyOn(component.input.nativeElement, 'getBoundingClientRect').mockReturnValue({ width: 1 } as DOMRect);
    });

    it('should handle resize', () => {
        jest.spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').mockReturnValue({ width: 1 });

        component.onResize();

        expect(component.previousElementWidth).toBe(1);
    });

    it('should get the hidden cozy token count AfterViewChecked', async () => {
        fixture.componentInstance.compact = false;

        jest.spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').mockReturnValue({ left: 1 });
        component.tokenList.forEach((token) => {
            jest.spyOn(token.tokenWrapperElement()!.nativeElement, 'getBoundingClientRect').mockReturnValue({
                right: 0
            });
        });
        jest.spyOn(component.tokenizerInnerEl.nativeElement, 'scrollWidth', 'get').mockReturnValue(5);

        component.ngAfterViewInit();

        await whenStable(fixture);

        expect(component.hiddenCozyTokenCount).toBe(3);
    });

    describe('externalHiddenCount input', () => {
        it('adds externalHiddenCount to the "+N more" label in compact mode', async () => {
            fixture.componentInstance.compact = true;
            fixture.detectChanges();

            // Force width-collapse to hide 2 tokens
            jest.spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').mockReturnValue({
                width: 1
            } as DOMRect);
            jest.spyOn(component, 'getCombinedTokenWidth').mockReturnValue(100);
            component.onResize();
            fixture.detectChanges();
            await whenStable(fixture);

            // Set externalHiddenCount = 100
            fixture.componentInstance.externalHiddenCount = 100;
            fixture.detectChanges();
            await whenStable(fixture);

            const labelElement = fixture.nativeElement.querySelector('.fd-tokenizer-more');
            expect(labelElement).toBeTruthy();
            const labelText = labelElement?.textContent?.trim();
            // Expected: 2 width-hidden + 100 external = 102
            expect(labelText).toContain('102');
        });

        it('adds externalHiddenCount to the "+N more" label in cozy mode', async () => {
            fixture.componentInstance.compact = false;
            fixture.detectChanges();

            // Force hiddenCozyTokenCount = 3
            jest.spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').mockReturnValue({
                left: 10
            } as DOMRect);
            component.tokenList.forEach((token, index) => {
                jest.spyOn(token.tokenWrapperElement()!.nativeElement, 'getBoundingClientRect').mockReturnValue({
                    right: index < 0 ? 5 : 15 // all tokens have right > containerLeft, so hiddenCozyTokenCount = 3
                } as DOMRect);
            });
            jest.spyOn(component.tokenizerInnerEl.nativeElement, 'scrollWidth', 'get').mockReturnValue(50);
            jest.spyOn(component.tokenizerInnerEl.nativeElement, 'clientWidth', 'get').mockReturnValue(10);

            component.ngAfterViewInit();
            await whenStable(fixture);

            // Set externalHiddenCount = 50
            fixture.componentInstance.externalHiddenCount = 50;
            fixture.detectChanges();
            await whenStable(fixture);

            const labelElement = fixture.nativeElement.querySelector('.fd-tokenizer-more');
            expect(labelElement).toBeTruthy();
            const labelText = labelElement?.textContent?.trim();
            // Expected: 3 hiddenCozyTokenCount + 50 external = 53
            expect(labelText).toContain('53');
        });

        it('renders "+N more" indicator when externalHiddenCount > 0 even with no width-hidden tokens', async () => {
            fixture.componentInstance.compact = true;
            fixture.detectChanges();

            // Wide viewport - no tokens width-hidden
            jest.spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').mockReturnValue({
                width: 1000
            } as DOMRect);
            jest.spyOn(component, 'getCombinedTokenWidth').mockReturnValue(100);
            component.onResize();
            fixture.detectChanges();
            await whenStable(fixture);

            // Set externalHiddenCount = 988
            fixture.componentInstance.externalHiddenCount = 988;
            fixture.detectChanges();
            await whenStable(fixture);

            const indicator = fixture.nativeElement.querySelector('.fd-tokenizer-more');
            expect(indicator).not.toBeNull();
            const labelText = indicator?.textContent?.trim();
            expect(labelText).toContain('988');
        });

        it('does NOT render "+N more" indicator when externalHiddenCount === 0 and no width-hidden tokens', async () => {
            fixture.componentInstance.compact = true;
            fixture.detectChanges();

            // Wide viewport - no width-collapse
            jest.spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').mockReturnValue({
                width: 1000
            } as DOMRect);
            jest.spyOn(component, 'getCombinedTokenWidth').mockReturnValue(100);
            component.onResize();
            fixture.detectChanges();
            await whenStable(fixture);

            // externalHiddenCount defaults to 0
            const indicator = fixture.nativeElement.querySelector('.fd-tokenizer-more');
            expect(indicator).toBeNull();
        });

        it('does NOT open internal popover when externalHiddenCount > 0 (compact mode)', async () => {
            component.compactCollapse = true;
            component.showOverflowPopover = true;
            fixture.detectChanges();

            // Force width-collapse
            jest.spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').mockReturnValue({
                width: 1
            } as DOMRect);
            jest.spyOn(component, 'getCombinedTokenWidth').mockReturnValue(100);
            component.onResize();
            fixture.detectChanges();
            await whenStable(fixture);

            // Set externalHiddenCount = 100
            fixture.componentInstance.externalHiddenCount = 100;
            fixture.detectChanges();
            await whenStable(fixture);

            const indicator = fixture.nativeElement.querySelector('.fd-tokenizer-more');
            expect(indicator).not.toBeNull();

            // Click the indicator
            indicator?.click();
            fixture.detectChanges();
            await whenStable(fixture);

            // Popover should NOT open
            const popoverBody = document.querySelector('fd-popover-body');
            expect(popoverBody).toBeNull();
        });

        it('emits moreClickedEvent when externalHiddenCount > 0 and indicator is clicked', async () => {
            component.compactCollapse = true;
            component.showOverflowPopover = true;
            fixture.detectChanges();

            // Force width-collapse
            jest.spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').mockReturnValue({
                width: 1
            } as DOMRect);
            jest.spyOn(component, 'getCombinedTokenWidth').mockReturnValue(100);
            component.onResize();
            fixture.detectChanges();
            await whenStable(fixture);

            // Set externalHiddenCount = 100
            fixture.componentInstance.externalHiddenCount = 100;
            fixture.detectChanges();
            await whenStable(fixture);

            let emitted = false;
            component.moreClickedEvent.subscribe(() => {
                emitted = true;
            });

            const indicator = fixture.nativeElement.querySelector('.fd-tokenizer-more');
            indicator?.click();
            fixture.detectChanges();

            expect(emitted).toBe(true);
        });

        it('STILL opens internal popover when externalHiddenCount === 0 (default-preserving)', async () => {
            component.compactCollapse = true;
            component.showOverflowPopover = true;
            fixture.detectChanges();

            // Force width-collapse
            jest.spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').mockReturnValue({
                width: 1
            } as DOMRect);
            jest.spyOn(component, 'getCombinedTokenWidth').mockReturnValue(100);
            component.onResize();
            fixture.detectChanges();
            await whenStable(fixture);

            // externalHiddenCount defaults to 0 - no setInput call
            const indicator = fixture.nativeElement.querySelector('.fd-tokenizer-more');
            indicator?.click();
            fixture.detectChanges();
            await whenStable(fixture);

            // Popover SHOULD open
            const popoverBody = document.querySelector('fd-popover-body');
            expect(popoverBody).not.toBeNull();
        });

        it('clears _showMoreElement when externalHiddenCount flips back to 0 (no width-collapse)', async () => {
            fixture.componentInstance.compact = true;
            fixture.detectChanges();

            // Wide viewport — no width-hidden tokens
            jest.spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').mockReturnValue({
                width: 1000
            } as DOMRect);
            jest.spyOn(component, 'getCombinedTokenWidth').mockReturnValue(100);
            component.onResize();
            fixture.detectChanges();
            await whenStable(fixture);

            // Set externalHiddenCount = 988 — _showMoreElement flips to true
            fixture.componentInstance.externalHiddenCount = 988;
            fixture.detectChanges();
            await whenStable(fixture);
            expect(component._showMoreElement()).toBe(true);

            // Flip back to 0 — _showMoreElement MUST flip back to false (currently stays stuck)
            fixture.componentInstance.externalHiddenCount = 0;
            fixture.detectChanges();
            await whenStable(fixture);
            expect(component._showMoreElement()).toBe(false);
        });
    });
});
