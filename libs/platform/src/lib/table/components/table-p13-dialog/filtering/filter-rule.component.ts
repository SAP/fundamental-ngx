import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import { FilterableColumnDataType } from '../../../enums/filter-type.enum';
import { FILTER_STRATEGY } from '../../../enums/collection-filter.enum';

import { FilterRule } from './filtering.model';

@Component({
    selector: 'fdp-table-filter-rule',
    templateUrl: './filter-rule.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FilterRuleComponent implements OnDestroy {
    /** Rule to be displayed **/
    @Input() rule: FilterRule;
    /** Whether should be displayed in compact mode **/
    @Input() compact: boolean;

    /** Emits when rule is changed */
    @Output() ruleChange: EventEmitter<void> = new EventEmitter();

    /** Emits when rule state is changed */
    @Output() ruleStateChange: EventEmitter<boolean> = new EventEmitter();

    readonly FILTER_STRATEGY = FILTER_STRATEGY;

    readonly DATA_TYPE = FilterableColumnDataType;

    @ViewChild(NgForm) set ngForm(ngForm: NgForm) {
        if (!ngForm) {
            return;
        }
        this._subscriptions.add(
            ngForm.statusChanges?.pipe(
                    // Skip first that triggers on initial phase
                    skip(1)
                )
                .subscribe(() => {
                    const isValid = !!ngForm.valid;
                    this.rule.setValid(isValid);
                    this.ruleStateChange.emit(isValid);
                })
        );
    }

    /** @hidden */
    private _subscriptions = new Subscription();

    /** @hidden */
    ngOnDestroy(): void {
        this._subscriptions.unsubscribe();
    }

    /** @hidden */
    _onModelChange(): void {
        this.ruleChange.emit();
    }
}
