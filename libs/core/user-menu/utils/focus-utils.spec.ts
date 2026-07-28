import { signal } from '@angular/core';
import { UserMenuListItemComponent } from '../components/user-menu-list-item.component';
import { resetListFocus } from './focus-utils';

describe('focus-utils', () => {
    describe('resetListFocus', () => {
        it('should set first item tabindex to 0 and rest to -1', () => {
            // Create mock list items
            const items = [
                { _tabIndex$: signal(-1) },
                { _tabIndex$: signal(0) },
                { _tabIndex$: signal(-1) }
            ] as unknown as UserMenuListItemComponent[];

            resetListFocus(items);

            expect(items[0]._tabIndex$()).toBe(0);
            expect(items[1]._tabIndex$()).toBe(-1);
            expect(items[2]._tabIndex$()).toBe(-1);
        });

        it('should handle single item', () => {
            const items = [{ _tabIndex$: signal(-1) }] as unknown as UserMenuListItemComponent[];

            resetListFocus(items);

            expect(items[0]._tabIndex$()).toBe(0);
        });

        it('should handle empty array', () => {
            const items: UserMenuListItemComponent[] = [];

            // Should not throw
            expect(() => resetListFocus(items)).not.toThrow();
        });

        it('should handle null/undefined', () => {
            // Should not throw
            expect(() => resetListFocus(null as any)).not.toThrow();
            expect(() => resetListFocus(undefined as any)).not.toThrow();
        });

        it('should reset correctly when all items have tabindex -1', () => {
            const items = [
                { _tabIndex$: signal(-1) },
                { _tabIndex$: signal(-1) },
                { _tabIndex$: signal(-1) }
            ] as unknown as UserMenuListItemComponent[];

            resetListFocus(items);

            expect(items[0]._tabIndex$()).toBe(0);
            expect(items[1]._tabIndex$()).toBe(-1);
            expect(items[2]._tabIndex$()).toBe(-1);
        });

        it('should reset correctly when middle item had tabindex 0', () => {
            const items = [
                { _tabIndex$: signal(-1) },
                { _tabIndex$: signal(0) },
                { _tabIndex$: signal(-1) },
                { _tabIndex$: signal(-1) }
            ] as unknown as UserMenuListItemComponent[];

            resetListFocus(items);

            expect(items[0]._tabIndex$()).toBe(0);
            expect(items[1]._tabIndex$()).toBe(-1);
            expect(items[2]._tabIndex$()).toBe(-1);
            expect(items[3]._tabIndex$()).toBe(-1);
        });

        it('should reset correctly when last item had tabindex 0', () => {
            const items = [
                { _tabIndex$: signal(-1) },
                { _tabIndex$: signal(-1) },
                { _tabIndex$: signal(0) }
            ] as unknown as UserMenuListItemComponent[];

            resetListFocus(items);

            expect(items[0]._tabIndex$()).toBe(0);
            expect(items[1]._tabIndex$()).toBe(-1);
            expect(items[2]._tabIndex$()).toBe(-1);
        });
    });
});
