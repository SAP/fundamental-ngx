import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnDestroy,
    Output,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FILTER_STRATEGY, FilterableColumnDataType } from '@fundamental-ngx/platform/table-helpers';
import { Subscription } from 'rxjs';
import { skip } from 'rxjs/operators';

import { NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault, NgTemplateOutlet } from '@angular/common';
import { DatePickerComponent } from '@fundamental-ngx/core/date-picker';
import { FormControlComponent } from '@fundamental-ngx/core/form';
import { LayoutGridColDirective, LayoutGridRowDirective } from '@fundamental-ngx/core/layout-grid';
import { OptionComponent, SelectComponent } from '@fundamental-ngx/core/select';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { FilterRule } from './filtering.model';

@Component({
    selector: 'fdp-table-filter-rule',
    templateUrl: './filter-rule.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        LayoutGridRowDirective,
        LayoutGridColDirective,
        SelectComponent,
        FormsModule,
        NgFor,
        OptionComponent,
        NgSwitch,
        NgSwitchCase,
        NgSwitchDefault,
        NgTemplateOutlet,
        DatePickerComponent,
        FormControlComponent,
        FdTranslatePipe
    ]
})
export class FilterRuleComponent implements OnDestroy {
    /** Rule to be displayed **/
    @Input() rule: FilterRule;

    /** Emits when rule is changed */
    @Output() ruleChange: EventEmitter<void> = new EventEmitter();

    /** Emits when rule state is changed */
    @Output() ruleStateChange: EventEmitter<boolean> = new EventEmitter();

    /** @hidden */
    readonly FILTER_STRATEGY = FILTER_STRATEGY;

    /** @hidden */
    readonly DATA_TYPE = FilterableColumnDataType;

    /** @hidden */
    @ViewChild(NgForm)
    set ngForm(ngForm: NgForm) {
        if (!ngForm) {
            return;
        }
        this._subscriptions.add(
            ngForm.statusChanges
                ?.pipe(
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
