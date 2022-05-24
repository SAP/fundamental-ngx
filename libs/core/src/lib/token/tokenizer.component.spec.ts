import { Component, ContentChildren, QueryList, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormControlComponent } from '@fundamental-ngx/core/form';

import { whenStable } from '@fundamental-ngx/core/tests';
import { TokenComponent, TokenizerComponent, TokenModule } from '@fundamental-ngx/core/token';
import { ContentDensityService, DEFAULT_CONTENT_DENSITY, RtlService } from '@fundamental-ngx/core/utils';

@Component({
    selector: 'fd-tokenizer-test-component',
    template: `
        <fd-tokenizer [compact]="compact">
            <fd-token>Token 1</fd-token>
            <fd-token>Token 2</fd-token>
            <fd-token>Token 3</fd-token>
            <input fd-tokenizer-input fd-form-control />
        </fd-tokenizer>
    `
})
class HostComponent {
    compact: boolean | undefined = undefined;

    @ViewChild(TokenizerComponent) tokenizer: TokenizerComponent;
    @ViewChild(FormControlComponent) formControl: FormControlComponent;

    @ContentChildren(TokenComponent, { read: TokenComponent })
    tokenList: QueryList<TokenComponent>;
}

describe('TokenizerComponent', () => {
    let component: TokenizerComponent;
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                imports: [TokenModule],
                declarations: [HostComponent, FormControlComponent],
                providers: [RtlService, ContentDensityService]
            }).compileComponents();
        })
    );

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
        spyOn(component, 'buildComponentCssClass');
        component.ngOnInit();
        expect(component.compact).toBe(DEFAULT_CONTENT_DENSITY !== 'cozy');
        expect(component.buildComponentCssClass).toHaveBeenCalled();
    });

    it('should addEventListener to input during ngAfterViewChecked and handle keydown', async () => {
        spyOn(component, 'handleKeyDown');
        component.ngAfterViewChecked();

        await whenStable(fixture);

        component.input.elementRef().nativeElement.focus();
        const event = new KeyboardEvent('keydown', {
            key: 'ArrowLeft'
        });
        component.input.elementRef().nativeElement.dispatchEvent(event);

        await whenStable(fixture);

        expect(component.handleKeyDown).toHaveBeenCalledWith(event, component.tokenList.length);
    });

    it('should handleKeyDown on ArrowLeft when last token is focused', () => {
        spyOn(component.input.elementRef().nativeElement, 'focus');
        spyOn(component, 'focusTokenElement');
        const event = new KeyboardEvent('keydown', {
            key: 'ArrowLeft'
        });
        component.handleKeyDown(event, component.tokenList.length - 1);

        expect(component.input.elementRef().nativeElement.focus).not.toHaveBeenCalled();
        expect(component.focusTokenElement).toHaveBeenCalledWith(component.tokenList.length - 2);
    });

    it('should handleKeyDown on ArrowRight when last token is focused', () => {
        spyOn(component.input.elementRef().nativeElement, 'focus');
        spyOn(component, 'focusTokenElement');
        const event = new KeyboardEvent('keydown', {
            key: 'ArrowRight'
        });
        component.handleKeyDown(event, component.tokenList.length - 1);

        expect(component.input.elementRef().nativeElement.focus).toHaveBeenCalled();
        expect(component.focusTokenElement).not.toHaveBeenCalled();
    });

    it('should handleKeyDown on ArrowRight when second to last token is focused', () => {
        spyOn(component, 'focusTokenElement');
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
        component.ngAfterViewChecked();
        (component.tokenList.first.elementRef.nativeElement.querySelector('.fd-token') as HTMLElement).dispatchEvent(
            event
        );
        (component.tokenList.last.elementRef.nativeElement.querySelector('.fd-token') as HTMLElement).dispatchEvent(
            event
        );

        expect(component.tokenList.first.selected).toBeTruthy();
        expect(component.tokenList.last.selected).toBeTruthy();
    });

    it('should deselect using control or command', () => {
        component.ngAfterViewChecked();
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

        expect(component.tokenList.first.selected).toBeTruthy();
        expect(component.tokenList.last.selected).toBeFalsy();
    });

    it('should select using shift', () => {
        component.ngAfterViewChecked();
        const event = new MouseEvent('click', {
            ctrlKey: false,
            shiftKey: true
        });
        (component.tokenList.first.elementRef.nativeElement.querySelector('.fd-token') as HTMLElement).dispatchEvent(
            event
        );

        expect(component.tokenList.first.selected).toBeTruthy();
    });

    it('should focus a token element', async () => {
        component.tokenList.forEach((token) =>
            spyOn(token.elementRef.nativeElement.querySelector('.fd-token'), 'focus')
        );
        component.tokenList.forEach((token) =>
            spyOn(token.elementRef.nativeElement.querySelector('.fd-token'), 'setAttribute')
        );
        spyOn(component, 'addKeyboardListener');
        spyOn(component, 'handleKeyDown');

        component.focusTokenElement(1);

        await whenStable(fixture);
        await fixture.whenRenderingDone();

        const elementToCheck = component.tokenList
            .filter((element, index) => index === 1)[0]
            .elementRef.nativeElement.querySelector('.fd-token');
        expect(elementToCheck.focus).toHaveBeenCalled();
        expect(elementToCheck.setAttribute).toHaveBeenCalledWith('tabindex', '0');
        expect(component.addKeyboardListener).toHaveBeenCalledWith(elementToCheck, 1);
    });

    it('should add keyboard listener', async () => {
        spyOn(component, 'handleKeyDown');
        const mockElement = document.createElement('span');
        spyOn(mockElement, 'addEventListener').and.callThrough();
        spyOn(mockElement, 'setAttribute');
        spyOn(mockElement, 'removeEventListener');
        const event = new KeyboardEvent('blur');
        component.addKeyboardListener(mockElement, 0);
        mockElement.dispatchEvent(event);

        await whenStable(fixture);

        expect(mockElement.addEventListener).toHaveBeenCalled();
        expect(mockElement.setAttribute).toHaveBeenCalled();
        expect(mockElement.removeEventListener).toHaveBeenCalled();
    });

    it('should handle resize - getting smaller', () => {
        component.compact = true;
        spyOn(component.elementRef().nativeElement, 'getBoundingClientRect').and.returnValue({ width: 1 });
        spyOn(component, 'getCombinedTokenWidth').and.returnValue(2);
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
        component.compact = true;
        // need to collapse the tokens before running expand
        spyOn(component.elementRef().nativeElement, 'getBoundingClientRect').and.returnValue({ width: 1 });
        spyOn(component, 'getCombinedTokenWidth').and.returnValue(2);
        component.onResize();
        component.elementRef().nativeElement.getBoundingClientRect.and.returnValue({ width: 3 });
        component.previousElementWidth = 1;
        component.onResize();

        expect(component.previousElementWidth).toBe(3);
        component.tokenList.forEach((token) => {
            expect(token.elementRef.nativeElement.style.display).toBe('inline-block');
        });
    });

    it('should handle resize - getting bigger', () => {
        component.compact = true;
        // need to collapse the tokens before running expand
        spyOn(component.elementRef().nativeElement, 'getBoundingClientRect').and.returnValue({ width: 1 });
        spyOn(component, 'getCombinedTokenWidth').and.returnValue(2);
        component.onResize();
        component.elementRef().nativeElement.getBoundingClientRect.and.returnValue({ width: 3 });
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
            spyOn(token.tokenWrapperElement.nativeElement, 'getBoundingClientRect').and.returnValue({ width: 1 });
        });
        spyOn(component.input.elementRef().nativeElement, 'getBoundingClientRect').and.returnValue({ width: 1 });
    });

    it('should handle ngAfterContentInit', () => {
        spyOn(component.elementRef().nativeElement, 'getBoundingClientRect').and.returnValue({ width: 1 });
        spyOn(component, 'onResize');

        component.ngAfterContentInit();

        expect(component.previousElementWidth).toBe(1);
        expect(component.onResize).toHaveBeenCalled();
    });

    it('should get the hidden cozy token count AfterViewChecked', async () => {
        fixture.componentInstance.compact = false;

        spyOn(component.elementRef().nativeElement, 'getBoundingClientRect').and.returnValue({ left: 1 });
        component.tokenList.forEach((token) => {
            spyOn(token.tokenWrapperElement.nativeElement, 'getBoundingClientRect').and.returnValue({ right: 0 });
        });
        spyOnProperty(component.tokenizerInnerEl.nativeElement, 'scrollWidth').and.returnValue(5);

        component.ngAfterViewChecked();

        await whenStable(fixture);

        expect(component.hiddenCozyTokenCount).toBe(3);
    });
});
