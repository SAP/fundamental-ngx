import { get } from '../functions/lodash-utils';

/** @hidden */
interface DfsOptions<T> {
    children: string | ((item: T) => Array<T>);
    shouldVisit: (item: T) => boolean;
    postOrder: boolean;
}

/** @hidden */
const _defaultDfsOptions: DfsOptions<any> = {
    children: 'children',
    shouldVisit: () => true,
    postOrder: true
};

/** @hidden */
function postOrderDfs<T>(): (item: T, callback: (item: T) => void, options: DfsOptions<T>) => void {
    const iterator = (item: T, callback: (item: T) => void, options: DfsOptions<T>): void => {
        if (options.shouldVisit(item)) {
            const children =
                typeof options.children === 'string' ? (get(item, options.children) as T[]) : options.children(item);
            children.forEach((child: T) => iterator(child, callback, options));
            callback(item);
        }
    };
    return iterator;
}

/** @hidden */
function preOrderDfs<T>(): (item: T, callback: (item: T) => void, options: DfsOptions<T>) => void {
    const iterator = (item: T, callback: (item: T) => void, options: DfsOptions<T>): void => {
        if (options.shouldVisit(item)) {
            const children =
                typeof options.children === 'string' ? (get(item, options.children) as T[]) : options.children(item);
            callback(item);
            children.forEach((child: T) => iterator(child, callback, options));
        }
    };
    return iterator;
}

/**
 * Depth-first search algorithm, which traverses a tree/graph/tree-like structure.
 * callback is called for each item in the collection. The order of the callback calls
 * depends on the options. By default, the algorithm is post-order, which means that
 * the callback is called for each item after its children have been visited.
 *
 * @param collection
 * @param callback
 * @param options
 */
export function dfs<T>(collection: Array<T>, callback: (item: T) => void, options: Partial<DfsOptions<T>> = {}): void {
    const mergedOptions = { ..._defaultDfsOptions, ...options } as DfsOptions<T>;
    const iterator = mergedOptions.postOrder ? postOrderDfs<T>() : preOrderDfs<T>();
    for (const item of collection) {
        iterator(item, callback, mergedOptions);
    }
}
