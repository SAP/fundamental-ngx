/* eslint-disable @angular-eslint/no-input-rename */
import { Directive, Input, signal } from '@angular/core';
import { FdbToolHeaderActionButton } from '../tool-header-action-button.type';

@Directive({
    // eslint-disable-next-line @angular-eslint/directive-selector
    selector: 'fdb-tool-header-actions',
    standalone: true
})
export class ToolHeaderActionsDirective {
    /**
     * Actions to be displayed in the header.
     */
    @Input()
    set actions(actions: FdbToolHeaderActionButton[] | Array<FdbToolHeaderActionButton[]>) {
        this._actions.set(
            (actions as any).reduce(
                (
                    acc: FdbToolHeaderActionButton[],
                    actionOrActionGroup: FdbToolHeaderActionButton[] | FdbToolHeaderActionButton,
                    index: number
                ) => {
                    if (Array.isArray(actionOrActionGroup)) {
                        acc.push(...actionOrActionGroup);
                        if (index !== (actions as any).length - 1) {
                            acc[acc.length - 1].hasSeparator = true;
                        }
                    } else {
                        acc.push(actionOrActionGroup);
                    }
                    return acc;
                },
                []
            )
        );
    }

    /** @hidden */
    _actions = signal<FdbToolHeaderActionButton[]>([]);
}
