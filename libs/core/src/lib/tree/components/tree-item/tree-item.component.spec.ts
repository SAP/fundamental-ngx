import { ChangeDetectionStrategy } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectableItemDirective, SelectionService } from '@fundamental-ngx/cdk/utils';
import { DataSourceDirective, FD_DATA_SOURCE_TRANSFORMER } from '@fundamental-ngx/cdk/data-source';
import { IconModule } from '@fundamental-ngx/core/icon';
import { SkeletonModule } from '@fundamental-ngx/core/skeleton';
import { TreeItem } from '../../models/tree-item';
import { TreeDataSourceParser } from '../../data-source/tree-data-source-parser';
import { TreeService } from '../../tree.service';

import { TreeItemComponent } from './tree-item.component';

export class SelectionServiceMock {
    deselectItem(): void {}

    listenToItemInteractions(): void {}
}

describe('TreeItemComponent', () => {
    let component: TreeItemComponent;
    let fixture: ComponentFixture<TreeItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TreeItemComponent],
            imports: [DataSourceDirective, IconModule, SkeletonModule, SelectableItemDirective],
            providers: [
                TreeService,
                {
                    provide: FD_DATA_SOURCE_TRANSFORMER,
                    useClass: TreeDataSourceParser
                },
                {
                    provide: SelectionService,
                    useClass: SelectionServiceMock
                }
            ]
        })
            .overrideComponent(TreeItemComponent, {
                set: { changeDetection: ChangeDetectionStrategy.Default }
            })
            .compileComponents();

        fixture = TestBed.createComponent(TreeItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should add appropriate classes', async () => {
        await fixture.whenRenderingDone();
        expect(component.itemContainer?.nativeElement.querySelector('.fd-tree__expander')?.classList).not.toContain(
            'is-expanded'
        );
        expect(component.itemContainer?.nativeElement.classList).not.toContain('has-highlight-indicator');
        expect(component.itemContainer?.nativeElement.classList).not.toContain('fd-tree__item-container--active');
        expect(component.itemContainer?.nativeElement.classList).not.toContain('fd-tree__content--wrap');
        expect(component.itemContainer?.nativeElement.querySelector('.fd-tree__icon--navigation')).not.toBeTruthy();
        component.children = [
            {
                id: 'id',
                children: [],
                expanded: false,
                navigatable: false,
                navigationIndicator: false,
                glyph: '',
                data: {},
                level: 2
            }
        ] as unknown as TreeItem[];
        component.expanded = true;
        fixture.detectChanges();
        expect(component.itemContainer?.nativeElement.querySelector('.fd-tree__expander')?.classList).toContain(
            'is-expanded'
        );
        component.level = 1;
        component.navigatable = true;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.itemContainer?.nativeElement.classList).toContain('fd-tree__item-container--active');
        component.navigationIndicator = true;
        fixture.detectChanges();
        await fixture.whenStable();
        expect(component.itemContainer?.nativeElement.querySelector('.fd-tree__icon--navigation')).toBeTruthy();
        component.state = 'default';
        fixture.detectChanges();
        expect(component.itemContainer?.nativeElement.classList).toContain('has-highlight-indicator');
        component.wrapContent = true;
        fixture.detectChanges();
        expect(component.itemContainer?.nativeElement.classList).toContain('fd-tree__content--wrap');
    });
});
