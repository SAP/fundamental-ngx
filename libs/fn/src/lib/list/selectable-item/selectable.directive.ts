import { ChangeDetectorRef, Directive, ElementRef, HostBinding, Inject, Input } from '@angular/core';
import { SelectableItemToken, SelectComponentRootToken } from '@fundamental-ngx/fn/cdk';
import { coerceBoolean } from '@fundamental-ngx/fn/utils';

@Directive({
    selector: 'fn-list-item[selectable], [fn-list-item][selectable]',
    exportAs: 'selectableListItem',
    providers: [
        {
            provide: SelectableItemToken,
            useExisting: SelectableDirective
        }
    ]
})
export class SelectableDirective implements SelectableItemToken<Record<string, any>> {
    @Input()
    @HostBinding('class.is-selected')
    @coerceBoolean
    selected!: boolean;

    @Input()
    value!: Record<string, any>;

    constructor(
        @Inject(SelectComponentRootToken) private rootComponent: SelectComponentRootToken,
        private _elementRef: ElementRef<HTMLElement>,
        private _changeDetectorRef: ChangeDetectorRef
    ) {}

    elementRef(): ElementRef<HTMLElement> {
        return this._elementRef;
    }

    getSelected(): boolean {
        return this.selected;
    }

    setSelected(isSelected: boolean): void {
        this.selected = isSelected;
        this._changeDetectorRef.markForCheck();
    }
}
