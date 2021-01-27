import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AvatarModule, FormControlModule } from '@fundamental-ngx/core';

import { FeedInputComponent } from './feed-input.component';
import { PlatformButtonModule } from '../button/public_api';

describe('FeedInputComponent', () => {
    let component: FeedInputComponent;
    let fixture: ComponentFixture<FeedInputComponent>;
    let hostEl: DebugElement;
    let textareaEl;
    let buttonEl;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ FormsModule, PlatformButtonModule, AvatarModule, FormControlModule ],
            declarations: [ FeedInputComponent ]
        })
            .overrideComponent(FeedInputComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(FeedInputComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();

        hostEl = fixture.debugElement.query(By.css('.fd-feed-input'));
        textareaEl = fixture.debugElement.query(By.css('textarea'));
        buttonEl = fixture.debugElement.query(By.css('fdp-button'));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should disabled state', () => {
        component.disabled = true;
        fixture.detectChanges();

        expect(textareaEl.nativeElement.getAttribute('aria-disabled')).toEqual('true');
        expect(buttonEl.nativeElement.getAttribute('ng-reflect-aria-disabled')).toEqual('true');
    });

    it('should button disabled when textarea has not a value', () => {
        textareaEl.nativeElement.value = '';
        textareaEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(buttonEl.nativeElement.getAttribute('ng-reflect-aria-disabled')).toEqual('true');
    });

    it('should button enable when textarea has a value', () => {
        textareaEl.nativeElement.value = 'test';
        textareaEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(buttonEl.nativeElement.getAttribute('ng-reflect-aria-disabled')).toEqual('false');
    });

    it('should textarea grow by default', () => {
        const defaultHeight = textareaEl.nativeElement.style.height;
        textareaEl.nativeElement.value = '1 \n 2 \n 3 \n 4';
        component.resize();

        expect(textareaEl.nativeElement.style.height).toBeGreaterThan(defaultHeight);
    });

    it('should set max height', () => {
        component.maxHeight = 7;
        component.ngAfterViewInit();

        fixture.detectChanges();

        component.resize();
        expect(textareaEl.nativeElement.style.maxHeight).toEqual('133px');
    });

    it('should call onChange when textarea value changing', () => {
        spyOn(component, 'onChange');
        textareaEl.nativeElement.value = 'test';
        textareaEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.onChange).toHaveBeenCalled();
    });

    it('should call resize when textarea value changing', () => {
        spyOn(component, 'resize');
        textareaEl.nativeElement.value = 'test';
        textareaEl.nativeElement.dispatchEvent(new Event('input'));
        fixture.detectChanges();

        expect(component.resize).toHaveBeenCalled();
    })
});
