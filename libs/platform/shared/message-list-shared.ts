import { EventEmitter, WritableSignal, computed, signal } from '@angular/core';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { Nullable, countBy } from '@fundamental-ngx/cdk/utils';
import { getFormState } from '@fundamental-ngx/platform/form';
import {
    MessagePopover,
    MessagePopoverEntry,
    MessagePopoverError,
    MessagePopoverErrorGroup,
    MessagePopoverState,
    MessagePopoverWrapper,
    convertFormState,
    convertFormStateToMessagePopoverState
} from '@fundamental-ngx/platform/messages-shared';

/**
 * Abstract base class for message list components (MessagePopover and MessageView).
 * Contains shared logic for managing error states, filtering, and navigation between list/detail views.
 */
export abstract class MessageListShared implements MessagePopover {
    /** Event emits when user clicks on error entry and item's element needs to be focused. */
    focusItem = new EventEmitter<MessagePopoverEntry>();

    /** Current message popover screen. Can be `list` or `details`. */
    currentScreen: 'list' | 'details' = 'list';

    /** Current error entry. */
    currentEntry: Nullable<MessagePopoverEntry>;

    /** @hidden */
    _currentErrorType$: WritableSignal<MessagePopoverError['group']> = signal('all');

    /** @hidden */
    _errorTypes$ = computed<MessagePopoverError[]>(() => {
        const countedErrors = this._countedErrors$();
        const errorTypes = Object.keys(countedErrors) as FormStates[];
        return errorTypes.map((errorType) => ({
            group: errorType,
            count: countedErrors[errorType],
            state: convertFormState(errorType)
        }));
    });

    /** @hidden */
    _priorityStateItemsCount$ = computed(() => this._countedErrors$()[this._priorityFormState$()!] || 0);

    /** @hidden */
    _priorityFormState$ = computed<FormStates>(() => {
        const countedErrors = this._countedErrors$();
        const errorTypes = Object.keys(countedErrors) as FormStates[];
        return getFormState(errorTypes);
    });

    /** @hidden */
    _priorityState$ = computed<Nullable<MessagePopoverState>>(() =>
        convertFormStateToMessagePopoverState(this._priorityFormState$())
    );

    /** @hidden */
    readonly _filteredErrors$ = computed(() => {
        const groupedErrors = this._groupedErrors$();
        const errorType = this._currentErrorType$();

        if (errorType === 'all') {
            return groupedErrors;
        }

        const filteredErrors: MessagePopoverErrorGroup[] = [];
        groupedErrors.forEach((group) => {
            const errors = group.errors.filter((error) => error.type === errorType);

            if (errors.length === 0) {
                return;
            }

            filteredErrors.push({
                group: group.group,
                errors
            });
        });

        return filteredErrors;
    });

    /** @hidden */
    protected readonly _groupedErrors$ = computed(() => this._wrapper$()?.errors$() || []);

    /** @hidden */
    protected readonly _wrapper$ = signal<Nullable<MessagePopoverWrapper>>(null);

    /** @hidden */
    protected readonly _countedErrors$ = computed(() => {
        const allErrors = this._groupedErrors$().flatMap((group) => group.errors);
        return countBy(allErrors, 'type');
    });

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
}
