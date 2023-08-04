/* eslint-disable @typescript-eslint/member-ordering */
import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
    AfterViewInit,
    SimpleChanges,
    ViewEncapsulation
} from '@angular/core';

import {
    BaseEntity,
    VhdDefineExcludeStrategy,
    VhdDefineIncludeStrategy,
    VhdDefineType,
    VhdExcludedEntity,
    VhdIncludedEntity
} from '../../models';
import { MAX_CHARACTER_HINT_COUNT } from '../../constans';
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
    styleUrls: ['./define-tab.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
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

    /** @deprecated */
    @Input()
    set included(value: ExtendedIncludedEntity[]) {
        console.warn('Property included is deprecated. ');
        this._included = value;
    }

    get included(): ExtendedIncludedEntity[] {
        return this._included;
    }

    /** @deprecated */
    @Input()
    set excluded(value: ExtendedExcludedEntity[]) {
        console.warn('Property excluded is deprecated. ');
        this._excluded = value;
    }

    get excluded(): ExtendedExcludedEntity[] {
        return this._excluded;
    }

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
    private _included: ExtendedIncludedEntity[] = [];

    /** @hidden */
    private _excluded: ExtendedExcludedEntity[] = [];

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
