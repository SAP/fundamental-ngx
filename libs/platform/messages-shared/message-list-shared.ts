import { EventEmitter, WritableSignal, computed, signal } from '@angular/core';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { Nullable, countBy } from '@fundamental-ngx/cdk/utils';
import { getFormState } from '@fundamental-ngx/platform/form';
import {
    MessagePopoverEntry,
    MessagePopoverError,
    MessagePopoverErrorGroup
} from './models/message-popover-entry.interface';
import { MessagePopoverWrapper } from './models/message-popover-wrapper.interface';
import { MessagePopover, MessagePopoverState } from './models/message-popover.interface';
import { convertFormState, convertFormStateToMessagePopoverState } from './utils';

/**
 * Abstract base class for message list components (MessagePopover and MessageView).
 * Contains shared logic for managing error states, filtering, and navigation between list/detail views.
 */
export abstract class MessageListShared implements MessagePopover {
    /** Event emits when user clicks on error entry and item's element needs to be focused. */
    focusItem = new EventEmitter<MessagePopoverEntry>();

    /** Current message popover screen. Can be `list` or `details`. */
    readonly currentScreen = signal<'list' | 'details'>('list');

    /** Current error entry. */
    readonly currentEntry = signal<Nullable<MessagePopoverEntry>>(null);

    /** @hidden */
    _currentErrorType: WritableSignal<MessagePopoverError['group']> = signal('all');

    /** @hidden */
    _errorTypes$ = computed<MessagePopoverError[]>(() => {
        const countedErrors = this.countedErrors$();
        const errorTypes = Object.keys(countedErrors) as FormStates[];
        return errorTypes.map((errorType) => ({
            group: errorType,
            count: countedErrors[errorType],
            state: convertFormState(errorType)
        }));
    });

    /** @hidden */
    _priorityStateItemsCount$ = computed(() => this.countedErrors$()[this._priorityFormState$()!] || 0);

    /** @hidden */
    _priorityFormState$ = computed<FormStates>(() => {
        const countedErrors = this.countedErrors$();
        const errorTypes = Object.keys(countedErrors) as FormStates[];
        return getFormState(errorTypes);
    });

    /** @hidden */
    _priorityState$ = computed<Nullable<MessagePopoverState>>(() =>
        convertFormStateToMessagePopoverState(this._priorityFormState$())
    );

    /** @hidden */
    readonly _filteredErrors$ = computed(() => {
        const groupedErrors = this.groupedErrors$();
        const errorType = this._currentErrorType();

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
    protected readonly groupedErrors$ = computed(() => this.wrapper$()?.errors$() || []);

    /** @hidden */
    protected readonly wrapper$ = signal<Nullable<MessagePopoverWrapper>>(null);

    /** @hidden */
    protected readonly countedErrors$ = computed(() => {
        const allErrors = this.groupedErrors$().flatMap((group) => group.errors);
        return countBy(allErrors, 'type');
    });

    /** @hidden */
    showList(): void {
        this.currentScreen.set('list');
        this.currentEntry.set(null);
    }

    /** @hidden */
    showDetails(entry: MessagePopoverEntry): void {
        this.currentScreen.set('details');
        this.currentEntry.set(entry);
    }
}
