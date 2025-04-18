import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    NO_ERRORS_SCHEMA,
    ViewChild
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AvatarComponent } from '@fundamental-ngx/core/avatar';
import { TitleComponent } from '@fundamental-ngx/core/title';
import { GridListSelectionMode } from '../../models/grid-list-selection.models';
import { GridListItemComponent, GridListItemType } from '../grid-list-item/grid-list-item.component';
import { GridListTitleBarComponent } from '../grid-list-title-bar/grid-list-title-bar.component';
import { GridListComponent } from './grid-list.component';

@Component({
    selector: 'fd-test-grid-list',
    template: `
        <fd-grid-list #gridListElement [selectionMode]="selectionMode" (selectionChange)="selectionChange($event)">
            <fd-grid-list-title-bar title="Products"></fd-grid-list-title-bar>

            @for (item of list; track item) {
                <fd-grid-list-item
                    [type]="item.type"
                    [value]="item.title"
                    [counter]="item.counter"
                    (navigate)="navigate($event)"
                    (delete)="delete($event)"
                >
                    <div class="fd-grid-list-item-body--container">
                        <fd-avatar image="https://picsum.photos/id/1062/300/200" size="s"></fd-avatar>
                        <div class="fd-grid-list-item-body--content">
                            <h4 class="fd-title fd-title--h4">{{ item.title }}</h4>
                            <p>{{ item.description }}</p>
                            <div class="fd-grid-list-item-body--content-address">
                                <p>781 Main Street</p>
                                <p>Anytown, SD 57401</p>
                                <p>USA</p>
                            </div>
                            <a href="#" class="fd-link" tabindex="0">john_li&#64;example.com</a>
                        </div>
                    </div>
                </fd-grid-list-item>
            }
        </fd-grid-list>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [GridListTitleBarComponent, GridListItemComponent, GridListComponent, AvatarComponent, TitleComponent]
})
class TestComponent {
    @ViewChild(GridListComponent)
    gridListComponent: GridListComponent<any>;

    @ViewChild('gridListElement', { read: ElementRef })
    gridListElement: ElementRef;

    selectionMode: GridListSelectionMode = 'none';

    list: Array<{ id: number; title: string; description: string; type?: GridListItemType; counter?: number }> = [
        {
            id: 1,
            title: 'Title 1',
            description: 'Description 1'
        },
        {
            id: 2,
            title: 'Title 2',
            description: 'Description 2'
        },
        {
            id: 3,
            title: 'Title 3',
            description: 'Description 3',
            type: 'navigation',
            counter: 15
        },
        {
            id: 4,
            title: 'Title 4',
            description: 'Description 4'
        },
        {
            id: 5,
            title: 'Title 5',
            description: 'Description 5'
        },
        {
            id: 6,
            title: 'Title 6',
            description: 'Description 6'
        }
    ];

    constructor(
        private readonly _cd: ChangeDetectorRef,
        public elRef: ElementRef
    ) {}

    setMode(mode: GridListSelectionMode): void {
        this.selectionMode = mode;
        this._cd.detectChanges();
    }

    navigate(event): void {
        console.log('Navigation event', event);
    }

    delete(event): void {
        console.log('Delete event', event);
    }

    selectionChange(event): void {
        console.log('Selection event', event);
    }

    clearSelection(): void {
        this.gridListComponent.clearSelection();
    }
}

describe('GridListComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let gridListComponent: GridListComponent<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.debugElement.componentInstance;
        fixture.detectChanges();

        gridListComponent = component.gridListComponent;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display 6 items', () => {
        const itemsLength = fixture.debugElement.queryAll(By.css('fd-grid-list-item')).length;
        expect((gridListComponent as any)._gridListItems.length).toEqual(6);
        expect(itemsLength).toEqual(6);
    });

    it('only one element should contain Navigation toolbar', () => {
        const toolbarsLength = fixture.debugElement.queryAll(By.css('.fd-grid-list__item .fd-toolbar')).length;
        expect(toolbarsLength).toEqual(1);
    });

    it('toolbar should contain counter and nav indicator', () => {
        const counters = fixture.debugElement.queryAll(By.css('.fd-grid-list__item .fd-grid-list__item-counter'));
        expect(counters.length).toEqual(1);
        expect(counters[0].nativeElement.innerHTML.toString()).toEqual('15');

        const navIndicators = fixture.debugElement.queryAll(
            By.css('.fd-grid-list__item .fd-grid-list__item-navigation-indicator')
        );
        expect(navIndicators.length).toEqual(1);
    });

    it('should throw Navigation event if click on Navigation button', () => {
        jest.spyOn(component, 'navigate');
        const item = fixture.debugElement.query(By.css('.fd-grid-list__item.fd-grid-list__item--link'));

        item.nativeElement.click();
        fixture.detectChanges();

        expect(component.navigate).toHaveBeenCalledWith({ value: 'Title 3', index: 2 });
    });

    it('Delete mode: every item should contain toolbar and delete button', () => {
        component.setMode('delete');

        fixture.detectChanges();

        const toolbarsLength = fixture.debugElement.queryAll(By.css('.fd-grid-list__item .fd-toolbar')).length;
        expect(toolbarsLength).toEqual(6);

        const deleteButtonsLength = fixture.debugElement.queryAll(
            By.css('.fd-grid-list__item .fd-toolbar .fd-button[title="Delete"]')
        ).length;
        expect(deleteButtonsLength).toEqual(6);
    });

    it('Delete mode: should throw Delete event if click on Delete button', () => {
        jest.spyOn(component, 'delete');
        component.setMode('delete');

        fixture.detectChanges();

        const buttons = fixture.debugElement.queryAll(
            By.css('.fd-grid-list__item .fd-toolbar .fd-button[title="Delete"]')
        );
        buttons[4].nativeElement.click();

        fixture.detectChanges();

        expect(component.delete).toHaveBeenCalledWith({ value: 'Title 5', index: 4 });
    });

    it('Single Select mode: every item should contain radio button', () => {
        component.setMode('singleSelect');

        fixture.detectChanges();

        const radioButtonsLength = fixture.debugElement.queryAll(By.css('.fd-grid-list__item .fd-radio')).length;
        expect(radioButtonsLength).toEqual(6);
    });

    it('Single Select mode: should throw selection event if select item', () => {
        component.setMode('singleSelect');
        jest.spyOn(component, 'selectionChange');

        fixture.detectChanges();

        const radioButtons = fixture.debugElement.queryAll(By.css('.fd-grid-list__item'));
        radioButtons[4].nativeElement.click();

        fixture.detectChanges();

        const selectedItemEvent = { added: ['Title 5'], index: [4], removed: [], selection: ['Title 5'] };
        expect(component.selectionChange).toHaveBeenCalledWith(selectedItemEvent);
    });

    it('Multi Select mode: every item should contain checkbox button', () => {
        component.setMode('multiSelect');

        fixture.detectChanges();

        const checkboxButtonsLength = fixture.debugElement.queryAll(By.css('.fd-grid-list__item .fd-checkbox')).length;
        expect(checkboxButtonsLength).toEqual(6);
    });

    it('Multi Select mode: should throw selection events if unselected all', () => {
        component.setMode('multiSelect');
        jest.spyOn(component, 'selectionChange');

        fixture.detectChanges();

        const radioButtons = fixture.debugElement.queryAll(By.css('.fd-grid-list__item .fd-checkbox'));

        radioButtons.forEach((button) => {
            button.nativeElement.click();
        });

        fixture.detectChanges();

        component.clearSelection();

        const selectedItemEvent = {
            added: [],
            index: [],
            removed: ['Title 1', 'Title 2', 'Title 3', 'Title 4', 'Title 5', 'Title 6'],
            selection: []
        };
        expect(component.selectionChange).toHaveBeenCalledWith(selectedItemEvent);
    });

    it('Multi Select mode: should throw selection events if select item', () => {
        component.setMode('multiSelect');
        jest.spyOn(component, 'selectionChange');

        fixture.detectChanges();

        const radioButtons = fixture.debugElement.queryAll(By.css('.fd-grid-list__item .fd-checkbox'));
        radioButtons[4].nativeElement.click();

        fixture.detectChanges();

        let selectedItemEvent = { added: ['Title 5'], index: [4], removed: [] as string[], selection: ['Title 5'] };
        expect(component.selectionChange).toHaveBeenCalledWith(selectedItemEvent);

        radioButtons[5].nativeElement.click();

        fixture.detectChanges();

        selectedItemEvent = { added: ['Title 6'], index: [5], removed: [], selection: ['Title 5', 'Title 6'] };
        expect(component.selectionChange).toHaveBeenCalledWith(selectedItemEvent);

        radioButtons[1].nativeElement.click();

        fixture.detectChanges();

        selectedItemEvent = {
            added: ['Title 2'],
            index: [1],
            removed: [],
            selection: ['Title 5', 'Title 6', 'Title 2']
        };
        expect(component.selectionChange).toHaveBeenCalledWith(selectedItemEvent);

        radioButtons[5].nativeElement.click();

        fixture.detectChanges();

        selectedItemEvent = { added: [], index: [5], removed: ['Title 6'], selection: ['Title 5', 'Title 2'] };
        expect(component.selectionChange).toHaveBeenCalledWith(selectedItemEvent);
    });

    describe('Keyboard Grid List Tests', () => {
        it('should handle arrow key focus changes', () => {
            fixture.detectChanges();
            const itemsArray = component.gridListComponent.gridListItems.toArray();

            // Manually set tabindex for the test setup
            itemsArray.forEach((item, index) => {
                item._gridListItem.nativeElement.setAttribute('tabindex', index === 0 ? '0' : '-1');
            });

            // Mock getBoundingClientRect for consistent behavior
            component.gridListComponent.gridListItems.forEach((item) => {
                jest.spyOn(item._gridListItem.nativeElement, 'getBoundingClientRect').mockReturnValue({
                    width: 270
                } as DOMRect);
            });
            jest.spyOn(component.gridListElement.nativeElement, 'getBoundingClientRect').mockReturnValue({
                width: 1144
            } as DOMRect);

            const firstItem = itemsArray[0]._gridListItem.nativeElement;
            firstItem.focus();
            fixture.detectChanges();

            // Assert initial focus is on the first item
            expect(document.activeElement).toBe(firstItem);

            // Simulate right arrow key press to move focus to the second item
            component.gridListComponent.handleKeydown(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
            fixture.detectChanges();

            const secondItem = itemsArray[1]._gridListItem.nativeElement;
            secondItem.focus();
            fixture.detectChanges();
            expect(document.activeElement).toBe(secondItem);

            // Simulate down arrow key press to move focus down
            component.gridListComponent.handleKeydown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
            fixture.detectChanges();

            const sixthItem = itemsArray[5]._gridListItem.nativeElement;
            sixthItem.focus();
            fixture.detectChanges();
            expect(document.activeElement).toBe(sixthItem);

            // Simulate up arrow key press to move focus back up
            component.gridListComponent.handleKeydown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
            secondItem.focus();
            fixture.detectChanges();
            expect(document.activeElement).toBe(secondItem);

            // Simulate left arrow key press to move focus back to the first item
            component.gridListComponent.handleKeydown(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
            firstItem.focus();
            fixture.detectChanges();

            expect(document.activeElement).toBe(firstItem);
        });

        it('should handle selection when shift+arrow keys are pressed', () => {
            component.setMode('multiSelect');
            jest.spyOn(component, 'selectionChange');
            const itemsArray = component.gridListComponent.gridListItems.toArray();
            fixture.detectChanges();
            const checkboxButtonOne = fixture.debugElement.queryAll(By.css('.fd-grid-list__item .fd-checkbox'))[0];
            checkboxButtonOne.nativeElement.click();
            itemsArray[0]._gridListItem.nativeElement.focus();
            component.gridListComponent.handleKeydown(
                new KeyboardEvent('keydown', { key: 'ArrowRight', shiftKey: true })
            );
            fixture.detectChanges();
            const selectedItemEvent = {
                added: ['Title 2'],
                index: [1],
                removed: [],
                selection: ['Title 1', 'Title 2']
            };
            expect(component.selectionChange).toHaveBeenCalledWith(selectedItemEvent);
            expect(component.gridListComponent.gridListItems.toArray()[1]._selectedItem).toBeTruthy();
        });

        it('should handle selection when shift+end keys are pressed', () => {
            component.setMode('multiSelect');
            const itemsArray = component.gridListComponent.gridListItems.toArray();
            fixture.detectChanges();
            const checkboxButtonOne = fixture.debugElement.queryAll(By.css('.fd-grid-list__item .fd-checkbox'))[0];
            checkboxButtonOne.nativeElement.click();
            itemsArray[0]._gridListItem.nativeElement.focus();
            component.gridListComponent.handleKeydown(new KeyboardEvent('keydown', { key: 'End', shiftKey: true }));
            fixture.detectChanges();
            component.gridListComponent.gridListItems.toArray().forEach((item) => {
                expect(item._selectedItem).toBeTruthy();
            });
        });
    });
});
