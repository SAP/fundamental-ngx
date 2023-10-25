import { Directive, InjectionToken, Input, TemplateRef, inject } from '@angular/core';

export const FDP_COMBOBOX_ITEM_DEF = new InjectionToken<FdpComboboxItemDef>('FdpComboboxItemDefinition');

export type FdoComboboxItemDefType =
    | 'optionItemTemplate'
    | 'groupItemTemplate'
    | 'secondaryItemTemplate'
    | 'selectedItemTemplate';

@Directive()
export abstract class FdpComboboxItemDef<T = unknown> {
    /** @hidden */
    abstract name: FdoComboboxItemDefType;
    /** @hidden */
    templateRef = inject(TemplateRef<T>);
}

@Directive({
    selector: '[fdpComboboxItem]',
    standalone: true,
    providers: [
        {
            provide: FDP_COMBOBOX_ITEM_DEF,
            useExisting: ComboboxItemDirective
        }
    ]
})
export class ComboboxItemDirective<T = unknown> extends FdpComboboxItemDef<{ $implicit: T; index: number }> {
    /** @hidden */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('fdpComboboxItemUse')
    useModel: T;
    /** @hidden */
    name: FdoComboboxItemDefType = 'optionItemTemplate';

    /** @hidden */
    static ngTemplateContextGuard<T>(
        dir: ComboboxItemDirective<T>,
        ctx: { $implicit: T; index: number }
    ): ctx is { $implicit: T; index: number } {
        return true;
    }
}

@Directive({
    selector: '[fdpComboboxSelectedItem]',
    standalone: true,
    providers: [
        {
            provide: FDP_COMBOBOX_ITEM_DEF,
            useExisting: ComboboxSelectedItemDirective
        }
    ]
})
export class ComboboxSelectedItemDirective<T = unknown> extends FdpComboboxItemDef<{ $implicit: T; index: number }> {
    /** @hidden */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('fdpComboboxSelectedItemUse')
    useModel: T;
    /** @hidden */
    name: FdoComboboxItemDefType = 'selectedItemTemplate';

    /** @hidden */
    static ngTemplateContextGuard<T>(
        dir: ComboboxSelectedItemDirective<T>,
        ctx: { $implicit: T; index: number }
    ): ctx is { $implicit: T; index: number } {
        return true;
    }
}

@Directive({
    selector: '[fdpComboboxGroup]',
    standalone: true,
    providers: [
        {
            provide: FDP_COMBOBOX_ITEM_DEF,
            useExisting: ComboboxItemGroupDirective
        }
    ]
})
export class ComboboxItemGroupDirective extends FdpComboboxItemDef<{ $implicit: { label: string } }> {
    /** @hidden */
    name: FdoComboboxItemDefType = 'groupItemTemplate';

    /** @hidden */
    static ngTemplateContextGuard(
        dir: ComboboxItemGroupDirective,
        ctx: { $implicit: { label: string } }
    ): ctx is { $implicit: { label: string } } {
        return true;
    }
}

@Directive({
    selector: '[fdpComboboxSecondaryItem]',
    standalone: true,
    providers: [
        {
            provide: FDP_COMBOBOX_ITEM_DEF,
            useExisting: ComboboxSecondaryItemDirective
        }
    ]
})
export class ComboboxSecondaryItemDirective<T = unknown> extends FdpComboboxItemDef<{ $implicit: T }> {
    /** @hidden */
    // eslint-disable-next-line @angular-eslint/no-input-rename
    @Input('fdpComboboxSecondaryItemUse')
    useModel: T;

    /** @hidden */
    name: FdoComboboxItemDefType = 'secondaryItemTemplate';

    /** @hidden */
    static ngTemplateContextGuard<T>(
        dir: ComboboxSelectedItemDirective<T>,
        ctx: { $implicit: T }
    ): ctx is { $implicit: T } {
        return true;
    }
}
