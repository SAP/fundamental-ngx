import { Pipe, PipeTransform } from '@angular/core';
import { SELECTION_COLUMN_WIDTH } from '../constants';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';
import { Nullable } from '@fundamental-ngx/core/shared';

@Pipe({ name: 'selectionCellStyles' })
export class SelectionCellStylesPipe implements PipeTransform {
    transform(
        contentDensity: Nullable<ContentDensityMode>,
        rtl: boolean,
        semanticHighlightingColumnWidth: number
    ): Record<string, string> {
        if (!contentDensity) {
            contentDensity = ContentDensityMode.COZY;
        }
        const rtlKey = rtl ? 'right' : 'left';
        const selectionColumnWidth = SELECTION_COLUMN_WIDTH.get(contentDensity) + 'px';

        return {
            [rtlKey]: semanticHighlightingColumnWidth + 'px',
            'min-width': selectionColumnWidth,
            'max-width': selectionColumnWidth
        };
    }
}
