import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, ViewChild, signal } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PopoverComponent } from '@fundamental-ngx/core/popover';
import { Subject } from 'rxjs';
import { FdbNavigationListItem } from '../../models/navigation-list-item.class';
import { FdbNavigation } from '../../models/navigation.class';
import { NavigationListItemComponent } from './navigation-list-item.component';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { 
    CxNestedListModule, 
    NestedListContentDirective, 
    NestedListStateService,
    NestedItemService
 } from '@fundamental-ngx/cx';

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

@Component({
    template: `
    <div>TEST</div>
        <!-- <fdb-navigation-list-item #item>
            <fdb-navigation-list-item></fdb-navigation-list-item>
        </fdb-navigation-list-item>
        <div fdx-nested-list-content>
            <a fdx-nested-list-link>
                <span fdx-nested-list-icon [glyph]="'settings'"></span>
                <span fdx-nested-list-title>Link 1</span>
            </a>
            <a fdx-nested-list-expand-icon></a>
        </div> -->
    `,
    standalone: true,
    imports: [CommonModule, CxNestedListModule, NavigationListItemComponent]
})
class TestNestedContainerComponent {
    @ViewChild(NestedListContentDirective)
    directiveElement: NestedListContentDirective;

    @ViewChild(NavigationListItemComponent)
    navListComponent: NavigationListItemComponent;
}

describe('NestedContentDirective', () => {
    let component: TestNestedContainerComponent;
    let directiveElement: NestedListContentDirective;
    let fixture: ComponentFixture<TestNestedContainerComponent>;
    let navComponent: NavigationComponentMock;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [TestNestedContainerComponent],
            providers: [NestedListStateService, NestedItemService]
        }).compileComponents();

        navComponent = new NavigationComponentMock();
        // await TestBed.configureTestingModule({
        //     imports: [TestComponent],
        //     providers: [
        //         {
        //             provide: FdbNavigation,
        //             useValue: navComponent
        //         }
        //     ]
        // }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestNestedContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        directiveElement = component.directiveElement;
        fixture.detectChanges();
    });

    it('Should have good classes', () => {
        const classList = (directiveElement as any)._elementRef.nativeElement.classList;
        expect(classList.contains('has-child')).toBeFalsy();
    });

});
