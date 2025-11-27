import { Component, signal } from '@angular/core';
import { Tree } from '@fundamental-ngx/ui5-webcomponents/tree';
import { TreeItem } from '@fundamental-ngx/ui5-webcomponents/tree-item';
import type { UI5CustomEvent } from '@ui5/webcomponents-base';

interface TreeNode {
    id: number;
    text: string;
    icon: string;
    hasChildren?: boolean;
    expanded?: boolean;
    children?: TreeNode[];
    loading?: boolean;
}

@Component({
    selector: 'ui5-tree-lazy-loading-sample',
    templateUrl: './lazy-loading.html',
    standalone: true,
    imports: [Tree, TreeItem]
})
export class TreeLazyLoadingSample {
    treeData = signal<TreeNode[]>([
        { id: 1, text: 'Server 1', icon: 'database', hasChildren: true, loading: false },
        { id: 2, text: 'Server 2', icon: 'database', hasChildren: true, loading: false },
        { id: 3, text: 'Server 3', icon: 'database', hasChildren: true, loading: false }
    ]);

    loadingStatus = signal<string>('');

    onItemToggle(event: UI5CustomEvent<any, 'item-toggle'>): void {
        const item = event.detail.item;
        const itemId = parseInt(item.getAttribute('data-id') || '0');

        // Find the node
        const node = this.findNode(this.treeData(), itemId);

        if (node && !node.children && node.hasChildren) {
            // Prevent default expansion
            event.preventDefault();

            // Set loading state by updating the signal
            this.loadingStatus.set(`Loading children for ${node.text}...`);
            this.setNodeLoading(itemId, true);

            // Simulate API call
            setTimeout(() => {
                this.loadChildren(itemId);
                this.loadingStatus.set(`Loaded children for ${node.text}`);

                // Manually expand the item
                item.expanded = true;

                // Clear loading state
                this.setNodeLoading(itemId, false);
            }, 1000);
        }
    }

    private findNode(nodes: TreeNode[], id: number): TreeNode | null {
        for (const node of nodes) {
            if (node.id === id) {
                return node;
            }
            if (node.children) {
                const found = this.findNode(node.children, id);
                if (found) {
                    return found;
                }
            }
        }
        return null;
    }

    /**
     * Updates a node's loading state immutably by creating a new tree data reference
     */
    private setNodeLoading(nodeId: number, loading: boolean): void {
        this.treeData.update((nodes) => this.updateNodeInTree(nodes, nodeId, { loading }));
    }

    /**
     * Recursively updates a node in the tree, returning a new array
     */
    private updateNodeInTree(nodes: TreeNode[], targetId: number, updates: Partial<TreeNode>): TreeNode[] {
        return nodes.map((node) => {
            if (node.id === targetId) {
                // Create a new node object with the updates
                return { ...node, ...updates };
            }
            if (node.children) {
                // Recursively update children
                return {
                    ...node,
                    children: this.updateNodeInTree(node.children, targetId, updates)
                };
            }
            return node;
        });
    }

    private loadChildren(parentId: number): void {
        this.treeData.update((nodes) =>
            nodes.map((node) => {
                if (node.id === parentId) {
                    return {
                        ...node,
                        expanded: true,
                        children: [
                            {
                                id: parentId * 10 + 1,
                                text: `Database ${parentId}.1`,
                                icon: 'source-code'
                            },
                            {
                                id: parentId * 10 + 2,
                                text: `Database ${parentId}.2`,
                                icon: 'source-code'
                            },
                            {
                                id: parentId * 10 + 3,
                                text: `Cache ${parentId}`,
                                icon: 'circle-task'
                            }
                        ]
                    };
                }

                return node;
            })
        );
    }
}
