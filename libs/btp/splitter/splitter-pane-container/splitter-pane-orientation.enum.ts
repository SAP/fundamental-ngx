export enum SplitterPaneContainerOrientation {
    vertical = 'vertical',
    horizontal = 'horizontal'
}

export type SplitterPaneContainerOrientationType =
    | keyof typeof SplitterPaneContainerOrientation
    | SplitterPaneContainerOrientation;
