import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    HostBinding,
    Input,
    Output,
    ViewEncapsulation
} from '@angular/core';

import { ContentDensity, SelectionMode } from './types';

@Component({
    selector: 'fdp-table',
    templateUrl: './table.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent {
    /** Data source for table data. */
    @Input() dataSource: any[];

    /** The content density for which to render table. 'cozy' | 'compact' | 'condensed' */
    @Input() contentDensity: ContentDensity = 'cozy';

    /** Sets selection mode for the table. 'single' | 'multiple' | 'none' */
    @Input() selectionMode: SelectionMode = 'none';

    /** Text displayed when table has no items. */
    @Input() emptyTableMessage: string;

    /** Event fired when table selection has changed. */
    @Output() rowSelectionChange: EventEmitter<any> = new EventEmitter<any>();

    /** @hidden */
    @HostBinding('class.fd-table') fdTable = true;

    /** @hidden */
    @HostBinding('class.fd-table--compact') get isCompact(): boolean { return this.contentDensity === 'compact' };

    /** @hidden */
    @HostBinding('class.fd-table--condensed') get isCondensed(): boolean { return this.contentDensity === 'condensed' };
}
