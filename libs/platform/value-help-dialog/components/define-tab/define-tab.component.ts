/* eslint-disable @typescript-eslint/member-ordering */
import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';

import { NgTemplateOutlet } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import {
    FormControlComponent,
    FormInputMessageGroupComponent,
    FormLabelComponent,
    FormMessageComponent
} from '@fundamental-ngx/core/form';
import { LayoutGridColDirective, LayoutGridComponent, LayoutGridRowDirective } from '@fundamental-ngx/core/layout-grid';
import { ListGroupHeaderDirective, ListTitleDirective } from '@fundamental-ngx/core/list';
import { OptionComponent, SelectComponent } from '@fundamental-ngx/core/select';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { FdTranslatePipe } from '@fundamental-ngx/i18n';
import { MAX_CHARACTER_HINT_COUNT } from '../../constans';
import { ConditionCountMessageDirective } from '../../directives/condition-count-message.directive';
import {
    BaseEntity,
    VhdDefineExcludeStrategy,
    VhdDefineIncludeStrategy,
    VhdDefineType,
    VhdExcludedEntity,
    VhdIncludedEntity
} from '../../models';
import { VhdBaseTab } from '../base-tab/vhd-base-tab.component';

class ExtendedBaseEntity extends BaseEntity {
    id?: number;
}

class ExtendedIncludedEntity extends VhdIncludedEntity {
    id?: number;
}

class ExtendedExcludedEntity extends VhdExcludedEntity {
    id?: number;
}

let titleUniqueId = 0;

@Component({
    selector: 'fdp-define-tab',
    templateUrl: './define-tab.component.html',
    styleUrl: './define-tab.component.scss',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        TitleComponent,
        LayoutGridComponent,
        LayoutGridRowDirective,
        LayoutGridColDirective,
        FormLabelComponent,
        SelectComponent,
        FormsModule,
        ListGroupHeaderDirective,
        ListTitleDirective,
        OptionComponent,
        NgTemplateOutlet,
        FormInputMessageGroupComponent,
        FormControlComponent,
        ConditionCountMessageDirective,
        ButtonComponent,
        FormMessageComponent,
        FdTranslatePipe
    ]
})
export class DefineTabComponent extends VhdBaseTab implements OnChanges, AfterViewInit {
    /** @hidden */
    protected defaultId = `fd-title-id-${titleUniqueId++}`;
    /** @hidden */
    protected defaultSelectId = `fd-select-title-id-${titleUniqueId++}`;

    /** title id for the table  */
    @Input()
    titleId: string = this.defaultId;

    /** seelcted value id for the table  */
    @Input()
    selectedId: string = this.defaultSelectId;

    /** @hidden */
    @Input()
    conditions: ExtendedBaseEntity[] = [];

    /** @hidden */
    @Input()
    strategyLabels: { [key in keyof (typeof VhdDefineIncludeStrategy | typeof VhdDefineExcludeStrategy)]?: string } =
        {};

    /** @hidden */
    @Output()
    includeChange: EventEmitter<ExtendedIncludedEntity[]> = new EventEmitter<ExtendedIncludedEntity[]>();

    /** @hidden */
    @Output()
    excludeChange: EventEmitter<ExtendedExcludedEntity[]> = new EventEmitter<ExtendedExcludedEntity[]>();

    /** @hidden */
    @Output()
    conditionChange: EventEmitter<BaseEntity[]> = new EventEmitter<BaseEntity[]>();

    /** @hidden */
    _conditions: ExtendedBaseEntity[] = [];

    /** @hidden */
    _definePanelState = {
        included: false,
        excluded: false
    };

    /** @hidden */
    _rules = {
        maxCharactersHintCount: MAX_CHARACTER_HINT_COUNT
    };
    /** @hidden */
    _strategyIncludeValues = VhdDefineIncludeStrategy;

    /** @hidden */
    _strategyExcludeValues = VhdDefineExcludeStrategy;

    /** @hidden */
    _defineTypes = VhdDefineType;

    /** @hidden */
    _includeStrategy: StategyItem[] = [];

    /** @hidden */
    _excludeStrategy: StategyItem[] = [];

    /** @hidden */
    ngOnChanges(changes: SimpleChanges): void {
        if ('conditions' in changes) {
            this._conditions = (this.conditions as ExtendedIncludedEntity[]) || [];
            this._initializeConditions();
        }
    }

    /** @hidden */
    ngAfterViewInit(): void {
        this._refreshStrategies();
    }

    /** @hidden Track function for main data */
    _trackByKeyAndType(
        _index: number,
        item: ExtendedIncludedEntity | ExtendedExcludedEntity
    ): number | string | undefined {
        if (item) {
            return item.id + item.key + item.type;
        }

        return undefined;
    }

    /** @hidden */
    _onSelectStrategy(): void {
        this._filterChanged();
    }

    /** @hidden */
    _filterChanged(): void {
        this.conditionChange.emit(this._conditions);
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden */
    addEmptyCondition(): void {
        const item = new ExtendedBaseEntity();
        item.value = '';
        this._conditions.push(item);
        this._filterChanged();
    }

    /** @hidden */
    removeCondition(index: number): void {
        this._conditions.splice(index, 1);
        this._initializeConditions();
        this._filterChanged();
        this._changeDetectorRef.markForCheck();
    }

    /** @hidden */
    _validateConditionValue(item: ExtendedIncludedEntity | ExtendedExcludedEntity, valid: boolean | boolean[]): void {
        item.valid = Array.isArray(valid) ? valid.every(Boolean) : !!valid;
        this._filterChanged();
    }

    /** @hidden */
    private _refreshStrategies(): void {
        this._includeStrategy = Object.keys(VhdDefineIncludeStrategy).map((key) => ({
            key,
            type: VhdDefineType.include
        }));
        this._excludeStrategy = Object.keys(VhdDefineExcludeStrategy).map((key) => ({
            key,
            type: VhdDefineType.exclude
        }));
    }

    /** @hidden */
    private _initializeConditions(): void {
        if (this._conditions.length === 0) {
            this.addEmptyCondition();
        }
    }
}

interface StategyItem {
    key: string;
    type: VhdDefineType;
}
