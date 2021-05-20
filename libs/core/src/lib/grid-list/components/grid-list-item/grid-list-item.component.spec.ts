import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AvatarModule } from '../../../avatar/public_api';
import { GridListModule } from '../../grid-list.module';
import { GridListComponent } from '../grid-list/grid-list.component';
import { ButtonModule } from '../../../button/button.module';

@Component({
    selector: 'fd-test-grid-list-item',
    template: `
        <fd-grid-list>
            <fd-grid-list-title-bar title="Products"></fd-grid-list-title-bar>

            <fd-grid-list-item
                *ngFor="let item of list"
                [type]="item.type"
                [value]="item.title"
                [status]="item.status"
                [state]="item.state"
                (detail)="detail($event)"
                (draft)="draft($event)"
                (locked)="locked($event)"
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

    list = [
        {
            id: 1,
            title: 'Title 1',
            status: 'success',
            description: 'Description 1'
        },
        {
            id: 2,
            title: 'Title 2',
            status: 'warning',
            state: 'unread',
            description: 'Description 2'
        },
        {
            id: 3,
            title: 'Title 3',
            status: 'error',
            description: 'Description 3',
            type: 'detail',
            state: 'locked'
        },
        {
            id: 4,
            title: 'Title 4',
            description: 'Description 4',
            status: 'neutral',
            state: 'error'
        },
        {
            id: 5,
            title: 'Title 5',
            description: 'Description 5',
            state: 'draft'
        },
        {
            id: 6,
            title: 'Title 6',
            description: 'Description 6'
        }
    ];

    detail(event): void {
        console.log('Detail event', event);
    }

    draft(event): void {
        console.log('Draft event', event);
    }

    locked(event): void {
        console.log('Locked event', event);
    }
}

describe('GridListItemComponent', () => {
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

    it('should display 4 items with statuses', () => {
        const itemsWithStatusesLength = fixture.debugElement.queryAll(By.css('.fd-grid-list__item .fd-grid-list__highlight')).length;
        expect(itemsWithStatusesLength).toEqual(4);
    });

    it('only one item should contain toolbar', () => {
        const toolbarsLength = fixture.debugElement.queryAll(By.css('.fd-grid-list__item .fd-toolbar')).length;
        expect(toolbarsLength).toEqual(1);
    });

    it('should throw Detail event if click on Detail button', () => {
        spyOn(component, 'detail');
        const button = fixture.debugElement.query(By.css('.fd-grid-list__item .fd-button[title="Details"]'));

        button.nativeElement.click();

        fixture.detectChanges();

        expect(component.detail).toHaveBeenCalledWith({ value: 'Title 3', index: 2 });
    });

    it('should throw Draft event if click on Draft button', () => {
        spyOn(component, 'draft');
        const button = fixture.debugElement.query(By.css('.fd-grid-list__item .fd-button[label="Draft"]'));
        button.nativeElement.click();

        fixture.detectChanges();

        expect(component.draft).toHaveBeenCalledWith({ value: 'Title 5', index: 4 });
    });

    it('should throw Locked event if click on Locked button', () => {
        spyOn(component, 'locked');
        const button = fixture.debugElement.query(By.css('.fd-grid-list__item .fd-button[label="Locked"]'));
        button.nativeElement.click();

        fixture.detectChanges();

        expect(component.locked).toHaveBeenCalledWith({ value: 'Title 3', index: 2 });
    });
});
