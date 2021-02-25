/** Describes number of columns in grid horizontal dimension */
export const GRID_COLUMNS_NUMBER = 12;

export const CSS_CLASS_NAME = {
    layoutGrid: 'fd-container',
    layoutGridNoHorizontalGap: 'fd-container--no-horizontal-gap',
    layoutGridNoVerticalGap: 'fd-container--no-vertical-gap',
    layoutGridNoGap: 'fd-container--no-gap',

    col: 'fd-col',
    colGrow: 'fd-col--full',

    colSizePrefix: 'fd-col--',
    mdColSizePrefix: 'fd-col-md--',
    lgColSizePrefix: 'fd-col-lg--',
    xlColSizePrefix: 'fd-col-xl--',

    colOffsetPrefix: 'fd-col--offset-',
    mdColOffsetPrefix: 'fd-col-md--offset-',
    lgColOffsetPrefix: 'fd-col-lg--offset-',
    xlColOffsetPrefix: 'fd-col-xl--offset-',

} as const;
