import { NgClass } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation,
    WritableSignal,
    computed,
    signal
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormStates } from '@fundamental-ngx/cdk/forms';
import { InitialFocusDirective, Nullable } from '@fundamental-ngx/cdk/utils';
import { BarModule } from '@fundamental-ngx/core/bar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ObjectStatusComponent } from '@fundamental-ngx/core/object-status';
import { PopoverComponent, PopoverModule } from '@fundamental-ngx/core/popover';
import { SegmentedButtonComponent } from '@fundamental-ngx/core/segmented-button';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { getFormState } from '@fundamental-ngx/platform/form';
import { countBy, flatten } from 'lodash-es';
import { MessageViewComponent } from './components/message-view/message-view.component';
import {
    MessagePopoverEntry,
    MessagePopoverError,
    MessagePopoverErrorGroup
} from './models/message-popover-entry.interface';
import { MessagePopoverWrapper } from './models/message-popover-wrapper.interface';
import { MessagePopover, MessagePopoverState } from './models/message-popover.interface';
import { convertFormState, convertFormStateToMessagePopoverState } from './utils';

@Component({
    selector: 'fdp-message-popover',
    templateUrl: './message-popover.component.html',
    styleUrl: './message-popover.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        PopoverModule,
        ButtonComponent,
        NgClass,
        BarModule,
        SegmentedButtonComponent,
        FormsModule,
        ObjectStatusComponent,
        InitialFocusDirective,
        MessageViewComponent,
        FdTranslatePipe
    ]
})
export class MessagePopoverComponent implements MessagePopover {
    /** @hidden */
    @ViewChild('popover')
    readonly _popover: PopoverComponent;

    /** Message Popover Wrapper component. */
    @Input()
    set wrapper(value: Nullable<MessagePopoverWrapper>) {
        value?.setMessagePopover(this);
        this._wrapper$.set(value);
    }
    get wrapper(): Nullable<MessagePopoverWrapper> {
        return this._wrapper$();
    }

    /** Event emits when user clicks on error entry and item's element needs to be focused. */
    @Output()
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

    private readonly _groupedErrors$ = computed(() => this._wrapper$()?.errors$() || []);

    private readonly _wrapper$ = signal<Nullable<MessagePopoverWrapper>>(null);

    private readonly _countedErrors$ = computed(() =>
        countBy(flatten(Object.values(this._groupedErrors$().map((group) => group.errors))), 'type')
    );

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
}
