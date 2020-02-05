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

  it('should handle inputKeyDown', () => {
    spyOn(component, 'handleTokenFocus');
    const event = {key: 'ArrowLeft'};
    component.inputKeyDown(event);
    expect(component.handleTokenFocus).toHaveBeenCalledWith(event, 3);
  });

  it('should handleTokenFocus left arrow from input', () => {
    component.tokenList.forEach(token => spyOn(token.elementRef.nativeElement.querySelector('.fd-token'), 'focus'));
    component.tokenList.forEach(token => spyOn(token.elementRef.nativeElement.querySelector('.fd-token'), 'setAttribute'));
    component.tokenList.forEach(token => spyOn(token.elementRef.nativeElement.querySelector('.fd-token'), 'addEventListener'));
    component.handleTokenFocus({code: 'ArrowLeft'}, component.tokenList.length);

    fixture.detectChanges();

    expect(component.tokenList.last.elementRef.nativeElement.querySelector('.fd-token').focus).toHaveBeenCalled();
    expect(component.tokenList.last.elementRef.nativeElement.querySelector('.fd-token').setAttribute).toHaveBeenCalledWith('tabindex', '0');
    expect(component.tokenList.first.elementRef.nativeElement.querySelector('.fd-token').focus).not.toHaveBeenCalled();
    expect(component.tokenList.first.elementRef.nativeElement.querySelector('.fd-token').setAttribute).not.toHaveBeenCalled();
  });

  it('should handleTokenFocus right arrow from input', () => {
    component.tokenList.forEach(token => spyOn(token.elementRef.nativeElement.querySelector('.fd-token'), 'focus'));
    component.tokenList.forEach(token => spyOn(token.elementRef.nativeElement.querySelector('.fd-token'), 'setAttribute'));
    component.handleTokenFocus({code: 'ArrowRight'}, component.tokenList.length);

    fixture.detectChanges();

    expect(component.tokenList.last.elementRef.nativeElement.querySelector('.fd-token').focus).not.toHaveBeenCalled();
    expect(component.tokenList.last.elementRef.nativeElement.querySelector('.fd-token').setAttribute).not.toHaveBeenCalledWith();
  });

  it('should handleTokenFocus right arrow from last token', () => {
    spyOn(component.input.elementRef.nativeElement, 'focus');
    component.handleTokenFocus({code: 'ArrowRight'}, component.tokenList.length - 1);

    fixture.detectChanges();

    expect(component.input.elementRef.nativeElement.focus).toHaveBeenCalled();
  });
});
