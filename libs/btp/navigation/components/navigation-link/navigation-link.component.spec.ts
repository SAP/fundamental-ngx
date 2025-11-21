import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { FdbNavigation } from '../../models/navigation.class';
import { NavigationService } from '../../services/navigation.service';
import { NavigationLinkComponent } from './navigation-link.component';

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

describe('NavigationLinkComponent', () => {
    let component: NavigationLinkComponent;
    let fixture: ComponentFixture<NavigationLinkComponent>;

    beforeEach(async () => {
        const navComponent = new NavigationComponentMock();
        await TestBed.configureTestingModule({
            imports: [NavigationLinkComponent],
            providers: [
                {
                    provide: FdbNavigation,
                    useValue: navComponent
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationLinkComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set glyph property', () => {
        component.glyph = 'home';
        expect(component.glyph).toBe('home');
    });

    it('should set external property', () => {
        component.external = true;
        expect(component.external).toBe(true);
    });

    it('should set quickCreate property', () => {
        component.quickCreate = true;
        expect(component.quickCreate).toBe(true);
    });

    it('should detect if in popover', () => {
        expect(component.inPopover).toBe(false);
    });
});
