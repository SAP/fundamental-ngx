import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { FdbNavigation } from '../../models/navigation.class';
import { NavigationService } from '../../services/navigation.service';
import { NavigationListItemComponent } from './navigation-list-item.component';

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
    closeAllPopups = new Subject<void>();
    classList$ = signal([]);
    isSnapped$ = signal(false);
    showMoreButton$ = signal(null);
    _navigationItemRenderer = signal(null);
    selectionMode: 'router' | 'click' = 'router';
    service = new NavigationServiceMock() as NavigationService;
    closePopups(): void {}
    setActiveItem(): void {}
    getActiveItem(): FdbNavigationListItem | null {
        return null;
    }
}

describe('NavigationListItemComponent', () => {
    let component: NavigationListItemComponent;
    let fixture: ComponentFixture<NavigationListItemComponent>;
    let navComponent: NavigationComponentMock;

    beforeEach(async () => {
        navComponent = new NavigationComponentMock();
        await TestBed.configureTestingModule({
            imports: [NavigationListItemComponent],
            providers: [
                {
                    provide: FdbNavigation,
                    useValue: navComponent
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationListItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set home property', () => {
        component.home = true;
        expect(component.home).toBe(true);
    });

    it('should set quickCreate property', () => {
        component.quickCreate = true;
        expect(component.quickCreate).toBe(true);
    });

    it('should set separator property', () => {
        component.separator = true;
        expect(component.separator).toBe(true);
    });

    it('should set group property', () => {
        component.group = true;
        expect(component.group).toBe(true);
    });

    it('should set expanded property', () => {
        component.expanded = true;
        expect(component.expanded).toBe(true);
    });
});
