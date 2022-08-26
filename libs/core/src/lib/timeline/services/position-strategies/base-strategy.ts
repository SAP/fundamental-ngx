import { TimelineNodeComponent } from '../../components/timeline-node/timeline-node.component';
import { TimelineAxis } from '../../types';

export abstract class BaseStrategy {
    /** Offset between nodes lines */
    private readonly SMALL_OFFSET = 14;

    /** Offset between nodes lines with icon */
    private readonly BIG_OFFSET = 30;

    /** Offset for second list in within vertical axis */
    private readonly VERTICAL_TOP_LIST_OFFSET = 24;

    /** Calculate styles for timeline nodes */
    abstract calculateStyles(nodes: TimelineNodeComponent[]): any;

    /** @hidden */
    protected _getOffset(node: TimelineNodeComponent): number {
        return node.glyph ? this.BIG_OFFSET : this.SMALL_OFFSET;
    }

    /** @hidden */
    protected _getTwoListFromOne(nodes: TimelineNodeComponent[]): [TimelineNodeComponent[], TimelineNodeComponent[]] {
        const lastIndexInFirstList = Math.ceil(nodes.length / 2);
        const firstList = nodes.slice(0, lastIndexInFirstList);
        const secondList = nodes.slice(lastIndexInFirstList, nodes.length);
        return [firstList, secondList];
    }

    /** @hidden */
    protected _setStylesForSingleList(nodes: TimelineNodeComponent[], axis: TimelineAxis): void {
        const [offsetProperty, sizeProperty] =
            axis === 'horizontal' ? ['offsetLeft', 'width'] : ['offsetTop', 'height'];

        nodes.forEach((node, index) => {
            const nextNode = nodes[index + 1];
            // Set line size depend on where next node item is started
            if (nextNode) {
                const size =
                    nextNode.el.nativeElement[offsetProperty] -
                    node.el.nativeElement[offsetProperty] -
                    this._getOffset(node);
                node.lineEl.nativeElement.style[sizeProperty] = size + 'px';
            } else {
                // Hide last timeline line in list
                node.lineEl.nativeElement.style.opacity = '0';
            }
        });
    }

    /** @hidden */
    protected _setStylesForDoubleList(nodes: TimelineNodeComponent[], axis: TimelineAxis): void {
        const [firstList, secondList] = this._getTwoListFromOne(nodes);
        const [offsetProp, sizeProp, sizeOffsetProp] =
            axis === 'horizontal' ? ['offsetLeft', 'width', 'offsetWidth'] : ['offsetTop', 'height', 'offsetHeight'];

        // Set styles for second list
        secondList.forEach((node, index) => {
            const el = node.el.nativeElement;
            const parallelNodeEl = firstList[index].el.nativeElement;

            // Handle case when bottom edge of item in second list higher than top edge of next item in first list
            // Actual only for vertical axis because items in horizontal axis have fixed size
            if (axis === 'vertical') {
                secondList[index].el.nativeElement.style.marginTop = `${this.SMALL_OFFSET}px`;
                const prevNode = secondList[index - 1];
                const diffBetween = prevNode
                    ? parallelNodeEl.offsetTop +
                      this.VERTICAL_TOP_LIST_OFFSET -
                      (prevNode.el.nativeElement.offsetTop + prevNode.el.nativeElement.offsetHeight)
                    : -1;
                if (diffBetween > 0) {
                    prevNode.el.nativeElement.style.marginBottom = `${diffBetween}px`;
                }
            }

            // Set line size depend on where next node item is started
            const diff =
                parallelNodeEl[offsetProp] + parallelNodeEl[sizeOffsetProp] - el[offsetProp] - this._getOffset(node);
            node.lineEl.nativeElement.style[sizeProp] = diff + 'px';
        });

        // Set styles for first list
        firstList.forEach((node, index) => {
            const el = node.el.nativeElement;
            const parallelNode = secondList[index];
            // Set line size depend on where next node item is started
            if (parallelNode) {
                const diff = parallelNode.el.nativeElement[offsetProp] - el[offsetProp] - this._getOffset(node);
                node.lineEl.nativeElement.style[sizeProp] = diff + 'px';
            }
        });

        // Hide last timeline line in lists
        const lastNode =
            firstList.length === secondList.length
                ? secondList[secondList.length - 1]
                : firstList[firstList.length - 1];
        lastNode.lineEl.nativeElement.style.opacity = '0';
    }
}
