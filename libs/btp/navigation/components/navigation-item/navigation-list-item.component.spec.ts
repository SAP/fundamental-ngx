import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { Subject } from 'rxjs';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { FdbNavigation } from '../../models/navigation.class';
import { NavigationListItemComponent } from './navigation-list-item.component';

// eslint-disable-next-line @nx/enforce-module-boundaries

class NavigationComponentMock extends FdbNavigation {
    closeAllPopups = new Subject<void>();
    classList$ = signal([]);
    isSnapped$ = signal(false);
    showMoreButton$ = signal(null);
    _navigationItemRenderer = signal(null);
    closePopups(): void {}
    setActiveItem(): void {}
    getActiveItem(): FdbNavigationListItem | null {
        return null;
    }
}

@Component({
    template: `
        <fdb-navigation-list-item #item>
            <fdb-navigation-list-item></fdb-navigation-list-item>
        </fdb-navigation-list-item>
        <div id="item_renderer"><ng-template [ngTemplateOutlet]="item.renderer$()"></ng-template></div>
    `,
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NavigationListItemComponent, NgTemplateOutlet]
})
class TestComponent {
    @ViewChild(NavigationListItemComponent)
    navListComponent: NavigationListItemComponent;
}

describe('NavigationListItemComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let navComponent: NavigationComponentMock;

    beforeEach(async () => {
        navComponent = new NavigationComponentMock();
        await TestBed.configureTestingModule({
            imports: [TestComponent],
            providers: [
                {
                    provide: FdbNavigation,
                    useValue: navComponent
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        await fixture.whenStable();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should expose renderer', async () => {
        await fixture.whenRenderingDone();
        await fixture.whenStable();
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.fd-navigation__list-item'))).toBeTruthy();
    });

    it('should render child items', async () => {
        await fixture.whenRenderingDone();
        await fixture.whenStable();
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.css('.fd-navigation__list-item ul'))).toBeTruthy();
    });

    it('should hide items when snapped mode is enabled', async () => {
        navComponent.isSnapped$.set(true);
        await fixture.whenRenderingDone();
        await fixture.whenStable();
        fixture.detectChanges();
        expect(fixture.debugElement.query(By.directive(PopoverComponent))).toBeTruthy();
    });
});
