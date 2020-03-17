import { Component, ViewChild, Input } from '@angular/core';
import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { By } from '@angular/platform-browser';
import { MenuItemComponent } from './menu-item.component';
import { MenuKeyboardService, IconModule } from '@fundamental-ngx/core';

@Component({
    selector: 'fdp-test-component',
    template: `
        <fdp-menu
            id="test-menu"
            [showSeparator]="showSeparator"
            [menuItems]="menuItems"
            [width]="'500px'"
            [isScrolling]="isScrolling"
            [scrollLimit]="scrollLimit"
        ></fdp-menu>
    `
})
class TestComponent {
    @ViewChild(MenuComponent) menu: MenuComponent;
    @Input() menuItems: [];

    @Input() public showSeparator = false;

    @Input() public isScrolling = true;

    @Input() public scrollLimit;

    constructor() { }
}

describe('MenuComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [IconModule],
            declarations: [TestComponent, MenuComponent, MenuItemComponent],
            providers: [MenuKeyboardService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Simple Menu', () => {
        let firstItemClicked = false;
        let secondItemClicked = false;
        let thirdItemClicked = false;

        let testdata: any[] = [];

        beforeEach(() => {
            firstItemClicked = false;
            secondItemClicked = false;
            thirdItemClicked = false;
            testdata = [
                {
                    label: 'First Item',
                    command: () => {
                        firstItemClicked = true;
                    }
                },
                {
                    label: 'Second Item',
                    command: () => {
                        secondItemClicked = true;
                    }
                },
                {
                    label: 'Third Item',
                    command: () => {
                        thirdItemClicked = true;
                    }
                }
            ];
            component.menu.groups = component.menu.processData(testdata);
            fixture.detectChanges();
        });

        it('should be able to display the labels', () => {
            const menuItems = fixture.debugElement.queryAll(By.css('[data-tag="menu-item"]'));
            expect(menuItems.length).toBe(3);

            const firstItem = fixture.debugElement.query(By.css('[data-tag="menu-item"]'));
            expect(firstItem.nativeElement.textContent).toBe(' First Item ');

            const secondItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="1"]'));
            expect(secondItem.nativeElement.textContent).toBe(' Second Item ');

            const thirdItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="2"]'));
            expect(thirdItem.nativeElement.textContent).toBe(' Third Item ');
        });

        it('should be able to bind the commands to click events', () => {
            expect(firstItemClicked).toBeFalsy();
            expect(secondItemClicked).toBeFalsy();
            expect(thirdItemClicked).toBeFalsy();

            const firstItem = fixture.debugElement.query(
                By.css('[data-tag="menu-item"][data-index="0"] [role="button"]')
            );
            firstItem.nativeElement.click();
            expect(firstItemClicked).toBeTruthy();

            const secondItem = fixture.debugElement.query(
                By.css('[data-tag="menu-item"][data-index="1"] [role="button"]')
            );
            secondItem.nativeElement.click();
            expect(secondItemClicked).toBeTruthy();

            const thirdItem = fixture.debugElement.query(
                By.css('[data-tag="menu-item"][data-index="2"] [role="button"]')
            );
            thirdItem.nativeElement.click();
            expect(thirdItemClicked).toBeTruthy();
        });

        it('should not separate items by default', () => {
            const menuList = fixture.debugElement.query(By.css('[data-tag="menu'));
            expect(menuList.nativeElement.classList.contains('fd-menu__list--separated')).toBeFalsy();
        });

        it('should separate items if "showSeparator" is true', async(() => {
            component.showSeparator = true;
            fixture.detectChanges();
            const menuList = fixture.debugElement.query(By.css('[data-tag="menu"]'));
            expect(menuList.nativeElement.classList.contains('fd-menu__list--separated')).toBeTruthy();
        }));
    });

    describe('Grouped Menu', () => {
        let firstItemClicked = false;

        let testdata: any[] = [];

        beforeEach(() => {
            firstItemClicked = false;
            testdata = [
                {
                    label: 'Not a group',
                    icon: 'bed',
                    command: () => { }
                },
                {
                    label: 'Actions',
                    groupItems: [
                        {
                            label: 'First Item',
                            command: () => {
                                firstItemClicked = true;
                            }
                        },
                        {
                            label: 'Second Item',
                            command: () => { }
                        },
                        {
                            label: 'Third Item',
                            command: () => { }
                        }
                    ]
                }
            ];

            component.menu.groups = component.menu.processData(testdata);
            fixture.detectChanges();
        });

        it('should be able to display the labels', () => {
            const menuGroups = fixture.debugElement.queryAll(By.css('[data-tag="menu__group"]'));
            expect(menuGroups.length).toBe(1);

            const firstGroupTitle = fixture.debugElement.query(
                By.css('[data-tag="menu__group"][data-index="1"] [data-tag="menu__group--title"]')
            );
            expect(firstGroupTitle.nativeElement.textContent).toBe(' Actions ');

            const menuItems = fixture.debugElement.queryAll(By.css('[data-tag="menu-item"]'));
            expect(menuItems.length).toBe(4);

            const notAGroupItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="0"]'));
            expect(notAGroupItem.nativeElement.textContent).toBe(' Not a group ');

            const firstItem = fixture.debugElement.query(
                By.css('[data-tag="menu__group"][data-index="1"] [data-tag="menu-item"][data-index="1"]')
            );
            expect(firstItem.nativeElement.textContent).toBe(' First Item ');

            const secondItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="2"]'));
            expect(secondItem.nativeElement.textContent).toBe(' Second Item ');

            const thirdItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="3"]'));
            expect(thirdItem.nativeElement.textContent).toBe(' Third Item ');
        });

        it('should not scroll if "isScrolling" is true but "scrollLimit" is not specified', () => {
            component.isScrolling = true;
            fixture.detectChanges();

            const menuList = fixture.debugElement.query(By.css('[data-tag="menu"]'));
            expect(menuList.nativeElement.classList.contains('scrolling-menu')).toBeFalsy();
        });

        it('should not scroll if "isScrolling" is false but "scrollLimit" is specified', () => {
            component.scrollLimit = 3;
            component.isScrolling = false;
            fixture.detectChanges();
            const menuList = fixture.debugElement.query(By.css('[data-tag="menu"]'));
            expect(menuList.nativeElement.classList.contains('scrolling-menu')).toBeFalsy();
        });
    });

    describe('Selectable Items Menu', () => {
        let firstItemClicked = false;

        let testdata: any[] = [];

        beforeEach(() => {
            firstItemClicked = false;
            testdata = [
                {
                    label: 'First Item',
                    selectable: true,
                    selected: true,
                    command: () => {
                        firstItemClicked = true;
                    }
                },
                {
                    label: 'Second Item',
                    selectable: true,
                    command: () => { }
                },
                {
                    label: 'Third Item',
                    selectable: true,
                    command: () => { }
                }
            ];

            component.menu.groups = component.menu.processData(testdata);
            fixture.detectChanges();
        });

        it('should show selected item', () => {
            const firstItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="0"]'));
            const firstItemIcon = firstItem.query(By.css('[data-tag="menu-item__icon-before"]'));
            expect(firstItemIcon.nativeElement.classList.contains('sap-icon--accept')).toBeTruthy();

            const secondItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="1"]'));
            const secondItemIcon = secondItem.queryAll(By.css('[data-tag="menu-item__icon-before"]'));
            expect(secondItemIcon.length).toBe(0);

            const thirdItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="1"]'));
            const thirdItemIcon = thirdItem.queryAll(By.css('[data-tag="menu-item__icon-before"]'));
            expect(thirdItemIcon.length).toBe(0);
        });

        it('should toggle selectable item on click', () => {
            fixture.detectChanges();
            const firstItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="0"]'));
            const secondItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="1"]'));
            const thirdItem = fixture.debugElement.query(By.css('[data-tag="menu-item"][data-index="2"]'));

            const firstItemButton = fixture.debugElement.query(
                By.css('[data-tag="menu-item"][data-index="0"] [role="button"]')
            );
            const secondItemButton = fixture.debugElement.query(
                By.css('[data-tag="menu-item"][data-index="1"] [role="button"]')
            );
            const thirdItemButton = fixture.debugElement.query(
                By.css('[data-tag="menu-item"][data-index="2"] [role="button"]')
            );

            expect(firstItem.queryAll(By.css('[data-tag="menu-item__icon-before"]')).length).toBe(1);
            expect(secondItem.queryAll(By.css('[data-tag="menu-item__icon-before"]')).length).toBe(0);
            expect(thirdItem.queryAll(By.css('[data-tag="menu-item__icon-before"]')).length).toBe(0);

            secondItemButton.nativeElement.click();
            fixture.detectChanges();
            expect(firstItem.queryAll(By.css('[data-tag="menu-item__icon-before"]')).length).toBe(1);
            expect(secondItem.queryAll(By.css('[data-tag="menu-item__icon-before"]')).length).toBe(1);
            expect(thirdItem.queryAll(By.css('[data-tag="menu-item__icon-before"]')).length).toBe(0);

            thirdItemButton.nativeElement.click();
            fixture.detectChanges();
            expect(firstItem.queryAll(By.css('[data-tag="menu-item__icon-before"]')).length).toBe(1);
            expect(secondItem.queryAll(By.css('[data-tag="menu-item__icon-before"]')).length).toBe(1);
            expect(thirdItem.queryAll(By.css('[data-tag="menu-item__icon-before"]')).length).toBe(1);

            firstItemButton.nativeElement.click();
            fixture.detectChanges();
            expect(firstItem.queryAll(By.css('[data-tag="menu-item__icon-before"]')).length).toBe(0);
            expect(secondItem.queryAll(By.css('[data-tag="menu-item__icon-before"]')).length).toBe(1);
            expect(thirdItem.queryAll(By.css('[data-tag="menu-item__icon-before"]')).length).toBe(1);

            thirdItemButton.nativeElement.click();
            fixture.detectChanges();
            expect(firstItem.queryAll(By.css('[data-tag="menu-item__icon-before"]')).length).toBe(0);
            expect(secondItem.queryAll(By.css('[data-tag="menu-item__icon-before"]')).length).toBe(1);
            expect(thirdItem.queryAll(By.css('[data-tag="menu-item__icon-before"]')).length).toBe(0);
        });
    });

    describe('Selectable Menu with Custom Icons', () => {
        let firstItemClicked = false;

        let testdata: any[] = [];

        beforeEach(() => {
            firstItemClicked = false;
            testdata = [
                {
                    icon: 'favorite',
                    groupItems: [
                        {
                            label: 'First Item',
                            selectable: true,
                            selected: true,
                            command: () => {
                                firstItemClicked = true;
                            }
                        },
                        {
                            label: 'Second Item',
                            selectable: true,
                            selected: true,
                            command: () => { },
                            secondaryIcon: 'sap-icon--grid'
                        },
                        {
                            label: 'Third Item',
                            selectable: true,
                            selected: true,
                            icon: 'bed',
                            command: () => { }
                        }
                    ]
                }
            ];

            component.menu.groups = component.menu.processData(testdata);
            fixture.detectChanges();
        });

        it('should allow for segmented button select icon to be customized', () => {
            const firstItemIcon = fixture.debugElement.query(
                By.css('[data-tag="menu-item"][data-index="0"] [data-tag="menu-item__icon-before"]')
            );
            const secondItemIcon = fixture.debugElement.query(
                By.css('[data-tag="menu-item"][data-index="1"] [data-tag="menu-item__icon-before"]')
            );
            const thirdItemIcon = fixture.debugElement.query(
                By.css('[data-tag="menu-item"][data-index="2"] [data-tag="menu-item__icon-before"]')
            );
            expect(firstItemIcon.nativeElement.classList.contains('sap-icon--favorite')).toBeTruthy();
            expect(secondItemIcon.nativeElement.classList.contains('sap-icon--favorite')).toBeTruthy();
            expect(thirdItemIcon.nativeElement.classList.contains('sap-icon--bed')).toBeTruthy();
        });

        it('should have secondary icon', () => {
            const secondItemIcon = fixture.debugElement.query(
                By.css('[data-tag="menu-item"][data-index="1"] [data-tag="menu-item__icon-after"]')
            );
            expect(secondItemIcon.nativeElement.classList.contains('sap-icon--grid')).toBeTruthy();
        });
    });
});
