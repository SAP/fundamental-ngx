import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SearchHighlightPipe } from '@fundamental-ngx/cdk/utils';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { ButtonComponent } from '@fundamental-ngx/core/button';
import { ContentDensityDirective } from '@fundamental-ngx/core/content-density';
import { IconComponent } from '@fundamental-ngx/core/icon';
import { InfoLabelComponent } from '@fundamental-ngx/core/info-label';
import { MessageStripAlertService } from '@fundamental-ngx/core/message-strip';
import { CopyService } from '@fundamental-ngx/docs/shared';
import {
    FdpCellDef,
    TableColumnComponent,
    TableComponent,
    TableDataProvider,
    TableDataSource,
    TableInitialStateDirective,
    TableState,
    TableToolbarComponent,
    TableVirtualScrollDirective
} from '@fundamental-ngx/platform/table';
import Fuse from 'fuse.js';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { FdIconDocsType, availableSapIcons } from './available-sap-icons';

@Component({
    templateUrl: './search-icons.component.html',
    styles: [
        `
            .highlighted-text strong {
                background-color: var(--sapButton_Emphasized_Active_Background);
                color: var(--sapButton_Emphasized_Active_TextColor);
            }
        `
    ],
    encapsulation: ViewEncapsulation.None,
    standalone: true,
    imports: [
        TableComponent,
        TableColumnComponent,
        TableInitialStateDirective,
        FdpCellDef,
        NgForOf,
        InfoLabelComponent,
        IconComponent,
        TableToolbarComponent,
        ButtonComponent,
        ContentDensityDirective,
        AvatarComponent,
        SearchHighlightPipe,
        AsyncPipe,
        NgIf,
        TableVirtualScrollDirective
    ]
})
export class SearchIconsComponent {
    dataProvider = new IconsDataSourceProvider(availableSapIcons);
    searchTerm = toSignal(this.dataProvider.searchInput$, { requireSync: true });
    source = new TableDataSource<FdIconDocsType>(this.dataProvider);

    private copyService = inject(CopyService);
    private messageStripAlertService = inject(MessageStripAlertService);

    copyTheCode(row: FdIconDocsType) {
        this._copy(`<fd-icon font="${row.font}" glyph="${row.name}" />`);
    }

    copyTheName(row: FdIconDocsType) {
        this._copy(row.name);
    }

    private _copy(text: string) {
        this.copyService.copyText(text);
        this.messageStripAlertService.open({
            content: `\`${text}\` copied!`,
            messageStrip: {
                dismissible: true,
                type: 'success',
                duration: 5000,
                mousePersist: true
            }
        });
    }
}

class IconsDataSourceProvider extends TableDataProvider<FdIconDocsType> {
    fuse: Fuse<any>;
    originalData: FdIconDocsType[];
    private _searchInput$ = new BehaviorSubject('');
    searchInput$ = this._searchInput$.asObservable();

    constructor(data: FdIconDocsType[]) {
        super();
        this.fuse = new Fuse<FdIconDocsType>(data, {
            keys: ['name', 'searchField'],
            shouldSort: true,
            threshold: 0.5,
            minMatchCharLength: 3
        });
        this.originalData = data;
    }

    fetch(tableState?: TableState): Observable<FdIconDocsType[]> {
        if (!tableState?.searchInput || !tableState.searchInput.text) {
            return of(this.originalData);
        }
        this._searchInput$.next(tableState.searchInput.text);
        return of(this.fuse.search(tableState.searchInput.text).map(({ item }) => item));
    }
}
