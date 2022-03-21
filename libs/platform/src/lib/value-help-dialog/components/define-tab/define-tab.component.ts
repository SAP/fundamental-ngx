import {
    ChangeDetectionStrategy,
    Component,
    ViewEncapsulation,
    Input,
    SimpleChanges,
    OnChanges,
    Output,
    EventEmitter,
    AfterViewInit
} from '@angular/core';

import { ContentDensity } from '@fundamental-ngx/core/utils';

import {
    VhdIncludedEntity,
    VhdExcludedEntity,
    BaseEntity,
    VhdDefineIncludeStrategy,
    VhdDefineExcludeStrategy,
    VhdDefineType
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
    protected defaultId = `fd-title-id-${titleUniqueId++}`;
    protected defaultSelectId = `fd-select-title-id-${titleUniqueId++}`;

    /** title id for the table  */
    @Input()
    titleId: string = this.defaultId;

    /** seelcted value id for the table  */
    @Input()
    selectedId: string = this.defaultSelectId;

    @Input()
    conditions: ExtendedBaseEntity[] = [];

    /** depricated */
    @Input()
    included: ExtendedIncludedEntity[] = [];

    /** depricated */
    @Input()
    excluded: ExtendedExcludedEntity[] = [];

    /** The content density for which to render value help dialog */
    @Input()
    contentDensity: ContentDensity;

    @Output()
    includeChange: EventEmitter<ExtendedIncludedEntity[]> = new EventEmitter<ExtendedIncludedEntity[]>();

    @Output()
    excludeChange: EventEmitter<ExtendedExcludedEntity[]> = new EventEmitter<ExtendedExcludedEntity[]>();

    @Output()
    conditionChange: EventEmitter<BaseEntity[]> = new EventEmitter<BaseEntity[]>();

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
