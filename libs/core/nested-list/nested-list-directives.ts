import {
    ChangeDetectionStrategy,
    Component,
    computed,
    Directive,
    ElementRef,
    inject,
    Input,
    signal,
    ViewEncapsulation
} from '@angular/core';
import { RtlService } from '@fundamental-ngx/cdk/utils';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { NestedItemService } from './nested-item/nested-item.service';

let uniqueId = 0;

@Directive({
    selector: '[fdNestedDirectivesHeader], [fd-nested-list-header]',
    host: {
        class: 'fd-nested-list__group-header',
        '[attr.id]': 'id'
    }
})
export class NestedListHeaderDirective {
    /** Id of the element. */
    @Input()
    id: string | null = `fd-nested-list-group-header-${++uniqueId}`;

    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    /** Get the header title */
    get title(): string {
        return this._elementRef.nativeElement.textContent;
    }
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdNestedDirectivesIcon], [fd-nested-list-icon]',
    template: `<ng-content></ng-content>`,
    host: {
        class: 'fd-nested-list__icon',
        '[attr.role]': 'role'
    }
})
export class NestedListIconComponent extends IconComponent {
    /** Role attribute */
    @Input()
    role = 'presentation';
}

@Directive({
    selector: '[fdNestedDirectivesTitle], [fd-nested-list-title]',
    host: {
        class: 'fd-nested-list__title'
    }
})
export class NestedListTitleDirective {
    /** @hidden */
    private readonly _elementRef = inject(ElementRef);

    /** Returns element's InnerText */
    getInnerText(): string {
        return this._elementRef?.nativeElement.textContent;
    }
}

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: '[fdNestedListExpandIcon], [fd-nested-list-expand-icon]',
    template: `
        <ng-content></ng-content>
        <fd-icon [glyph]="expandIcon()"></fd-icon>
    `,
    host: {
        'aria-haspopup': 'true',
        tabindex: '-1',
        class: 'fd-nested-list__button fd-button',
        '[class.is-expanded]': 'expanded()',
        '[attr.aria-expanded]': 'expanded()',
        '[attr.aria-hidden]': 'true',
        '(click)': 'onClick($event)',
        '(focus)': 'onFocus()'
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    imports: [IconComponent]
})
export class NestedListExpandIconComponent {
    /**
     * @hidden
     * Attribute controlled by the parent `NestedItemDirective`
     */
    readonly expanded = signal(false);

    /** @hidden */
    readonly expandIcon = computed(() => {
        if (this.expanded()) {
            return 'navigation-down-arrow';
        }
        return this._rtlService?.rtl() ? 'navigation-left-arrow' : 'navigation-right-arrow';
    });

    /** @hidden */
    private readonly _itemService = inject(NestedItemService);

    /** @hidden */
    private readonly _rtlService = inject(RtlService, { optional: true });

    /** Mouse event handler */
    onClick(event: MouseEvent): void {
        this.expanded.update((v) => !v);
        this._itemService.toggle.next(this.expanded());
        event.stopPropagation();
    }

    /** Handler for focus events */
    onFocus(): void {
        this._itemService.focus.next();
    }

    /** @hidden */
    changeExpandedState(expanded: boolean): void {
        this.expanded.set(expanded);
    }
}
