import { Component, ElementRef, HostBinding, inject, Input } from '@angular/core';
import {
    FDK_FOCUSABLE_ITEM_DIRECTIVE,
    FocusableItem,
    HasElementRef,
    IndirectFocusableItemDirective,
    Nullable
} from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { fromEvent, Observable } from 'rxjs';

@Component({
    selector: 'fdb-navigation-menu-item, li[fdb-navigation-menu-item]',
    template: `
        @if (glyph) {
            <fd-icon class="fd-navigation-menu__icon" [glyph]="glyph" role="presentation" aria-hidden="true"></fd-icon>
        }
        @if (label) {
            <span class="fd-navigation-menu__text">
                {{ label }}
            </span>
        }
        <ng-content></ng-content>
    `,
    standalone: true,
    imports: [IconComponent],
    hostDirectives: [IndirectFocusableItemDirective],
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

    /** @ignore */
    @HostBinding('attr.tabindex')
    tabindex = 0;

    /** @ignore */
    elementRef: ElementRef<HTMLElement> = inject(ElementRef);

    /** @ignore */
    disabled = false;

    /** @ignore */
    keydown: Observable<KeyboardEvent> = fromEvent<KeyboardEvent>(this.elementRef.nativeElement, 'keydown');

    /** @ignore */
    element = (): HTMLElement => this.elementRef.nativeElement;

    /** @ignore */
    isFocusable = (): boolean => !this.disabled;

    /** @ignore */
    setTabbable(tabbable: boolean): void {
        this.tabindex = tabbable ? 0 : -1;
    }

    /** @ignore */
    focus(): void {
        this.elementRef.nativeElement.focus();
    }

    /** @ignore */
    getLabel(): string {
        return this.label;
    }
}
