import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';

export type ContainerFlexDirection = 'row' | 'row-reverse' | 'column' | 'column-reverse';

export type ContainerFlexJustify =
    | 'start'
    | 'center'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch';

export type ContainerFlexAlign =
    | 'start'
    | 'center'
    | 'end'
    | 'flex-start'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | 'stretch'
    | 'self-start'
    | 'self-end'
    | 'baseline';

@Component({
    selector: 'fd-facet-container',
    template: ` <ng-content></ng-content> `,
    styleUrl: './facet-container.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
    host: {
        '[class.fd-facet-container]': 'true',
        '[style.gap.rem]': 'flexGap()',
        '[style.flex-direction]': 'flexDirection()',
        '[style.align-items]': 'alignItems()',
        '[style.justify-content]': 'justifyContent()'
    },
    standalone: true
})
export class FacetContainerComponent {
    /**
     * Value for the direction of the flex container.
     * Possible values: 'row' | 'row-reverse' | 'column' | 'column-reverse'
     * Default: 'column'
     */
    flexDirection = input<ContainerFlexDirection>('column');

    /**
     * Value for align-items of the flex container.
     * Possible values:
     * 'start', 'center', 'end', 'flex-start', 'flex-end', 'space-between', 'space-around',
     * 'space-evenly', 'stretch', 'self-start', 'self-end', 'baseline'
     * Default: 'start'
     */
    alignItems = input<ContainerFlexJustify>('start');

    /**
     * Value for justify-content of the flex container.
     * Possible values:
     * 'start', 'center', 'end', 'flex-start', 'flex-end', 'space-between', 'space-around',
     * 'space-evenly', 'stretch'
     * Default: 'start'
     */
    justifyContent = input<ContainerFlexAlign>('start');

    /**
     * Value for the flex container gap in rem.
     * An integer number
     * Default: 1
     */
    flexGap = input(1);
}
