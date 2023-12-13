import { Pipe, PipeTransform } from '@angular/core';
import { Nullable } from '@fundamental-ngx/cdk/utils';
import { ContentDensityMode } from '@fundamental-ngx/core/content-density';
import { SELECTION_COLUMN_WIDTH } from '../constants';

@Pipe({ name: 'selectionCellStyles', standalone: true })
export class SelectionCellStylesPipe implements PipeTransform {
    /** @ignore */
    transform(
        contentDensity: Nullable<ContentDensityMode>,
        rtl: boolean,
        semanticHighlightingColumnWidth: number | null
    ): Record<string, string> {
        if (!contentDensity) {
            contentDensity = ContentDensityMode.COZY;
        }
        const rtlKey = rtl ? 'right' : 'left';
        const selectionColumnWidth = SELECTION_COLUMN_WIDTH.get(contentDensity) + 'px';

        return {
            [rtlKey]: (semanticHighlightingColumnWidth || 0) + 'px',
            'min-width': selectionColumnWidth,
            'max-width': selectionColumnWidth
        };
    }
}
