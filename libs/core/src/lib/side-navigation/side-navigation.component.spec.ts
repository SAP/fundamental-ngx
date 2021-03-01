import { ComponentFixture, TestBed, fakeAsync, waitForAsync } from '@angular/core/testing';

import { SideNavigationComponent } from './side-navigation.component';
import { Component, ViewChild } from '@angular/core';
import { NestedListModule } from '../nested-list/nested-list.module';
import { MenuKeyboardService } from '../menu/menu-keyboard.service';
import { SideNavigationMainDirective } from './side-navigation-main.directive';

@Component({
    template: `
        <fd-side-nav>
            <div fd-side-nav-main>
                <ul fd-nested-list [textOnly]="true">
                    <li fd-nested-list-item>
                        <a fd-nested-list-link>
                            <span fd-nested-list-title>Link 1</span>
                        </a>
                    </li>
                    <li fd-nested-list-item>
                        <a fd-nested-list-link>
                            <span fd-nested-list-title>Link 2</span>
                        </a>
                    </li>
                    <li fd-nested-list-item [expanded]="expanded">
                        <div fd-nested-list-content>
                            <a fd-nested-list-link>
                                <span fd-nested-list-title>Link 3</span>
                            </a>
                            <button fd-nested-list-expand-icon></button>
                        </div>
                        <ul fd-nested-list>
                            <li fd-nested-list-item>
                                <a fd-nested-list-link>
                                    <span fd-nested-list-title>Link 4</span>
                                </a>
                            </li>
                            <li fd-nested-list-item>
                                <a fd-nested-list-link>
                                    <span fd-nested-list-title>Link 5</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li fd-nested-list-item [expanded]="true">
                        <div fd-nested-list-content>
                            <a fd-nested-list-link>
                                <span fd-nested-list-title>Link 6</span>
                            </a>
                            <button fd-nested-list-expand-icon></button>
                        </div>
                        <ul fd-nested-list>
                            <li fd-nested-list-item>
                                <a fd-nested-list-link>
                                    <span fd-nested-list-title>Link 7</span>
                                </a>
                            </li>
                            <li fd-nested-list-item [expanded]="expanded">
                                <div fd-nested-list-content>
                                    <a fd-nested-list-link>
                                        <span fd-nested-list-title>Link 6</span>
                                    </a>
                                    <button fd-nested-list-expand-icon></button>
                                </div>
                                <ul fd-nested-list>
                                    <li fd-nested-list-item>
                                        <a fd-nested-list-link>
                                            <span fd-nested-list-title>Link 4</span>
                                        </a>
                                    </li>
                                    <li fd-nested-list-item>
                                        <a fd-nested-list-link>
                                            <span fd-nested-list-title>Link 5</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li fd-nested-list-item>
                        <a fd-nested-list-link>
                            <span fd-nested-list-title>Link 4</span>
                        </a>
                    </li>
                </ul>
            </div>
        </fd-side-nav>
    `
})
class TestNestedContainerComponent {

    @ViewChild(SideNavigationComponent)
    sideNav: SideNavigationComponent;

    expanded = false;

}

describe('SideNavigationComponent', () => {
    let component: TestNestedContainerComponent;
    let fixture: ComponentFixture<TestNestedContainerComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NestedListModule],
            declarations: [SideNavigationComponent, SideNavigationMainDirective, TestNestedContainerComponent],
            providers: [MenuKeyboardService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestNestedContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should have not hidden items in list', fakeAsync(() => {
        fixture.whenStable().then(() => {
            component.sideNav.ngAfterContentInit();
            fixture.detectChanges();
            const anyComponent: any = component.sideNav;
            expect(
                anyComponent.keyboardService._getAllListItems(
                    anyComponent.getLists()[0]
                ).length
            ).toBe(7);
        });
    }));

    it('should have expanded items in list', fakeAsync(() => {
        component.expanded = true;
        fixture.whenStable().then(() => {
            component.sideNav.ngAfterContentInit();
            fixture.detectChanges();
            const anyComponent: any = component.sideNav;
            expect(
                anyComponent.keyboardService._getAllListItems(
                    anyComponent.getLists()[0]
                ).length
            ).toBe(11);
        });
    }));
});
