import { ColumnLayout, ColumnLayoutGridClass } from '@fundamental-ngx/platform/shared';

export function normalizeColumnLayout(layout: ColumnLayout, defaultColumn = 12): ColumnLayout {
    layout['S'] = layout['S'] !== undefined ? layout['S'] : defaultColumn;
    layout['M'] = layout['M'] || layout['S'];
    layout['L'] = layout['L'] || layout['M'];
    layout['XL'] = layout['XL'] || layout['L'];

    return layout;
}

export function generateColumnClass(layout: ColumnLayout): string {
    return Object.entries(layout)
        .reduce((overall, value) => {
            overall.push(`fd-col-${ColumnLayoutGridClass[value[0]]}--${value[1]}`);
            return overall;
        }, [])
        .join(' ');
}
