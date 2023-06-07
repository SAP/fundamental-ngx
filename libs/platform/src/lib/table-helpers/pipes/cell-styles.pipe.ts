import { Pipe, PipeTransform } from '@angular/core';
import { TableColumn } from '../table-column';
import { ColumnAlign } from '../enums/column-align.enum';

@Pipe({ name: 'tableCellStyles', standalone: true })
export class TableCellStylesPipe implements PipeTransform {
    /** @hidden */
    transform(
        column: TableColumn,
        isRtl: boolean,
        semanticHighlightingColumnWidth: number | null,
        selectionColumnWidth: number | null,
        isFrozenColumn: boolean,
        isFrozenEndColumn: boolean,
        prevColumnWidthPx: number | null,
        columnWidth: string,
        nextColumnWidthPx: number | null
    ): Record<string, number | string> {
        const styles: { [property: string]: number | string } = {};

        if (isFrozenColumn) {
            const key = isRtl ? 'right.px' : 'left.px';
            styles[key] =
                (semanticHighlightingColumnWidth || 0) + (selectionColumnWidth || 0) + (prevColumnWidthPx || 0);
        }

        if (isFrozenEndColumn) {
            const key = isRtl ? 'left.px' : 'right.px';
            styles[key] = (nextColumnWidthPx || 0).toString();
        }

        styles['min-width'] = columnWidth;
        styles['max-width'] = columnWidth;
        styles['width'] = columnWidth;

        // The "start" value does align left when you are using a LTR browser.
        // In RTL browsers, the "start" value aligns right.
        // Since we want to dynamically apply alignment only depending on the service value, we are using "left"/"right" as values instead
        switch (column.align) {
            case ColumnAlign.START:
                styles['text-align'] = isRtl ? 'right' : 'left';
                break;
            case ColumnAlign.END:
                styles['text-align'] = isRtl ? 'left' : 'right';
                break;
            default:
                styles['text-align'] = 'center';
                break;
        }

        return styles;
    }
}
