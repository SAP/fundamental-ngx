import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnInit,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { ObjectStatus } from '@fundamental-ngx/core/object-status';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { FormStates, Nullable } from '@fundamental-ngx/core/shared';
import { DestroyedService } from '@fundamental-ngx/core/utils';
import { getFormState } from '@fundamental-ngx/platform/form';
import { countBy, flatten } from 'lodash-es';
import { takeUntil } from 'rxjs';
import { MessagePopoverEntry } from './models/message-popover-entry.interface';
import { MessagePopoverError, MessagePopoverErrorGroup } from './models/message-popover-error.interface';
import { MessagePopoverWrapper } from './models/message-popover-wrapper.interface';
import { convertFormState } from './utils';

@Component({
    selector: 'fdp-message-popover',
    templateUrl: './message-popover.component.html',
    styleUrls: ['./message-popover.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [DestroyedService]
})
export class MessagePopoverComponent implements OnInit {
    /** Message Popover Wrapper component. */
    @Input()
    wrapper: MessagePopoverWrapper;

    /** Current message popover screen. Can be `list` or `details`. */
    currentScreen: 'list' | 'details' = 'list';

    /** Current error entry. */
    currentEntry: Nullable<MessagePopoverEntry>;

    /** @hidden */
    _currentErrorType: MessagePopoverError['group'] = 'all';

    /** @hidden */
    _errorTypes: MessagePopoverError[] = [];

    /** @hidden */
    _priorityStateItemsCount = 0;

    /** @hidden */
    _priorityFormState: FormStates;

    /** @hidden */
    _priorityState: ObjectStatus;

    /** @hidden */
    _filteredErrors: MessagePopoverErrorGroup[] = [];

    /** @hidden */
    @ViewChild('popover')
    private readonly _popover: PopoverComponent;

    /** @hidden */
    private _groupedErrors: MessagePopoverErrorGroup[] = [];

    /** @hidden */
    constructor(private readonly _cdr: ChangeDetectorRef, private readonly _destroy$: DestroyedService) {}

    /** @hidden */
    ngOnInit(): void {
        this.wrapper?.errors.pipe(takeUntil(this._destroy$)).subscribe((errors) => {
            this._groupedErrors = errors;
            this._errorTypes = [];
            const countedErrors = countBy(
                flatten(Object.values(this._groupedErrors.map((group) => group.errors))),
                'type'
            );
            const errorTypes = Object.keys(countedErrors) as FormStates[];
            errorTypes.forEach((errorType) => {
                this._errorTypes.push({
                    group: errorType,
                    count: countedErrors[errorType],
                    state: convertFormState(errorType)
                });
            });

            this._priorityFormState = getFormState(errorTypes);
            this._priorityState = convertFormState(this._priorityFormState);

            this._priorityStateItemsCount = countedErrors[this._priorityFormState];
            this._filterErrors();

            this._cdr.detectChanges();
        });
    }

    /** @hidden */
    _showList(): void {
        this.currentScreen = 'list';
        this.currentEntry = null;
    }

    /** @hidden */
    _showDetails(entry: MessagePopoverEntry): void {
        this.currentScreen = 'details';
        this.currentEntry = entry;
    }

    /** @hidden */
    _closePopover(focusLast = true): void {
        this._popover.close(focusLast);
    }

    /** @hidden */
    _filterErrors(): void {
        if (this._currentErrorType === 'all') {
            this._filteredErrors = this._groupedErrors;
            return;
        }
        this._filteredErrors = [];
        this._groupedErrors.forEach((group) => {
            const errors = group.errors.filter((error) => error.type === this._currentErrorType);

            if (errors.length === 0) {
                return;
            }

            this._filteredErrors.push({
                group: group.group,
                errors
            });
        });
    }
}
