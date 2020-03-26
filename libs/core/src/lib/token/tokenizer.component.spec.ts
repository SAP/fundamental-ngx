import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenizerComponent } from './tokenizer.component';
import { Component } from '@angular/core';
import { TokenComponent } from '@fundamental-ngx/core';
import { FormControlDirective } from '@fundamental-ngx/core';

async function whenStable(fixture) {
  fixture.detectChanges();
  await fixture.whenStable();
}

@Component({
  selector: 'fd-tokenizer-test-component',
  template: `
        <fd-tokenizer>
            <fd-token>Token 1</fd-token>
            <fd-token>Token 2</fd-token>
            <fd-token>Token 3</fd-token>
            <input fd-form-control>
        </fd-tokenizer>
    `
})
class TokenizerWrapperComponent { }

describe('TokenizerComponent', () => {
  let component: TokenizerComponent;
  let fixture: ComponentFixture<TokenizerWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TokenizerComponent, TokenComponent, TokenizerWrapperComponent, FormControlDirective]
    })
      .compileComponents();
  }));

  beforeEach(async () => {
    fixture = TestBed.createComponent(TokenizerWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    await whenStable(fixture);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.tokenizerHasFocus).toBeFalsy();
    expect(component.compact).toBeFalsy();
  });

  it('should addEventListener to input during ngAfterViewInit and handle keydown', async () => {
    spyOn(component, 'handleKeyDown');
    component.ngAfterViewInit();

    await whenStable(fixture);

    component.input.elementRef.nativeElement.focus();
    const event = new KeyboardEvent('keydown', {
      'code': 'ArrowLeft'
    });
    component.input.elementRef.nativeElement.dispatchEvent(event);

    await whenStable(fixture);

    expect(component.handleKeyDown).toHaveBeenCalledWith(event, component.tokenList.length);
  });

  it('should handleKeyDown on ArrowLeft when last token is focused', () => {
    spyOn(component.input.elementRef.nativeElement, 'focus');
    spyOn(component, 'focusTokenElement');
    const event = new KeyboardEvent('keydown', {
      'code': 'ArrowLeft'
    });
    component.handleKeyDown(event, component.tokenList.length - 1);

    expect(component.input.elementRef.nativeElement.focus).not.toHaveBeenCalled();
    expect(component.focusTokenElement).toHaveBeenCalledWith(event, component.tokenList.length - 2);
  });

  it('should handleKeyDown on ArrowRight when last token is focused', () => {
    spyOn(component.input.elementRef.nativeElement, 'focus');
    spyOn(component, 'focusTokenElement');
    const event = new KeyboardEvent('keydown', {
      'code': 'ArrowRight'
    });
    component.handleKeyDown(event, component.tokenList.length - 1);

    expect(component.input.elementRef.nativeElement.focus).toHaveBeenCalled();
    expect(component.focusTokenElement).not.toHaveBeenCalled();
  });

  it('should handleKeyDown on ArrowRight when second to last token is focused', () => {
    spyOn(component, 'focusTokenElement');
    const event = new KeyboardEvent('keydown', {
      'code': 'ArrowRight'
    });
    component.handleKeyDown(event, component.tokenList.length - 2);

    expect(component.focusTokenElement).toHaveBeenCalledWith(event, component.tokenList.length - 1);
  });

  it('should focus a token element', () => {
    component.tokenList.forEach(token => spyOn(token.elementRef.nativeElement.querySelector('.fd-token'), 'focus'));
    component.tokenList.forEach(token => spyOn(token.elementRef.nativeElement.querySelector('.fd-token'), 'setAttribute'));
    spyOn(component, 'addKeyboardListener');
    spyOn(component, 'handleKeyDown');
    const event = new KeyboardEvent('keydown', {
      'code': 'ArrowRight'
    });

    component.focusTokenElement(event, 1);

    const elementToCheck = component.tokenList.filter((element, index) =>
      index === 1)[0].elementRef.nativeElement.querySelector('.fd-token');
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
    spyOn(component, 'collapseTokens');
    spyOn(component, 'expandTokens');
    spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').and.returnValue({width: 1});
    component.previousElementWidth = 2;
    component.onResize();

    expect(component.collapseTokens).toHaveBeenCalled();
    expect(component.expandTokens).not.toHaveBeenCalled();
    expect(component.previousElementWidth).toBe(1);
  });

  it('should handle resize - getting bigger', () => {
    spyOn(component, 'collapseTokens');
    spyOn(component, 'expandTokens');
    spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').and.returnValue({width: 2});
    component.previousElementWidth = 1;
    component.onResize();

    expect(component.collapseTokens).not.toHaveBeenCalled();
    expect(component.expandTokens).toHaveBeenCalled();
    expect(component.previousElementWidth).toBe(2);
  });

  it('should collapse the tokens', () => {
    component.compact = true;
    spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').and.returnValue({width: 1});
    spyOn(component, 'getCombinedTokenWidth').and.returnValue(2);
    component.moreTokensLeft.length = 0;
    component.collapseTokens();

    component.tokenList.forEach(token => {
      expect(token.elementRef.nativeElement.style.display).toBe('none');
    });
    expect(component.moreTokensLeft.length).toBe(3);
  });

  it('should expand the tokens', () => {
      component.compact = true;
      // need to collapse the tokens before running expand
      spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').and.returnValue({width: 1});
      spyOn(component, 'getCombinedTokenWidth').and.returnValue(2);
      component.collapseTokens();

      component.elementRef.nativeElement.getBoundingClientRect.and.returnValue({width: 3});

      component.expandTokens();

      component.tokenList.forEach(token => {
          expect(token.elementRef.nativeElement.style.display).toBe('inline-block');
      });
      expect(component.moreTokensLeft.length).toBe(0);
  });

  it('should get the combined token width', () => {
    component.tokenList.forEach(token => {
      spyOn(token.elementRef.nativeElement, 'getBoundingClientRect').and.returnValue({width: 1})
    });
    spyOn(component.input.elementRef.nativeElement, 'getBoundingClientRect').and.returnValue({width: 1});

    const retVal = component.getCombinedTokenWidth();

    expect(retVal).toBe(4);
  });

  it('should handle ngAfterContentInit', () => {
    spyOn(component.elementRef.nativeElement, 'getBoundingClientRect').and.returnValue({width: 1});
    spyOn(component, 'onResize');

    component.ngAfterContentInit();

    expect(component.previousElementWidth).toBe(1);
    expect(component.onResize).toHaveBeenCalled();
  });
});
