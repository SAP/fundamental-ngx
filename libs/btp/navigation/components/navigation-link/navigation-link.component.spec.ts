import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationLinkComponent } from './navigation-link.component';
import { FdbNavigation } from '../../models/navigation.class';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { signal } from '@angular/core';
import { By } from '@angular/platform-browser';
import { IconComponent } from '@fundamental-ngx/core/icon';
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

describe('NavigationLinkComponent', () => {
    let component: NavigationLinkComponent;
    let fixture: ComponentFixture<NavigationLinkComponent>;
    let navComponent: NavigationComponentMock;

    beforeEach(async () => {
        navComponent = new NavigationComponentMock();
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

    it('should render icon if input property provided', async () => {
        expect(fixture.debugElement.query(By.directive(IconComponent))).toBeFalsy();
        fixture.componentRef.setInput('glyph', 'home');
        fixture.detectChanges();
        await fixture.whenStable();
        expect(fixture.debugElement.query(By.directive(IconComponent))).toBeTruthy();
    });

    it('should render external marker if input property provided', async () => {
        expect(fixture.debugElement.query(By.css('.fd-navigation__external-link-indicator'))).toBeFalsy();
        fixture.componentRef.setInput('external', true);
        fixture.detectChanges();
        await fixture.whenStable();
        expect(fixture.debugElement.query(By.css('.fd-navigation__external-link-indicator'))).toBeTruthy();
    });
});
