import { ApprovalGraphNode, ApprovalGraphNodeMetadata, ApprovalNode, ApprovalStatus } from './interfaces';

import {
    getBlankApprovalGraphNode,
    getGraphNodes,
    getParentNodes,
    getSpaceApprovalGraphNode,
    isNodeApproved,
    isNodeStarted,
    isNodeTargetsIncludeId
} from './helpers';

export interface ApprovalFlowGraph {
    columns: ApprovalGraphColumn[];
    errors?: boolean;
}

export interface ApprovalGraphColumn {
    nodes: ApprovalGraphNode[];
    index?: number;
    allNodesApproved?: boolean;
}

export interface ApprovalGraphMetadata {
    [key: string]: ApprovalGraphNodeMetadata;
}

/** Algorithm in short:
 * 1. Find all possible paths (longest path length = amount of the columns in the graph)
 * 2. Trim paths (remove blank nodes at the end of the paths)
 * 3. Make all paths the same length (= longest path length) to make every unique node be present at the same index across all paths
 * 4. Sort paths by their likeness between each other to avoid paths crossing
 * 5. Remove "duplicate" nodes in paths (make every unique node be present only once across all paths)
 * 6. Remove empty paths
 * 7. Transform paths into the columns
 * 8. Trim columns (remove space nodes at the end of columns)
 * 9. Remove columns which contain only blank and empty nodes
 * 10. Transform columns into the graph columns
 */
export function generateApprovalFlowGraph(nodes: ApprovalGraphNode[]): ApprovalFlowGraph {
    const graph: ApprovalFlowGraph = { columns: [], errors: false };

    if (!nodes.length) {
        return graph;
    }

    const rootNodes = findRootNodes(nodes);
    const finalNodes = findFinalNodes(nodes);

    if (!rootNodes.length || !finalNodes.length) {
        console.warn(`Err: Not possible to build graph because root or final nodes aren't present!`);
        graph.errors = true;
        return graph;
    }

    const paths = getPaths(rootNodes, nodes);

    if (!paths.length) {
        console.warn('Err: Not possible to build graph!');
        graph.errors = true;
        return graph;
    }

    const trimmedPaths = trimPaths(paths);
    const sameLengthPaths = makePathsSameLength(trimmedPaths);
    const pathsBySimilarity = sortPaths(sameLengthPaths);
    const pathsWithUniqueNodes = removeDuplicateNodes(pathsBySimilarity);
    const notEmptyPaths = removeEmptyPaths(pathsWithUniqueNodes);
    const columns = getColumnsFromPaths(notEmptyPaths);
    const trimmedColumns = trimColumns(columns);
    const notEmptyColumns = removeEmptyColumns(trimmedColumns);
    graph.columns = getGraphColumnsFromPaths(notEmptyColumns);

    return graph;
}

/** Generate graph metadata */
export function generateApprovalFlowGraphMetadata(graph: ApprovalFlowGraph): ApprovalGraphMetadata {
    const nodes = getGraphNodes(graph);
    const metadata: ApprovalGraphMetadata = {};

    graph.columns.forEach((column, columnIndex) => {
        column.nodes.forEach((node, nodeIndex) => {
            const parents = getParentNodes(node, nodes);
            const parentsApproved = parents.length ? parents.every((_node) => isNodeApproved(_node)) : false;
            const isRoot = !parents.length && !node.space;
            const isFinal = !node.targets.length && !node.space;
            const parallelEnd = parents.length > 1;
            const firstOfMultipleRootNodes = columnIndex === 0 && column.nodes.length > 1 && nodeIndex === 0;
            const firstOfMultipleFinalNodes =
                columnIndex === graph.columns.length - 1 && column.nodes.length > 1 && nodeIndex === 0;

            metadata[node.id] = {
                parents,
                isRoot,
                isFinal,
                parallelStart: node.targets.length > 1,
                parallelEnd,
                columnIndex,
                nodeIndex,
                canAddNodeBefore: !isNodeStarted(node) && !parentsApproved,
                canAddNodeBeforeAll: isRoot && firstOfMultipleRootNodes,
                canAddNodeAfter: !isNodeApproved(node),
                canAddNodeAfterAll:
                    !isNodeApproved(node) && ((isFinal && firstOfMultipleFinalNodes) || (parallelEnd && node.blank)),
                canAddParallel: !isNodeApproved(node),
                isVerticalLineBeforeSolid: node.space && graph.columns[columnIndex - 1]?.allNodesApproved,
                isVerticalLineAfterSolid: node.space && column.allNodesApproved,
                firstOfMultipleRootNodes,
                firstOfMultipleFinalNodes,
                rootNodesApproved: columnIndex === 0 && column.allNodesApproved
            };
        });
    });

    /* Some flags can be calculated only on the second run, when all nodes already have base metadata */
    graph.columns.forEach((column) => {
        column.nodes.forEach((node, nodeIndex) => {
            const nodeMetadata = metadata[node.id];

            nodeMetadata.isLastInParallel = metadata[node.targets[0]]?.parallelEnd;
            nodeMetadata.isFirstInParallel = metadata[nodeMetadata.parents[0]?.id]?.parallelStart;

            const columnIndex = column.index;
            const graphPrevColumn = columnIndex ? graph.columns[columnIndex - 1] : undefined;
            const graphNextColumn = columnIndex ? graph.columns[columnIndex + 1] : undefined;

            const prevHNode = graphPrevColumn?.nodes[nodeIndex];
            const nextHNode = graphNextColumn?.nodes[nodeIndex];

            nodeMetadata.renderAddNodeAfterButton =
                nodeMetadata.canAddNodeAfter &&
                (nodeMetadata.isFinal ||
                    nodeMetadata.parallelStart ||
                    nodeMetadata.isLastInParallel ||
                    nextHNode?.blank);

            const nextColumnNodes = graphNextColumn?.nodes;
            if (nodeMetadata.parallelStart && nextColumnNodes) {
                const children = nextColumnNodes.filter((_node) => node.targets.includes(_node.id));
                const firstChildIndex = nextColumnNodes.findIndex((_node) => _node.id === children[0].id);
                const lastChildIndex = nextColumnNodes.findIndex(
                    (_node) => _node.id === children[children.length - 1].id
                );

                for (let i = firstChildIndex + 1; i <= lastChildIndex; i++) {
                    metadata[nextColumnNodes[i].id].renderVerticalLineBefore = true;
                }
            }

            const prevColumnNodes = graphPrevColumn?.nodes;
            if (nodeMetadata.parallelEnd && prevColumnNodes) {
                const firstParentIndex = prevColumnNodes.findIndex((_node) => _node.id === nodeMetadata.parents[0].id);
                const lastParentIndex = prevColumnNodes.findIndex(
                    (_node) => _node.id === nodeMetadata.parents[nodeMetadata.parents.length - 1].id
                );

                for (let i = firstParentIndex + 1; i <= lastParentIndex; i++) {
                    metadata[prevColumnNodes[i].id].renderVerticalLineAfter = true;
                }
            }

            nodeMetadata.renderVerticalLineBefore = !nodeMetadata.renderVerticalLineBefore
                ? nodeIndex > 0 && !prevHNode
                : true;
            nodeMetadata.renderVerticalLineAfter = !nodeMetadata.renderVerticalLineAfter
                ? nodeIndex > 0 && !nextHNode
                : true;
        });
    });

    return metadata;
}

function findRootNodes(nodes: ApprovalNode[]): ApprovalNode[] {
    return nodes.filter((node) => nodes.every((n) => !isNodeTargetsIncludeId(n, node.id)));
}

function findFinalNodes(nodes: ApprovalNode[]): ApprovalNode[] {
    return nodes.filter((node) => !node.targets.length);
}

/** Find all possible paths (longest path length = amount of the columns in the graph) */
function getPaths(rootNodes: ApprovalGraphNode[], nodes: ApprovalGraphNode[]): ApprovalGraphNode[][] {
    const paths: ApprovalGraphNode[][] = [];
    const queue: ApprovalGraphNode[][] = [];

    for (let i = 0; i < rootNodes.length; i++) {
        queue.push([rootNodes[i]]);

        while (queue.length) {
            const path = queue.pop();
            let lastNodeInPath: ApprovalGraphNode | undefined;
            if (path) {
                lastNodeInPath = path[path.length - 1];
            }

            /** Indicates about an error */
            if (!lastNodeInPath) {
                return [];
            }

            if (!lastNodeInPath.targets.length) {
                paths.push(path!);
            } else {
                lastNodeInPath.targets.forEach((targetId) => {
                    const targetNode = nodes.find((node) => node.id === targetId);
                    if (!targetNode) {
                        return;
                    }
                    const newPath = [...path!, targetNode];

                    queue.push(newPath);
                });
            }
        }
    }

    return paths;
}

/** Trim paths (remove blank nodes at the end of the paths) */
function trimPaths(paths: ApprovalGraphNode[][]): ApprovalGraphNode[][] {
    const processedPaths: ApprovalGraphNode[][] = [];

    paths.forEach((path) => {
        let indexToSlice = path.length - 1;

        for (let i = path.length - 1; i > 0; --i) {
            if (path[i].blank) {
                indexToSlice = i - 1;
            } else {
                break;
            }
        }

        path[indexToSlice].targets = [];
        processedPaths.push(path.slice(0, indexToSlice + 1));
    });

    return processedPaths;
}

/** Make all paths the same length (= longest path length) to make every unique node be present at the same index across all paths */
function makePathsSameLength(paths: ApprovalGraphNode[][]): ApprovalGraphNode[][] {
    const processedPaths: ApprovalGraphNode[][] = [];
    const pathLengths = paths.map((path) => path.length);
    const longestPathLength = Math.max(...pathLengths);

    paths.forEach((path) => {
        if (path.length === longestPathLength) {
            processedPaths.push(path);
            return;
        }

        path.forEach((node, nodeIndex) => {
            /** Try to get blank nodes from already processed paths as paths may be the same within some part */
            let blankNodes = getBlankNodesAfterNode(node, processedPaths);
            if (blankNodes.length && blankNodes[0].id !== path[nodeIndex + 1]?.id) {
                path.splice(nodeIndex + 1, 0, ...blankNodes);
                return;
            }

            const nodeIndexInPaths = paths.map((_path) => _path.indexOf(node));
            const mostFarNodeIndexInPaths = Math.max(...nodeIndexInPaths);

            if (nodeIndex < mostFarNodeIndexInPaths) {
                blankNodes = getBlankNodes(mostFarNodeIndexInPaths - nodeIndex, path[nodeIndex - 1].status);

                blankNodes[blankNodes.length - 1].targets = [node.id];
                path[nodeIndex - 1].targets = [blankNodes[0].id];

                path.splice(nodeIndex, 0, ...blankNodes);
                return;
            }

            if (nodeIndex === mostFarNodeIndexInPaths && nodeIndex === path.length - 1) {
                blankNodes = getBlankNodes(longestPathLength - path.length, path[nodeIndex].status);

                path[nodeIndex].targets = [blankNodes[0].id];

                path.splice(nodeIndex + 1, 0, ...blankNodes);
                return;
            }
        });

        processedPaths.push(path);
    });

    return processedPaths;
}

/** Try to get blank nodes from already processed paths as paths may be the same within some part */
function getBlankNodesAfterNode(node: ApprovalGraphNode, paths: ApprovalGraphNode[][]): ApprovalGraphNode[] {
    const blankNodes: ApprovalGraphNode[] = [];

    const pathWithBlankNodeAfter = paths.find((path) => {
        const nodeIndex = path.indexOf(node);
        return nodeIndex > -1 && path[nodeIndex + 1]?.blank;
    });

    if (pathWithBlankNodeAfter) {
        const nodeIndex = pathWithBlankNodeAfter.indexOf(node) + 1;
        const nextNotBlankNodeIndex = pathWithBlankNodeAfter.findIndex(
            (_node, _index) => _index > nodeIndex && !_node.blank
        );

        blankNodes.push(
            ...pathWithBlankNodeAfter.slice(nodeIndex, nextNotBlankNodeIndex > 0 ? nextNotBlankNodeIndex : undefined)
        );
    }

    return blankNodes;
}

/** Generate blank nodes sequential */
function getBlankNodes(count: number, status: ApprovalStatus): ApprovalGraphNode[] {
    const nodes: ApprovalGraphNode[] = [];

    let node: ApprovalGraphNode;
    let nodeId: string | undefined;

    for (let i = count; i > 0; i--) {
        node = Object.assign({}, getBlankApprovalGraphNode(), { targets: nodeId ? [nodeId] : [], status });
        nodeId = node.id;

        nodes.unshift(node);
    }

    return nodes;
}

/** Sort paths by their likeness (= count of the same nodes relatively to the other paths) between each other to avoid paths crossing */
function sortPaths(paths: ApprovalGraphNode[][]): ApprovalGraphNode[][] {
    if (paths.length === 1) {
        return paths;
    }

    /** [pathIndex, relativeToPathIndex, sameNodesCount][] */
    let similarities: number[][] = [];
    let pathSimilarity = 0;

    paths.forEach((path, index) => {
        for (let i = 0; i < paths.length; i++) {
            if (index !== i && !similarities.some((likely) => index === likely[1] && i === likely[0])) {
                pathSimilarity = 0;

                for (let j = 0; j < path.length; j++) {
                    if (path[j].id === paths[i][j].id) {
                        pathSimilarity++;
                    }
                }

                similarities.push([index, i, pathSimilarity]);
            }
        }
    });

    similarities = similarities.sort((a, b) => (a[2] > b[2] ? -1 : 1));

    const usedPathIndexes: number[] = [];
    const processedPaths: ApprovalGraphNode[][] = [];

    similarities.forEach((similarity) => {
        if (!usedPathIndexes.some((i) => i === similarity[0])) {
            processedPaths.push(paths[similarity[0]]);
            usedPathIndexes.push(similarity[0]);
        }

        if (!usedPathIndexes.some((i) => i === similarity[1])) {
            processedPaths.push(paths[similarity[1]]);
            usedPathIndexes.push(similarity[1]);
        }
    });

    return processedPaths;
}

/** Remove "duplicate" nodes in paths (make every unique node be present only once across all paths) */
function removeDuplicateNodes(paths: ApprovalGraphNode[][]): ApprovalGraphNode[][] {
    const processedPaths: ApprovalGraphNode[][] = [];

    paths.forEach((path, index) => {
        path.forEach((node) => {
            paths.forEach((_path, _index) => {
                const isNodeInPath = _index !== index && _path.indexOf(node) > -1;

                if (isNodeInPath) {
                    /** Instead of node place space node */
                    _path.splice(_path.indexOf(node), 1, getSpaceApprovalGraphNode());
                }
            });
        });

        processedPaths.push(path);
    });

    return processedPaths;
}

/** Remove empty paths (which contains only empty nodes) */
function removeEmptyPaths(paths: ApprovalGraphNode[][]): ApprovalGraphNode[][] {
    return paths.reduce((acc, path) => {
        if (!path.every((node) => node.space)) {
            acc.push(path);
        }

        return acc;
    }, [] as ApprovalGraphNode[][]);
}

/** Transform paths into the columns (it's possible as they're all the same length) */
function getColumnsFromPaths(paths: ApprovalGraphNode[][]): ApprovalGraphNode[][] {
    const columns: ApprovalGraphNode[][] = [];
    let column: ApprovalGraphNode[] = [];

    for (let i = 0; i < paths[0].length; i++) {
        column = [];

        for (let v = 0; v < paths.length; v++) {
            column.push(paths[v][i]);
        }

        columns.push(column);
    }

    return columns;
}

/** Trim space nodes at the end of the columns. */
function trimColumns(columns: ApprovalGraphNode[][]): ApprovalGraphNode[][] {
    const processedColumns: ApprovalGraphNode[][] = [];

    columns.forEach((column) => {
        let lastNotSpaceNodeIndex;

        for (let i = column.length - 1; i >= 0; i--) {
            if (!column[i].space) {
                lastNotSpaceNodeIndex = i;
                break;
            }
        }

        if (lastNotSpaceNodeIndex < column.length) {
            processedColumns.push(column.slice(0, lastNotSpaceNodeIndex + 1));
        } else {
            processedColumns.push(column);
        }
    });

    return processedColumns;
}

/** Remove empty columns (where every node is a blank node)  */
function removeEmptyColumns(columns: ApprovalGraphNode[][]): ApprovalGraphNode[][] {
    const processedColumns: ApprovalGraphNode[][] = [];

    columns.forEach((column) => {
        const areAllNodesEmpty = column.every((node) => node.blank || node.space);

        if (areAllNodesEmpty) {
            column.forEach((node) => {
                if (node.blank) {
                    /** Connect previous column to the next column, omitting current column. */
                    replaceTargets(node.id, node.targets, columns);
                }
            });
        } else {
            processedColumns.push(column);
        }
    });

    return processedColumns;
}

function replaceTargets(replaceId: string, replaceWithId: string[], columns: ApprovalGraphNode[][]): void {
    columns.forEach((column) => {
        column.forEach((n) => {
            if (isNodeTargetsIncludeId(n, replaceId)) {
                n.targets = n.targets.filter((_id) => _id !== replaceId);
                n.targets.push(...replaceWithId);
            }
        });
    });
}

/** Transform columns into the graph columns (with additional metadata). */
function getGraphColumnsFromPaths(columns: ApprovalGraphNode[][]): ApprovalGraphColumn[] {
    const graphColumns: ApprovalGraphColumn[] = [];

    columns.forEach((column, index) => {
        column.forEach((node) => (node.colIndex = index));

        graphColumns.push({
            nodes: column,
            index,
            allNodesApproved: column.every((node) => isNodeApproved(node))
        });
    });

    return graphColumns;
}
