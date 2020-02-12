import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenizerComponent } from './tokenizer.component';
import { Component } from '@angular/core';
import { TokenComponent } from '@fundamental-ngx/core';
import { FormControlDirective } from '@fundamental-ngx/core';

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
class TokenizerWrapperComponent {}

describe('TokenizerComponent', () => {
  let component: TokenizerComponent;
  let fixture: ComponentFixture<TokenizerWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TokenizerComponent, TokenComponent, TokenizerWrapperComponent, FormControlDirective ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenizerWrapperComponent);
    component = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.tokenizerHasFocus).toBeFalsy();
    expect(component.compact).toBeFalsy();
  });

  it('should addEventListener to input during ngAfterViewInit and handle keydown', () => {
    spyOn(component, 'handleKeyDown');
    component.ngAfterViewInit();
    component.input.elementRef.nativeElement.focus();
    const event = new KeyboardEvent('keydown', {
        'code': 'ArrowLeft'
    });
    component.input.elementRef.nativeElement.dispatchEvent(event);

    fixture.detectChanges();

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

  it('should add keyboard listener', () => {
    spyOn(component, 'handleKeyDown');
    const mockElement = document.createElement('span');
    spyOn(mockElement, 'addEventListener').and.callThrough();
    spyOn(mockElement, 'setAttribute');
    spyOn(mockElement, 'removeEventListener');
    const event = new KeyboardEvent('blur');
    component.addKeyboardListener(mockElement, 0);
    mockElement.dispatchEvent(event);
    fixture.detectChanges();
    expect(mockElement.addEventListener).toHaveBeenCalled();
    expect(mockElement.setAttribute).toHaveBeenCalled();
    expect(mockElement.removeEventListener).toHaveBeenCalled();
  });
});
