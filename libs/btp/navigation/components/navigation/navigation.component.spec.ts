import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { NavigationComponent } from './navigation.component';

describe('NavigationComponent', () => {
    let component: NavigationComponent;
    let fixture: ComponentFixture<NavigationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [NavigationComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should insert more button after the last item of start containers', () => {
        const createMockItem = (
            placement: 'start' | 'end',
            listItems: FdbNavigationListItem[]
        ): FdbNavigationListItem =>
            ({
                type: 'item',
                separator: false,
                spacer: false,
                home: false,
                isVisible$: signal(true),
                skipNavigation: false,
                placementContainer: {
                    placement,
                    listItems$: signal(listItems),
                    allListItems$: signal([]),
                    registerItem: () => {},
                    unregisterItem: () => {}
                },
                parentListItemComponent: null,
                parentListItem: null,
                class$: signal(''),
                selected$: signal(false),
                id: signal(''),
                marker: null,
                listItems$: signal([]),
                hasChildren$: signal(false),
                popoverOpen$: signal(false),
                link$: signal(null),
                renderer$: signal(null),
                hidden$: signal(false),
                isOverflow$: signal(false),
                level$: signal(1),
                normalizedLevel$: signal(1),
                isActiveAttr$: signal(false),
                inGroup$: signal(false),
                expanded$: signal(false),
                isGroup$: signal(false),
                disabled$: signal(false),
                navigation: component,
                focus: () => {},
                toggleExpanded: () => {},
                keyboardExpanded: () => {},
                popoverLinkArrowDown: () => {},
                registerLink: () => {},
                unregisterLink: () => {},
                registerChildList: () => {},
                unregisterChildList: () => {},
                handleHorizontalNavigation: () => {},
                focusLink: () => {},
                canItemBeSelected: () => false
            }) as unknown as FdbNavigationListItem;

        const startA = createMockItem('start', [] as unknown as FdbNavigationListItem[]);
        const startB = createMockItem('start', [] as unknown as FdbNavigationListItem[]);
        const startC = createMockItem('start', [] as unknown as FdbNavigationListItem[]);
        const endA = createMockItem('end', [] as unknown as FdbNavigationListItem[]);

        (startA.placementContainer as any).listItems$ = signal([startA, startB]);
        (startB.placementContainer as any).listItems$ = signal([startA, startB]);
        (startC.placementContainer as any).listItems$ = signal([startC]);
        (endA.placementContainer as any).listItems$ = signal([endA]);

        const baseItems = [startA, startB, startC, endA];

        const resetMock = jest.fn();
        (component as any)._navigationItems = {
            toArray: () => baseItems,
            reset: resetMock
        };

        const moreButton = {
            type: 'showMore'
        } as FdbNavigationListItem;

        (component as any)._resetItemsList(moreButton);

        expect(resetMock).toHaveBeenCalledTimes(1);
        const resetItems = resetMock.mock.calls[0][0] as FdbNavigationListItem[];
        expect(resetItems[3]).toBe(moreButton);
        expect(resetItems[4]).toBe(endA);
    });
});
