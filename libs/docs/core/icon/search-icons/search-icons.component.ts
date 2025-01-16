import { AsyncPipe } from '@angular/common';
import { Component, ViewEncapsulation, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { DomSanitizer } from '@angular/platform-browser';
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
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
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
    imports: [
        TableComponent,
        TableColumnComponent,
        TableInitialStateDirective,
        FdpCellDef,
        InfoLabelComponent,
        IconComponent,
        TableToolbarComponent,
        ButtonComponent,
        ContentDensityDirective,
        AvatarComponent,
        SearchHighlightPipe,
        AsyncPipe,
        TableVirtualScrollDirective
    ]
})
export class SearchIconsComponent {
    dataProvider = new IconsDataSourceProvider(availableSapIcons);
    searchTerm = toSignal(this.dataProvider.searchInput$, { requireSync: true });
    source = new TableDataSource<FdIconDocsType>(this.dataProvider);

    private copyService = inject(CopyService);
    private messageStripAlertService = inject(MessageStripAlertService);
    private domSanitizer = inject(DomSanitizer);
    iconType!: FdIconDocsType;

    protected copyTheCode(row: FdIconDocsType) {
        this._copy(`<fd-icon font="${row.font}" glyph="${row.name}" />`);
    }

    protected copyTheName(row: FdIconDocsType) {
        this._copy(row.name);
    }

    protected highlightedInfoLabelHTML(s: string) {
        return this.domSanitizer.bypassSecurityTrustHtml(
            '<span class="highlighted-text fd-info-label__text">' + s + '</span>'
        );
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
            includeMatches: true,
            keys: ['name', 'tags', 'groups'],
            shouldSort: true,
            threshold: 0.5,
            minMatchCharLength: 2
        });
        this.originalData = data;
    }

    fetch(tableState?: TableState): Observable<FdIconDocsType[]> {
        if (!tableState?.searchInput || !tableState.searchInput.text) {
            return of(this.originalData);
        }
        this._searchInput$.next(tableState.searchInput.text);
        return of(
            this.fuse.search(tableState.searchInput.text).map(
                ({ item, matches }) =>
                    ({
                        ...item,
                        searchMatches: (matches || []).reduce((acc, next) => {
                            if (next.refIndex !== undefined) {
                                const existingVals = acc[next.key as string] || {};
                                acc[next.key as string] = {
                                    ...existingVals,
                                    [next.refIndex]: [...(existingVals[next.refIndex] || []), ...next.indices]
                                };
                                return acc;
                            } else {
                                const existingVals = acc[next.key as string] || [];
                                acc[next.key as string] = [...existingVals, ...next.indices];
                            }
                            return acc;
                        }, {})
                    }) as FdIconDocsType
            )
        ).pipe(tap((r) => console.log(r)));
    }
}
