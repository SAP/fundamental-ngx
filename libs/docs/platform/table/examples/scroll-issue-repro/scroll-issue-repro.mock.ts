/**
 * Mock data for demonstrating scroll issue in tabbed interface
 *
 * Tab 1 (Todo): 100 items - requires deep scrolling
 * Tab 2 (Sent): 5 items - no scroll needed
 * Tab 3 (Done): 100 items - requires scrolling
 */

export interface MockTableItem {
    id: string;
    name: string;
    description: string;
    status: string;
    createdAt: string;
}

// Helper function to generate mock items
const generateMockItems = (count: number, prefix: string): MockTableItem[] =>
    Array.from({ length: count }, (_, index) => ({
        id: `${prefix}-${String(index + 1).padStart(3, '0')}`,
        name: `Item ${prefix} ${index + 1}`,
        description: `Description for item ${index + 1}`,
        status: prefix,
        createdAt: new Date(Date.now() - index * 86400000).toISOString()
    }));

// Tab 1: 100 items (very long, requires deep scrolling)
export const TODO_ITEMS: MockTableItem[] = generateMockItems(100, 'TODO');

// Tab 2: 5 items (short, no scroll needed)
export const SENT_ITEMS: MockTableItem[] = generateMockItems(5, 'SENT');

// Tab 3: 100 items (requires scrolling)
export const DONE_ITEMS: MockTableItem[] = generateMockItems(100, 'DONE');

export const MOCK_DATA_BY_TAB = {
    todo: TODO_ITEMS,
    sent: SENT_ITEMS,
    done: DONE_ITEMS
};
