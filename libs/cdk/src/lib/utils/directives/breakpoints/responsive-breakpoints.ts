export const ResponsiveBreakpoints = {
    S: 600,
    M: 1024,
    L: 1440
} as const;

type breakpointName = keyof typeof ResponsiveBreakpoints | 'XL';

export type BreakpointName = Lowercase<breakpointName> | Uppercase<breakpointName>;

/** @hidden */
export function getBreakpointName(width: number): breakpointName {
    if (width < ResponsiveBreakpoints.S) {
        return 'S';
    }
    if (width < ResponsiveBreakpoints.M) {
        return 'M';
    }
    if (width < ResponsiveBreakpoints.L) {
        return 'L';
    }
    return 'XL';
}
