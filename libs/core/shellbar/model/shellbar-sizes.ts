export type ShellbarSizes = 's' | 'm' | 'l' | 'xl';

export type Breakpoints = Record<ShellbarSizes, number>;

export type ShellbarGroup = 'product' | 'search' | 'actions';

export interface NormalizedBreakpoint {
    size: ShellbarSizes;
    min: number;
    max: number;
}

export type ShellbarGroupFlexOptions = Partial<{
    [key in ShellbarGroup]: {
        /**
         * Whether to shrink group.
         */
        shrink?: boolean;
        /**
         * Whether to apply flex-basis: auto style.
         */
        flexBasisAuto?: boolean;
    };
}>;
