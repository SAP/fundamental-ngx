import { provideZonelessChangeDetection, signal } from '@angular/core';
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

describe('NavigationContentStartComponent (zoneless)', () => {
    let component: NavigationContentStartComponent;
    let fixture: ComponentFixture<NavigationContentStartComponent>;
    let navigationMock: NavigationComponentMock;

    beforeEach(async () => {
        navigationMock = new NavigationComponentMock();
        await TestBed.configureTestingModule({
            imports: [NavigationContentStartComponent],
            providers: [
                provideZonelessChangeDetection(),
                {
                    provide: FdbNavigation,
                    useValue: navigationMock
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationContentStartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create without NgZone dependency', () => {
        expect(component).toBeTruthy();
    });

    it('should run overflow calculation when isSnapped changes in zoneless mode', async () => {
        // This is the bug that this migration fixes: in zoneless mode, NgZone.onStable never emits,
        // so _calculateVisibleItems never ran. The fix replaces onStable with animationFrames().
        // We spy on the private method because without real DOM dimensions (jsdom has 0 for all
        // layout properties), the method produces no observable state change from its default values.
        const spy = jest.spyOn(component as any, '_calculateVisibleItems');

        navigationMock.isSnapped$.set(true);

        // toObservable uses effect() internally, which needs a CD pass in zoneless mode.
        fixture.detectChanges();
        await fixture.whenStable();

        // animationFrames() resolves via requestAnimationFrame (shimmed as setTimeout in jsdom).
        await new Promise((resolve) => requestAnimationFrame(resolve));

        expect(spy).toHaveBeenCalled();
    });
});
