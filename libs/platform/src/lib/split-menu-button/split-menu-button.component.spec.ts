import { OverlayContainer } from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed, inject, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { ElementRef, ViewChild, Component } from '@angular/core';
import { ENTER, DOWN_ARROW } from '@angular/cdk/keycodes';

import { createKeyboardEvent } from '@fundamental-ngx/core/tests';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { IconModule } from '@fundamental-ngx/core/icon';
import { RtlService } from '@fundamental-ngx/core/utils';
import { PlatformMenuModule } from '@fundamental-ngx/platform/menu';
import { SplitMenuButtonComponent } from './split-menu-button.component';
import { PlatformSplitMenuButtonModule } from './split-menu-button.module';

function mouseClickOnElement(el: Element): void {
    const event: MouseEvent = new MouseEvent('click', {
        detail: 1
    });
    el.dispatchEvent(event);
}

@Component({
    selector: 'fdp-test-fdp-split-menu-button',
    template: `
        <fdp-split-menu-button
            [id]="'split-menu-button3'"
            [name]="'split-menu-button3'"
            [menu]="basicMenu"
            [buttonLabel]="'Default Button'"
            [icon]="'world'"
            [type]="'standard'"
            [disabled]="disabled"
            (primaryButtonClick)="onPrimaryButtonClick()"
        >
        </fdp-split-menu-button>

        <fdp-menu #basicMenu id="basic-menu" xPosition="after">
            <fdp-menu-item (itemSelect)="onItemSelect('First Item')">First Item</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onItemSelect('Second Item')">Second Item</fdp-menu-item>
            <fdp-menu-item (itemSelect)="onItemSelect('Third Item')">Third Item</fdp-menu-item>
        </fdp-menu>
    `
})
class TestWrapperComponent {
    @ViewChild(SplitMenuButtonComponent, { static: true })
    splitMenuRef: SplitMenuButtonComponent;

    @ViewChild(SplitMenuButtonComponent, { read: ElementRef, static: true })
    splitMenuElement: ElementRef;

    actionValue: string;

    disabled = false;

    onPrimaryButtonClick(): void {
        this.actionValue = 'Default Button';
    }

    onItemSelect(value: string): void {
        this.actionValue = value;
    }
}

describe('SplitMenuButtonComponent', () => {
    let host: TestWrapperComponent;
    let fixture: ComponentFixture<TestWrapperComponent>;
    let overlayContainerEl: HTMLElement;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ButtonModule, PlatformMenuModule, IconModule, PlatformSplitMenuButtonModule],
            declarations: [TestWrapperComponent],
            providers: [RtlService]
        }).compileComponents();

        inject([OverlayContainer], (overlayContainer: OverlayContainer) => {
            overlayContainerEl = overlayContainer.getContainerElement();
        })();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestWrapperComponent);
        host = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(host).toBeTruthy();
    });

    it('should call onPrimaryButtonClick on Primary Button click', () => {
        const buttons = fixture.debugElement.queryAll(By.css('.fd-button'));
        buttons[0].nativeElement.click();
        fixture.detectChanges();
        expect(host.actionValue).toEqual('Default Button');
    });

    it('should Open Menu and click first Item', fakeAsync(() => {
        /**
         * FIRST-CLICK On Menu Button (OPEN MENU)
         */
        const splitMenuButton = fixture.debugElement.queryAll(By.css('.fd-button'));
        mouseClickOnElement(splitMenuButton[1].nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * KEYPRESS ENTER
         */
        const keyboardEvent = createKeyboardEvent('keydown', ENTER, 'Enter');
        items[0].dispatchEvent(keyboardEvent);
        fixture.detectChanges();
        expect(host.actionValue).toBe('First Item');

        // Menu will be closed. so open again.

        /**
         * FIRST-CLICK On Menu Button (OPEN MENU)
         */
        mouseClickOnElement(splitMenuButton[1].nativeElement);
        tick(1);
        fixture.detectChanges();

        const items1 = overlayContainerEl.querySelectorAll('.fd-menu__item');

        /**
         * KEYPRESS ARROWDOWN
         */
        const keyboardEvent1 = createKeyboardEvent('keydown', DOWN_ARROW, 'ArrowDown');
        items1[0].dispatchEvent(keyboardEvent1);
        fixture.detectChanges();

        /**
         * KEYPRESS ENTER
         */
        const keyboardEvent2 = createKeyboardEvent('keydown', ENTER, 'Enter');
        items1[1].dispatchEvent(keyboardEvent2);
        fixture.detectChanges();
        expect(host.actionValue).toBe('Second Item');
    }));

    it('should not open menu when split-menu-button is disabled', fakeAsync(() => {
        host.disabled = true;
        fixture.detectChanges();

        const splitButtons = fixture.debugElement.queryAll(By.css('.fd-button'));
        expect(splitButtons[0].nativeElement.classList.contains('is-disabled')).toBeTrue();
        expect(splitButtons[1].nativeElement.classList.contains('is-disabled')).toBeTrue();

        // click on primary button
        mouseClickOnElement(splitButtons[0].nativeElement);
        tick(1);
        fixture.detectChanges();

        const items = overlayContainerEl.querySelectorAll('.fd-menu__item');
        expect(items.length).toBeFalsy();

        // click on secondary button
        mouseClickOnElement(splitButtons[1].nativeElement);
        tick(1);
        fixture.detectChanges();

        const items1 = overlayContainerEl.querySelectorAll('.fd-menu__item');
        expect(items1.length).toBeFalsy();
    }));
});
