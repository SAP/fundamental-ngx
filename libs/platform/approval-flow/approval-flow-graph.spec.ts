import { ApprovalFlowGraph, generateApprovalFlowGraph } from './approval-flow-graph';
import { ApprovalNode } from './interfaces';

/**
 * Tests for the fix in `makePathsSameLength` when the approval flow contains
 * multiple parallel blocks within a serial flow (PR #14228).
 *
 * Root cause: forEach fails to iterate over newly added elements when
 * paths are mutated via splice during iteration. The fix replaces forEach
 * with a classic for loop + break.
 */
describe('approval-flow-graph: makePathsSameLength (multiple parallel blocks)', () => {
    /**
     * Builds the exact node list from PR #14228.
     *
     * Two root nodes each fan out into parallel branches that converge on
     * shared leaf nodes:
     *
     *   Kz1 → { Kz7, K0B → K0E }
     *   Kz+ → Kz4 → { Kz7, K0B → K0E }
     *
     * This produces 4 raw paths of lengths 3, 2, 4, 3 — the shape that
     * triggered the forEach index-drift bug.
     */
    const buildPRNodes = (): ApprovalNode[] => [
        {
            id: 'AAAAAFjK!Kz1',
            name: 'A/P - Expenses',
            description: '',
            approvers: [{ id: 'A/P - Expenses', teamId: 'A/P - Expenses', name: 'A/P - Expenses', description: 'Team User', imgUrl: '' }],
            status: 'Pending',
            targets: ['AAAAAFjK!Kz7', 'AAAAAFjK!K0B'],
            isEveryoneApprovalNeeded: true,
            disableActions: false,
            actionsConfig: { disableAddBefore: false, disableAddAfter: false, disableAddParallel: false, disableEdit: true, disableRemove: true }
        },
        {
            id: 'AAAAAFjK!Kz7',
            name: 'Category Buyer',
            description: '',
            approvers: [{ id: 'Category Buyer', teamId: 'Category Buyer', name: 'Category Buyer', description: 'Team User', imgUrl: '' }],
            status: 'Pending',
            targets: [],
            isEveryoneApprovalNeeded: true,
            disableActions: false,
            actionsConfig: { disableAddBefore: false, disableAddAfter: false, disableAddParallel: true, disableEdit: true, disableRemove: true }
        },
        {
            id: 'AAAAAFjK!K0B',
            name: 'Category Attribute Admin',
            description: '',
            approvers: [{ id: 'CategoryAttributeAdmin', teamId: 'CategoryAttributeAdmin', name: 'Category Attribute Admin', description: 'Team User', imgUrl: '' }],
            status: 'Pending',
            targets: ['AAAAAFjK!K0E'],
            isEveryoneApprovalNeeded: true,
            disableActions: false,
            actionsConfig: { disableAddBefore: false, disableAddAfter: false, disableAddParallel: true, disableEdit: true, disableRemove: true }
        },
        {
            id: 'AAAAAFjK!K0E',
            name: 'Development',
            description: '',
            approvers: [{ id: 'Development', teamId: 'Development', name: 'Development', description: 'Team User', imgUrl: '' }],
            status: 'Pending',
            targets: [],
            isEveryoneApprovalNeeded: true,
            disableActions: false,
            actionsConfig: { disableAddBefore: false, disableAddAfter: false, disableAddParallel: true, disableEdit: true, disableRemove: true }
        },
        {
            id: 'AAAAAFjK!Kz+',
            name: 'A/P - Supplier Payment',
            description: '',
            approvers: [{ id: 'A/P - Supplier Payment', teamId: 'A/P - Supplier Payment', name: 'A/P - Supplier Payment', description: 'Team User', imgUrl: '' }],
            status: 'Pending',
            targets: ['AAAAAFjK!Kz4'],
            isEveryoneApprovalNeeded: true,
            disableActions: false,
            actionsConfig: { disableAddBefore: false, disableAddAfter: false, disableAddParallel: false, disableEdit: true, disableRemove: true }
        },
        {
            id: 'AAAAAFjK!Kz4',
            name: 'BOM Manager',
            description: '',
            approvers: [{ id: 'BOM Manager', teamId: 'BOM Manager', name: 'BOM Manager', description: 'Team User', imgUrl: '' }],
            status: 'Pending',
            targets: ['AAAAAFjK!Kz7', 'AAAAAFjK!K0B'],
            isEveryoneApprovalNeeded: true,
            disableActions: false,
            actionsConfig: { disableAddBefore: false, disableAddAfter: false, disableAddParallel: true, disableEdit: true, disableRemove: true }
        }
    ];

    let graph: ApprovalFlowGraph;

    beforeEach(() => {
        graph = generateApprovalFlowGraph(buildPRNodes());
    });

    it('should not throw an exception while building a graph with multiple parallel blocks', () => {
        expect(() => generateApprovalFlowGraph(buildPRNodes())).not.toThrow();
    });

    it('should not flag the graph as errored', () => {
        expect(graph).toBeDefined();
        expect(graph.errors).toBeFalsy();
    });

    it('should produce a non-empty list of columns', () => {
        expect(graph.columns).toBeDefined();
        expect(graph.columns.length).toBeGreaterThan(0);
    });

    it('should preserve every original node in the resulting graph', () => {
        const flatNodeIds = graph.columns
            .reduce<string[]>((acc, column) => acc.concat(column.nodes.map((n) => n.id)), [])
            .filter(Boolean);

        buildPRNodes().forEach((node) => {
            expect(flatNodeIds).toContain(node.id);
        });
    });

    it('should place each unique non-blank node in exactly one column', () => {
        const idToColumns = new Map<string, number[]>();

        graph.columns.forEach((column, columnIndex) => {
            column.nodes.forEach((node) => {
                if (!node.id || node.blank || node.space) {
                    return;
                }
                const list = idToColumns.get(node.id) ?? [];
                list.push(columnIndex);
                idToColumns.set(node.id, list);
            });
        });

        idToColumns.forEach((cols, id) => {
            expect({ id, columnCount: cols.length }).toEqual({ id, columnCount: 1 });
        });
    });

    it('should not exceed the longest simple path length (4) when computing columns', () => {
        // Longest path: Kz+ → Kz4 → K0B → K0E  (length 4)
        expect(graph.columns.length).toBeLessThanOrEqual(4);
    });

    it('should handle an empty node list without errors', () => {
        const empty = generateApprovalFlowGraph([]);
        expect(empty.errors).toBe(false);
        expect(empty.columns).toEqual([]);
    });

    it('should handle a single linear path (regression)', () => {
        const linearNodes: ApprovalNode[] = [
            { id: 'A', name: 'A', approvers: [], status: 'not started', targets: ['B'] },
            { id: 'B', name: 'B', approvers: [], status: 'not started', targets: ['C'] },
            { id: 'C', name: 'C', approvers: [], status: 'not started', targets: [] }
        ];
        const linearGraph = generateApprovalFlowGraph(linearNodes);
        expect(linearGraph.errors).toBeFalsy();
        expect(linearGraph.columns.length).toBe(3);
        expect(linearGraph.columns[0].nodes[0].id).toBe('A');
        expect(linearGraph.columns[1].nodes[0].id).toBe('B');
        expect(linearGraph.columns[2].nodes[0].id).toBe('C');
    });

    it('should handle a single parallel block (regression)', () => {
        // A → (B, C) → D
        const parallelNodes: ApprovalNode[] = [
            { id: 'A', name: 'A', approvers: [], status: 'not started', targets: ['B', 'C'] },
            { id: 'B', name: 'B', approvers: [], status: 'not started', targets: ['D'] },
            { id: 'C', name: 'C', approvers: [], status: 'not started', targets: ['D'] },
            { id: 'D', name: 'D', approvers: [], status: 'not started', targets: [] }
        ];
        const parallelGraph = generateApprovalFlowGraph(parallelNodes);
        expect(parallelGraph.errors).toBeFalsy();
        // A | (B, C) | D  →  3 columns
        expect(parallelGraph.columns.length).toBe(3);
        expect(parallelGraph.columns[1].nodes.length).toBe(2);
    });

    it('should handle two sequential parallel blocks chained together', () => {
        // A → (B, C) → D → (E, F) → G
        const chainedNodes: ApprovalNode[] = [
            { id: 'A', name: 'A', approvers: [], status: 'not started', targets: ['B', 'C'] },
            { id: 'B', name: 'B', approvers: [], status: 'not started', targets: ['D'] },
            { id: 'C', name: 'C', approvers: [], status: 'not started', targets: ['D'] },
            { id: 'D', name: 'D', approvers: [], status: 'not started', targets: ['E', 'F'] },
            { id: 'E', name: 'E', approvers: [], status: 'not started', targets: ['G'] },
            { id: 'F', name: 'F', approvers: [], status: 'not started', targets: ['G'] },
            { id: 'G', name: 'G', approvers: [], status: 'not started', targets: [] }
        ];
        expect(() => generateApprovalFlowGraph(chainedNodes)).not.toThrow();
        const chainedGraph = generateApprovalFlowGraph(chainedNodes);
        expect(chainedGraph.errors).toBeFalsy();
        // A | (B,C) | D | (E,F) | G  →  5 columns
        expect(chainedGraph.columns.length).toBe(5);
    });

    it('should return an errored graph when no root nodes are present (cyclic graph)', () => {
        const cyclicNodes: ApprovalNode[] = [
            { id: 'A', name: 'A', approvers: [], status: 'not started', targets: ['B'] },
            { id: 'B', name: 'B', approvers: [], status: 'not started', targets: ['A'] }
        ];
        const cyclicGraph = generateApprovalFlowGraph(cyclicNodes);
        expect(cyclicGraph.errors).toBe(true);
        expect(cyclicGraph.columns.length).toBe(0);
    });

    it('should handle parallel branches with asymmetric depths (1 vs 2 nodes)', () => {
        // A → (B → C, D) — one branch is longer than the other
        const asymmetricNodes: ApprovalNode[] = [
            { id: 'A', name: 'A', approvers: [], status: 'not started', targets: ['B', 'D'] },
            { id: 'B', name: 'B', approvers: [], status: 'not started', targets: ['C'] },
            { id: 'C', name: 'C', approvers: [], status: 'not started', targets: [] },
            { id: 'D', name: 'D', approvers: [], status: 'not started', targets: [] }
        ];
        expect(() => generateApprovalFlowGraph(asymmetricNodes)).not.toThrow();
        const asymmetricGraph = generateApprovalFlowGraph(asymmetricNodes);
        expect(asymmetricGraph.errors).toBeFalsy();
        // A | (B, D) | (C, blank)  →  3 columns
        expect(asymmetricGraph.columns.length).toBe(3);
    });

    it('should handle two root nodes each with a direct path to the same leaf', () => {
        // A → C, B → C  (two independent single-step roots merging)
        const twoRootNodes: ApprovalNode[] = [
            { id: 'A', name: 'A', approvers: [], status: 'not started', targets: ['C'] },
            { id: 'B', name: 'B', approvers: [], status: 'not started', targets: ['C'] },
            { id: 'C', name: 'C', approvers: [], status: 'not started', targets: [] }
        ];
        expect(() => generateApprovalFlowGraph(twoRootNodes)).not.toThrow();
        const twoRootGraph = generateApprovalFlowGraph(twoRootNodes);
        expect(twoRootGraph.errors).toBeFalsy();
        expect(twoRootGraph.columns.length).toBeGreaterThan(0);

        const flatIds = twoRootGraph.columns.flatMap((col) => col.nodes.map((n) => n.id)).filter(Boolean);
        expect(flatIds).toContain('A');
        expect(flatIds).toContain('B');
        expect(flatIds).toContain('C');
    });
});
