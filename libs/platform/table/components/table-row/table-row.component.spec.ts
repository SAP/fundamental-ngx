import { TableRowComponent } from './table-row.component';

describe('TableRowComponent - Cell Overflow Integration', () => {
    it('should call updateTitle on all overflow directives when updateCellOverflowTitles is called', () => {
        // Create a minimal instance to test the method
        const component = Object.create(TableRowComponent.prototype);

        // Mock the overflow directives
        const mockDirective1 = { updateTitle: jest.fn() };
        const mockDirective2 = { updateTitle: jest.fn() };

        component._tableCellOverflowDirectives = {
            forEach: (callback: any) => {
                [mockDirective1, mockDirective2].forEach(callback);
            }
        };

        // Call the method
        component.updateCellOverflowTitles();

        // Verify all directives had updateTitle called
        expect(mockDirective1.updateTitle).toHaveBeenCalled();
        expect(mockDirective2.updateTitle).toHaveBeenCalled();
    });

    it('should handle empty directives list gracefully', () => {
        const component = Object.create(TableRowComponent.prototype);

        component._tableCellOverflowDirectives = null;

        // Should not throw
        expect(() => component.updateCellOverflowTitles()).not.toThrow();
    });
});
