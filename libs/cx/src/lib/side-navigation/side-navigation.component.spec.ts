import { ComponentFixture, TestBed, fakeAsync, waitForAsync } from '@angular/core/testing';

import { SideNavigationComponent } from './side-navigation.component';
import { Component, ViewChild } from '@angular/core';
import { CxNestedListModule } from '../nested-list/nested-list.module';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { SideNavigationMainComponent } from './side-navigation-main.component';

@Component({
    template: `
        <fdx-side-nav>
            <div fdx-side-nav-main>
                <ul fdx-nested-list [textOnly]="true">
                    <li fdx-nested-list-item>
                        <a fdx-nested-list-link>
                            <span fdx-nested-list-title>Link 1</span>
                        </a>
                    </li>
                    <li fdx-nested-list-item>
                        <a fdx-nested-list-link>
                            <span fdx-nested-list-title>Link 2</span>
                        </a>
                    </li>
                    <li fdx-nested-list-item [expanded]="expanded">
                        <a fdx-nested-list-link>
                            <span fdx-nested-list-title>Link 3</span>
                        </a>
                        <button fdx-nested-list-expand-icon></button>
                        <ul fdx-nested-list>
                            <li fdx-nested-list-item>
                                <a fdx-nested-list-link>
                                    <span fdx-nested-list-title>Link 4</span>
                                </a>
                            </li>
                            <li fdx-nested-list-item>
                                <a fdx-nested-list-link>
                                    <span fdx-nested-list-title>Link 5</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li fdx-nested-list-item [expanded]="true">
                        <a fdx-nested-list-link>
                            <span fdx-nested-list-title>Link 6</span>
                        </a>
                        <button fdx-nested-list-expand-icon></button>
                        <ul fdx-nested-list>
                            <li fdx-nested-list-item>
                                <a fdx-nested-list-link>
                                    <span fdx-nested-list-title>Link 7</span>
                                </a>
                            </li>
                            <li fdx-nested-list-item [expanded]="expanded">
                                <a fdx-nested-list-link>
                                    <span fdx-nested-list-title>Link 6</span>
                                </a>
                                <button fdx-nested-list-expand-icon></button>
                                <ul fdx-nested-list>
                                    <li fdx-nested-list-item>
                                        <a fdx-nested-list-link>
                                            <span fdx-nested-list-title>Link 4</span>
                                        </a>
                                    </li>
                                    <li fdx-nested-list-item>
                                        <a fdx-nested-list-link>
                                            <span fdx-nested-list-title>Link 5</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li fdx-nested-list-item>
                        <a fdx-nested-list-link>
                            <span fdx-nested-list-title>Link 4</span>
                        </a>
                    </li>
                </ul>
            </div>
        </fdx-side-nav>
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
            imports: [CxNestedListModule],
            declarations: [SideNavigationComponent, SideNavigationMainComponent, TestNestedContainerComponent],
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
            expect(anyComponent.keyboardService._getAllListItems(anyComponent.getLists()[0]).length).toBe(7);
        });
    }));

    it('should have expanded items in list', fakeAsync(() => {
        component.expanded = true;
        fixture.whenStable().then(() => {
            component.sideNav.ngAfterContentInit();
            fixture.detectChanges();
            const anyComponent: any = component.sideNav;
            expect(anyComponent.keyboardService._getAllListItems(anyComponent.getLists()[0]).length).toBe(11);
        });
    }));
});
