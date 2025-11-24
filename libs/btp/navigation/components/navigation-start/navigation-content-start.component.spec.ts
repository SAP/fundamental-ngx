import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { FdbNavigation } from '../../models/navigation.class';
import { NavigationService } from '../../services/navigation.service';
import { NavigationContentStartComponent } from './navigation-content-start.component';

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

describe('NavigationContentStartComponent', () => {
    let component: NavigationContentStartComponent;
    let fixture: ComponentFixture<NavigationContentStartComponent>;

    beforeEach(async () => {
        const navigationCmp = new NavigationComponentMock();
        await TestBed.configureTestingModule({
            imports: [NavigationContentStartComponent],
            providers: [
                {
                    provide: FdbNavigation,
                    useValue: navigationCmp
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationContentStartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set contentProjected property', () => {
        component.contentProjected = false;
        expect(component.contentProjected).toBe(false);
    });

    it('should set ariaLabel property', () => {
        component.ariaLabel = 'Navigation start';
        expect(component.ariaLabel).toBe('Navigation start');
    });

    it('should have placement as start', () => {
        expect(component.placement).toBe('start');
    });

    it('should have show more button signal', () => {
        expect(component._showMoreButton$()).toBe(false);
    });

    it('should filter list items based on navigation state', () => {
        const items = component.listItems$();
        expect(Array.isArray(items)).toBe(true);
    });
});
