import { signal } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
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

    it('should restore focus to parent link when popover closes in snapped mode', fakeAsync(() => {
        // Mock the link$ signal to return a truthy value
        component.link$.set({ elementRef: { nativeElement: document.createElement('a') } } as any);

        const restoreFocusSpy = jest.spyOn(component as any, 'restoreFocusAfterPopoverClose');

        navComponent.isSnapped$.set(true);
        component.popoverOpen$.set(true);
        fixture.detectChanges();

        component.popoverOpen$.set(false);
        fixture.detectChanges();

        expect(restoreFocusSpy).toHaveBeenCalled();
    }));

    it('should not restore focus when popover closes in non-snapped mode', fakeAsync(() => {
        const restoreFocusSpy = jest.spyOn(component as any, 'restoreFocusAfterPopoverClose');

        navComponent.isSnapped$.set(false);
        component.popoverOpen$.set(true);
        fixture.detectChanges();

        component.popoverOpen$.set(false);
        fixture.detectChanges();

        expect(restoreFocusSpy).not.toHaveBeenCalled();
    }));

    it('should not restore focus when popover opens', fakeAsync(() => {
        const restoreFocusSpy = jest.spyOn(component as any, 'restoreFocusAfterPopoverClose');

        navComponent.isSnapped$.set(true);
        component.popoverOpen$.set(false);
        fixture.detectChanges();

        component.popoverOpen$.set(true);
        fixture.detectChanges();

        expect(restoreFocusSpy).not.toHaveBeenCalled();
    }));

    it('should add sticky modifier class when sticky input is true', () => {
        fixture.componentRef.setInput('sticky', true);
        fixture.detectChanges();

        expect(component.class$()).toContain('fd-navigation__list-item--sticky');
    });

    it('should not add sticky modifier class when sticky input is false', () => {
        fixture.componentRef.setInput('sticky', false);
        fixture.detectChanges();

        expect(component.class$()).not.toContain('fd-navigation__list-item--sticky');
    });

    it('should not be visible when configured as search item in snapped mode', () => {
        fixture.componentRef.setInput('search', true);
        navComponent.isSnapped$.set(true);
        fixture.detectChanges();

        expect(component.isVisible$()).toBe(false);
    });
});
