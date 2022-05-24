import { Pipe, PipeTransform } from '@angular/core';
import { ContentDensity } from '@fundamental-ngx/core/utils';
import { SELECTION_COLUMN_WIDTH } from '../constants';

@Pipe({ name: 'selectionCellStyles' })
export class SelectionCellStylesPipe implements PipeTransform {
    transform(
        contentDensity: ContentDensity,
        rtl: boolean,
        semanticHighlightingColumnWidth: number
    ): Record<string, string> {
        const rtlKey = rtl ? 'right' : 'left';
        const selectionColumnWidth = SELECTION_COLUMN_WIDTH.get(contentDensity) + 'px';

        return {
            [rtlKey]: semanticHighlightingColumnWidth + 'px',
            'min-width': selectionColumnWidth,
            'max-width': selectionColumnWidth
        };
    }
}
