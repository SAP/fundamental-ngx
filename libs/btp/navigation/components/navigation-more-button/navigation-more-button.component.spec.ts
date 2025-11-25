import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { FdbNavigation } from '../../models/navigation.class';
import { NavigationService } from '../../services/navigation.service';
import { NavigationMoreButtonComponent } from './navigation-more-button.component';

class NavigationServiceMock {
    currentItem$ = new Subject<FdbNavigationListItem>();
    selectedItem$ = signal<FdbNavigationListItem | null>(null);
    overflowItemSelected$ = new Subject<FdbNavigationListItem>();
    selectionChanged$ = new Subject<FdbNavigationListItem | null>();

    setSelectedItem(item: FdbNavigationListItem | null): void {
        this.selectedItem$.set(item);
        this.selectionChanged$.next(item);
    }

    getSelectedItem(): FdbNavigationListItem | null {
        return this.selectedItem$();
    }
}

class NavigationComponentMock extends FdbNavigation {
    classList$ = signal([]);
    isSnapped$ = signal(false);
    showMoreButton$ = signal(null);
    _navigationItemRenderer = signal(null);
    closeAllPopups = new Subject<void>();
    selectionMode: 'router' | 'click' = 'router';
    service = new NavigationServiceMock() as NavigationService;
    closePopups(): void {}
    setActiveItem(): void {}
    getActiveItem(): FdbNavigationListItem | null {
        return null;
    }
}

describe('NavigationMoreButtonComponent', () => {
    let component: NavigationMoreButtonComponent;
    let fixture: ComponentFixture<NavigationMoreButtonComponent>;

    beforeEach(async () => {
        const navigationCmp = new NavigationComponentMock();
        await TestBed.configureTestingModule({
            imports: [NavigationMoreButtonComponent],
            providers: [
                {
                    provide: FdbNavigation,
                    useValue: navigationCmp
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationMoreButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set listItems property', () => {
        const mockItems = [] as FdbNavigationListItem[];
        component.listItems = mockItems;
        expect(component.listItems).toBe(mockItems);
    });

    it('should set visibility signal', () => {
        component.isVisible$.set(false);
        expect(component.isVisible$()).toBe(false);
    });

    it('should toggle popover open signal', () => {
        component.popoverOpen$.set(true);
        expect(component.popoverOpen$()).toBe(true);
    });
});
