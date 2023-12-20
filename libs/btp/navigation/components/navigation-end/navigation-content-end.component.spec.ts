import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationContentEndComponent } from './navigation-content-end.component';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { signal } from '@angular/core';
import { Subject } from 'rxjs';
import { FdbNavigation } from '../../models/navigation.class';
import { NavigationService } from '../../services/navigation.service';

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

describe('NavigationContentEndComponent', () => {
    let component: NavigationContentEndComponent;
    let fixture: ComponentFixture<NavigationContentEndComponent>;
    let navComponent: NavigationComponentMock;

    beforeEach(async () => {
        navComponent = new NavigationComponentMock();
        await TestBed.configureTestingModule({
            imports: [NavigationContentEndComponent],
            providers: [
                NavigationService,
                {
                    provide: FdbNavigation,
                    useValue: navComponent
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NavigationContentEndComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
