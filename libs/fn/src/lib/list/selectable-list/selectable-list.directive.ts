import { AfterViewInit, ChangeDetectorRef, ContentChildren, Directive, forwardRef, QueryList } from '@angular/core';
import { SelectableItemToken, SelectComponentRootToken, SelectionService } from '@fundamental-ngx/fn/cdk';

@Directive({
    selector: 'fn-list[selectable], [fn-list][selectable]',
    providers: [
        {
            provide: SelectComponentRootToken,
            useExisting: forwardRef(() => SelectableListDirective)
        },
        SelectionService
    ]
})
export class SelectableListDirective implements SelectComponentRootToken, AfterViewInit {
    multiple = true;
    toggle!: boolean;
    disabled!: boolean;

    @ContentChildren(SelectableItemToken) items!: QueryList<SelectableItemToken>;

    constructor(private selectionService: SelectionService, private _changeDetectorRef: ChangeDetectorRef) {
        this.selectionService.registerRootComponent(this);
        this.selectionService.setValue([]);
    }

    onChange: (value: any) => void = (val) => {
        console.log({ val });
    };

    ngAfterViewInit(): void {
        this.selectionService.initialize(this.items);
    }
}
