import { NgIf } from '@angular/common';
import { Component, ElementRef, HostBinding, inject, Input } from '@angular/core';
import { FDK_FOCUSABLE_ITEM_DIRECTIVE, FocusableItem, HasElementRef, Nullable } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { fromEvent, Observable } from 'rxjs';

@Component({
    selector: 'fdb-navigation-menu-item, li[fdb-navigation-menu-item]',
    template: `
        <fd-icon
            class="fd-navigation-menu__icon"
            [glyph]="glyph"
            role="presentation"
            aria-hidden="true"
            *ngIf="glyph"
        ></fd-icon>
        <span class="fd-navigation-menu__text" *ngIf="label">
            {{ label }}
        </span>
        <ng-content></ng-content>
    `,
    standalone: true,
    imports: [IconComponent, NgIf],
    providers: [
        {
            provide: FDK_FOCUSABLE_ITEM_DIRECTIVE,
            useExisting: NavigationMenuItemComponent
        }
    ],
    host: {
        class: 'fd-navigation-menu__item'
    }
})
export class NavigationMenuItemComponent implements FocusableItem, HasElementRef {
    /**
     * Name of the icon to be displayed before the text.
     */
    @Input()
    glyph: Nullable<string>;

    /**
     * Text to be displayed.
     */
    @Input()
    label: string;

    /** @hidden */
    @HostBinding('attr.tabindex')
    tabindex = 0;

    /** @hidden */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @hidden */
    disabled = false;

    /** @hidden */
    keydown: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(this.elementRef.nativeElement, 'keydown');

    /** @hidden */
    element = (): HTMLElement => this.elementRef.nativeElement;

    /** @hidden */
    isFocusable = (): boolean => this.tabindex !== -1;

    /** @hidden */
    setTabbable(tabbable: boolean): void {
        this.tabindex = tabbable ? 0 : -1;
    }

    /** @hidden */
    focus(): void {
        this.elementRef.nativeElement.focus();
    }

    /** @hidden */
    getLabel(): string {
        return this.label;
    }
}
