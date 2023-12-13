import { AfterViewInit, ContentChildren, Directive, QueryList } from '@angular/core';
import { SelectItem } from '@fundamental-ngx/platform/shared';
import { Table, TableDataSource, TableState } from '@fundamental-ngx/platform/table';
import { BehaviorSubject, Observable } from 'rxjs';
import { SmartFilterBarFieldDefinition } from '../interfaces/smart-filter-bar-field-definition';
import { SmartFilterBarFieldDefinitionDirective } from './smart-filter-bar-field-definition.directive';

@Directive({
    selector: '[fdpSmartFilterBarSubject], [fdp-smart-filter-bar-subject]',
    exportAs: 'fdp-smart-filter-bar-subject',
    standalone: true
})
export class SmartFilterBarSubjectDirective implements AfterViewInit {
    /** @ignore */
    @ContentChildren(SmartFilterBarFieldDefinitionDirective)
    _fieldDefinitions!: QueryList<SmartFilterBarFieldDefinitionDirective>;

    /** @ignore */
    _fieldDefinitionsSubject = new BehaviorSubject<SmartFilterBarFieldDefinition[]>([]);

    /**
     * Observable of available fields.
     */
    readonly fieldsStream = this._fieldDefinitionsSubject.asObservable();

    /** @ignore */
    constructor(private _subject: Table) {}

    /** @ignore */
    ngAfterViewInit(): void {
        this._fieldDefinitionsSubject.next(this._fieldDefinitions.toArray().map((d) => this._transformSubjectField(d)));
        this._fieldDefinitions.changes.subscribe((definitions: SmartFilterBarFieldDefinitionDirective[]) => {
            this._fieldDefinitionsSubject.next(definitions.map((d) => this._transformSubjectField(d)));
        });
    }

    /**
     * Retrieves data source of the subject.
     * @returns Subject's data source.
     */
    getDataSource(): TableDataSource<any> {
        return this._subject.getDataSource();
    }

    /**
     * Retrieves available fields of the subject.
     * @returns Available fields of the subject.
     */
    getSubjectFields(): SmartFilterBarFieldDefinition[] {
        return this._fieldDefinitions.toArray().map((f) => this._transformSubjectField(f));
    }

    /** Get available field variants */
    getFieldVariants(field: string): Observable<SelectItem[]> {
        return this.getDataSource().dataProvider.getFieldOptions(field);
    }

    /** @ignore */
    getDefaultFields(): string[] {
        return this.getSubjectFields()
            ?.filter((f) => f.defaultSelected)
            .map((f) => f.name);
    }

    /** Get subject state */
    getState(): TableState {
        return this._subject.getTableState();
    }

    /**
     * @returns Subject component.
     */
    getSubject(): Table {
        return this._subject;
    }

    /** @ignore */
    private _transformSubjectField(column: SmartFilterBarFieldDefinitionDirective): SmartFilterBarFieldDefinition {
        return {
            key: column.key,
            name: column.name,
            label: column.label,
            filterType: column.filterType,
            filterable: column.smartFilterBarFilterable,
            dataType: column.dataType,
            required: column.required,
            customFilterType: column.customFilterType,
            defaultSelected: column.defaultSelected,
            hasOptions: column.hasOptions,
            conditionStrategy: column.conditionStrategy
        };
    }
}
