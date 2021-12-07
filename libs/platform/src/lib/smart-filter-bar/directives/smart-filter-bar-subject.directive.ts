import { AfterViewInit, ContentChildren, Directive, QueryList } from '@angular/core';
import { SelectItem } from '@fundamental-ngx/platform/shared';
import { Table, TableDataSource, TableState } from '@fundamental-ngx/platform/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { SmartFilterBarFieldDefinition } from '../interfaces/smart-filter-bar-field-definition';
import { SmartFilterBarFieldDefinitionDirective } from './smart-filter-bar-field-definition.directive';

@Directive({
    selector: '[fdpSmartFilterBarSubject], [fdp-smart-filter-bar-subject]',
    exportAs: 'fdp-smart-filter-bar-subject'
})
export class SmartFilterBarSubjectDirective implements AfterViewInit {
    /** @hidden */
    @ContentChildren(SmartFilterBarFieldDefinitionDirective)
    _fieldDefinitions: QueryList<SmartFilterBarFieldDefinitionDirective>;

    /** @hidden */
    _fieldDefinitionsSubject: BehaviorSubject<SmartFilterBarFieldDefinition[]> = new BehaviorSubject([]);

    columnsStream = this._fieldDefinitionsSubject.asObservable();

    /** @hidden */
    constructor(private _subject: Table) {}

    /** @hidden */
    ngAfterViewInit(): void {
        this._fieldDefinitionsSubject.next(this._fieldDefinitions.toArray().map((d) => this._transformSubjectField(d)));
        this._fieldDefinitions.changes.subscribe((definitions: SmartFilterBarFieldDefinitionDirective[]) => {
            this._fieldDefinitionsSubject.next(definitions.map((d) => this._transformSubjectField(d)));
        });
    }

    getDataSource(): TableDataSource<any> {
        return this._subject.getDataSource();
    }

    getSubjectFields(): SmartFilterBarFieldDefinition[] {
        return this._fieldDefinitions.toArray().map((f) => this._transformSubjectField(f));
    }

    /** @hidden */
    _transformSubjectField(column: SmartFilterBarFieldDefinitionDirective): SmartFilterBarFieldDefinition {
        return {
            key: column.key,
            label: column.label,
            filterType: column.filterType,
            filterable: column.filterable || false,
            dataType: column.dataType,
            mandatoryFilter: column.mandatoryFilter || false,
            customFilterType: column.customFilterType
        };
    }

    /** Get available field variants */
    getFieldVariants(column: string): Observable<SelectItem[]> {
        return this._subject.getColumnVariants(column);
    }

    /** Get subject state */
    getState(): TableState {
        return this._subject.getTableState();
    }
}
