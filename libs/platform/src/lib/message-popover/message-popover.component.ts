import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    DestroyRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { getFormState } from '@fundamental-ngx/platform/form';
import { countBy, flatten } from 'lodash-es';
import {
    MessagePopoverEntry,
    MessagePopoverError,
    MessagePopoverErrorGroup
} from './models/message-popover-entry.interface';
import { MessagePopoverWrapper } from './models/message-popover-wrapper.interface';
import { convertFormState, convertFormStateToMessagePopoverState } from './utils';
import { MessagePopover, MessagePopoverState } from './models/message-popover.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { MessageViewComponent } from './components/message-view/message-view.component';
import { InitialFocusDirective, DeprecatedInitialFocusDirective } from '@fundamental-ngx/cdk/utils';
import { ObjectStatusModule } from '@fundamental-ngx/core/object-status';
import { FormsModule } from '@angular/forms';
import { SegmentedButtonModule } from '@fundamental-ngx/core/segmented-button';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonModule } from '@fundamental-ngx/core/button';
import { PopoverModule } from '@fundamental-ngx/core/popover';
import { NgIf, NgClass, NgFor } from '@angular/common';

@Component({
    selector: 'fdp-message-popover',
    templateUrl: './message-popover.component.html',
    styleUrls: ['./message-popover.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        NgIf,
        PopoverModule,
        ButtonModule,
        NgClass,
        BarModule,
        SegmentedButtonModule,
        FormsModule,
        NgFor,
        ObjectStatusModule,
        InitialFocusDirective,
        DeprecatedInitialFocusDirective,
        MessageViewComponent,
        FdTranslatePipe
    ]
})
export class MessagePopoverComponent implements MessagePopover, OnInit {
    /** @hidden */
    @ViewChild('popover')
    readonly _popover: PopoverComponent;

    /** Message Popover Wrapper component. */
    @Input()
    wrapper: MessagePopoverWrapper;

    /** Event emits when user clicks on error entry and item's element needs to be focused. */
    @Output()
    focusItem = new EventEmitter<MessagePopoverEntry>();

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
    _priorityState: MessagePopoverState;

    /** @hidden */
    _filteredErrors: MessagePopoverErrorGroup[] = [];

    /** @hidden */
    private _groupedErrors: MessagePopoverErrorGroup[] = [];

    /** @hidden */
    constructor(private readonly _cdr: ChangeDetectorRef, private readonly _destroyRef: DestroyRef) {}

    /** @hidden */
    ngOnInit(): void {
        this.wrapper?.setMessagePopover(this);
        this.wrapper?.errors.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((errors) => {
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
            this._priorityState = convertFormStateToMessagePopoverState(this._priorityFormState);

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
