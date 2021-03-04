import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import '@angular/localize/init';
import { By } from '@angular/platform-browser';
import { AvatarModule } from '../../../avatar/public_api';
import { GridListModule } from '../../grid-list.module';
import { GridListComponent, GridListSelectionMode } from './grid-list.component';
import { ButtonModule } from '../../../button/button.module';

@Component({
    selector: 'fd-test-grid-list',
    template: `
        <fd-grid-list [selectionMode]="selectionMode" (selectionChange)="selectionChange($event)">
            <fd-grid-list-title-bar title="Products"></fd-grid-list-title-bar>

            <fd-grid-list-item
                *ngFor="let item of list"
                [type]="item.type"
                [value]="item.title"
                [counter]="item.counter"
                (navigate)="navigate($event)"
                (delete)="delete($event)"
            >
                <div class="fd-grid-list-item-body--container">
                    <fd-avatar image="https://picsum.photos/id/1062/300/200" size="s"></fd-avatar>
                    <div class="fd-grid-list-item-body--content">
                        <h4 class="fd-title fd-title--h4" [innerText]="item.title"></h4>
                        <p [innerText]="item.description"></p>
                        <div class="fd-grid-list-item-body--content-address">
                            <p>781 Main Street</p>
                            <p>Anytown, SD 57401</p>
                            <p>USA</p>
                        </div>

                        <a href="#" class="fd-link" tabindex="0">john_li@example.com</a>
                    </div>
                </div>
            </fd-grid-list-item>
        </fd-grid-list>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
class TestComponent {
    @ViewChild(GridListComponent)
    gridListComponent: GridListComponent<any>;

    selectionMode: GridListSelectionMode = 'none';

    list = [
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

    constructor(private readonly _cd: ChangeDetectorRef) {}

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
}

describe('GridListComponent', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;
    let gridListComponent: GridListComponent<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent, GridListComponent],
            imports: [GridListModule, AvatarModule, ButtonModule]
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

    it('toolbar should contain counter and button', () => {
        const counters = fixture.debugElement.queryAll(By.css('.fd-grid-list__item .fd-grid-list__item-counter'));
        expect(counters.length).toEqual(1);
        expect(counters[0].nativeElement.innerText).toEqual('15');

        const buttons = fixture.debugElement.queryAll(By.css('.fd-grid-list__item .fd-button'));
        expect(buttons.length).toEqual(1);
        expect(buttons[0].nativeElement.getAttribute('title')).toEqual('Navigation');
    });

    it('should throw Navigation event if click on Navigation button', () => {
        spyOn(component, 'navigate');
        const button = fixture.debugElement.query(By.css('.fd-grid-list__item .fd-toolbar .fd-button'));
        button.nativeElement.click();

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
        spyOn(component, 'delete');
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
        spyOn(component, 'selectionChange');

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

    it('Multi Select mode: should throw selection events if select item', () => {
        component.setMode('multiSelect');
        spyOn(component, 'selectionChange');

        fixture.detectChanges();

        const radioButtons = fixture.debugElement.queryAll(By.css('.fd-grid-list__item .fd-checkbox'));
        radioButtons[4].nativeElement.click();

        fixture.detectChanges();

        let selectedItemEvent = { added: ['Title 5'], index: [4], removed: [], selection: ['Title 5'] };
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
});
