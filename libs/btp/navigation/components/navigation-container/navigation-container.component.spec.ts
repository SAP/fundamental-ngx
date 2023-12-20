import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationContainerComponent } from './navigation-container.component';
import { NavigationService } from '../../services/navigation.service';
import { FdbNavigation } from '../../models/navigation.class';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { signal } from '@angular/core';
import { Subject } from 'rxjs';

class NavigationComponentMock extends FdbNavigation {
    closeAllPopups = new Subject<void>();
    classList$ = signal([]);
    isSnapped$ = signal(false);
    showMoreButton$ = signal(null);
    _navigationItemRenderer = signal(null);
    horizontal$ = signal(false);
    moreButtonRenderer$ = signal(null);
    getFirstFocusableItem(): FdbNavigationListItem | null {
        return null;
    }
    closePopups(): void {}
    setActiveItem(): void {}
    getActiveItem(): FdbNavigationListItem | null {
        return null;
    }
}

describe('NavigationContainerComponent', () => {
    let component: NavigationContainerComponent;
    let fixture: ComponentFixture<NavigationContainerComponent>;
    let navComponent: NavigationComponentMock;

    beforeEach(async () => {
        navComponent = new NavigationComponentMock();
        await TestBed.configureTestingModule({
            imports: [NavigationContainerComponent],
            providers: [
                NavigationService,
                {
                    provide: FdbNavigation,
                    useValue: navComponent
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
