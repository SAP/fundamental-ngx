import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationContentStartComponent } from './navigation-content-start.component';
import { FdbNavigation } from '../../models/navigation.class';
import { signal } from '@angular/core';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { Subject } from 'rxjs';

class NavigationComponentMock extends FdbNavigation {
    classList$ = signal([]);
    isSnapped$ = signal(false);
    showMoreButton$ = signal(null);
    _navigationItemRenderer = signal(null);
    closeAllPopups = new Subject<void>();
    closePopups(): void {}
    setActiveItem(): void {}
    getActiveItem(): FdbNavigationListItem | null {
        return null;
    }
}

describe('NavigationContentStartComponent', () => {
    let component: NavigationContentStartComponent;
    let fixture: ComponentFixture<NavigationContentStartComponent>;
    let navigationCmp: NavigationComponentMock;

    beforeEach(async () => {
        navigationCmp = new NavigationComponentMock();
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
});
