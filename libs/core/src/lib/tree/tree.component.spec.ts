import { Component, ElementRef, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FD_DATA_SOURCE_TRANSFORMER } from '@fundamental-ngx/cdk/data-source';
import { SelectionService } from '@fundamental-ngx/cdk/utils';
import { IconModule } from '@fundamental-ngx/core/icon';
import { Observable, of } from 'rxjs';
import { SelectionServiceMock } from './components/tree-item/tree-item.component.spec';
import { TreeDataSourceParser } from './data-source/tree-data-source-parser';
import { SelectionPlacement, SelectionType } from './models/selection-type';
import { TreeItem } from './models/tree-item';
import { TreeComponent } from './tree.component';
import { TreeModule } from './tree.module';
import { TreeService } from './tree.service';

interface TreeItemData {
    title: string;
    value: string;
    icon: string;
}

@Component({
    selector: 'fd-tree-with-projected-nodes',
    template: `
        <fd-tree
            class="fd-custom-tree-class"
            [(ngModel)]="model"
            [selection]="selection"
            [selectionPlacement]="selectionPlacement"
            [noBorder]="noBorder"
        >
            <fd-tree-item value="first">
                <fd-icon fdTreeItemIcon glyph="account"></fd-icon>
                <span fdTreeItemText>Item 1 (Level 1)</span>
            </fd-tree-item>
            <fd-tree-item value="second" [expanded]="expanded" #itemWithChildren>
                <fd-icon fdTreeItemIcon glyph="e-care"></fd-icon>
                <span fdTreeItemText>Item 2 (Level 1)</span>
                <fd-tree-item value="third" [expanded]="expanded">
                    <span fdTreeItemText>Item 1 (Level 2)</span>
                    <fd-tree-item value="fourth">
                        <span fdTreeItemText>Item 1 (Level 3)</span>
                        <fd-tree-item value="fifth">
                            <span fdTreeItemText>Item 1 (Level 4)</span>
                            <fd-tree-item value="sixth">
                                <span fdTreeItemText>Item 1 (Level 5)</span>
                            </fd-tree-item>
                        </fd-tree-item>
                    </fd-tree-item>
                </fd-tree-item>
                <fd-tree-item value="seventh">
                    <span fdTreeItemText>Item 2 (Level 2)</span>
                </fd-tree-item>
            </fd-tree-item>
            <fd-tree-item>
                <fd-icon fdTreeItemIcon glyph="phone"></fd-icon>
                <span fdTreeItemText>Item 3 (Level 1)</span>
            </fd-tree-item>
        </fd-tree>
    `
})
export class ProjectedTreeItemsComponent {
    @ViewChild(TreeComponent)
    tree: TreeComponent<any>;

    @ViewChild(TreeComponent, { read: ElementRef })
    treeElement: ElementRef<HTMLElement>;

    @ViewChild('itemWithChildren', { read: ElementRef })
    treeItemElement: ElementRef<HTMLElement>;

    model = '';

    selection: SelectionType = 'none';
    selectionPlacement: SelectionPlacement = 'none';
    noBorder = false;
    expanded = false;
}

@Component({
    selector: 'fd-tree-with-observable',
    template: `
        <fd-tree [dataSource]="dataSource">
            <fd-tree-item
                *fdTreeItemDef="let item"
                [level]="item.level"
                [navigatable]="item.navigatable"
                [navigationIndicator]="item.navigationIndicator"
                [childNodes]="item.children"
                [expanded]="item.expanded"
                [parentId]="item.parentId"
                [id]="item.id"
            >
                <span fdTreeItemText>{{ item.data.title }}</span>
            </fd-tree-item>
        </fd-tree>
    `
})
export class DataSourceTreeComponent {
    dataSource: Observable<Partial<TreeItem<TreeItemData>>[]> = of([
        {
            navigatable: true,
            expanded: false,
            navigationIndicator: true,
            data: {
                icon: 'e-care',
                title: 'Item 1 (Level 1)',
                value: 'first'
            },
            children: [
                {
                    navigatable: true,
                    expanded: false,
                    data: {
                        icon: 'product',
                        title: 'Item 1 (Level 2)',
                        value: 'second'
                    },
                    children: [
                        {
                            navigatable: false,
                            expanded: true,
                            data: {
                                icon: 'competitor',
                                title: 'Item 1 (Level 3)',
                                value: 'third'
                            },
                            children: [
                                {
                                    navigatable: false,
                                    expanded: true,
                                    data: {
                                        icon: 'competitor',
                                        title: 'Item 1 (Level 4)',
                                        value: 'fourth'
                                    }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            navigatable: true,
            expanded: true,
            data: {
                icon: 'e-care',
                title: 'Item 1(Level 1)',
                value: 'fifth'
            }
        }
    ]);

    @ViewChild(TreeComponent)
    tree: TreeComponent<any>;

    @ViewChild(TreeComponent, { read: ElementRef })
    treeElement: ElementRef<HTMLElement>;
}

describe('Tree component with projected nodes', () => {
    let component: ProjectedTreeItemsComponent;
    let tree: TreeComponent<any>;
    let treeElement: ElementRef<HTMLElement>;
    let fixture: ComponentFixture<ProjectedTreeItemsComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProjectedTreeItemsComponent],
            imports: [TreeModule, IconModule, FormsModule],
            providers: [
                TreeService,
                {
                    provide: FD_DATA_SOURCE_TRANSFORMER,
                    useClass: TreeDataSourceParser
                }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ProjectedTreeItemsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
        tree = component.tree;
        treeElement = component.treeElement;
    });

    it('should create', () => {
        expect(tree).toBeTruthy();
    });

    it('should render tree without border', () => {
        expect(treeElement.nativeElement.classList).not.toContain('fd-tree--no-border');
        component.noBorder = true;
        fixture.detectChanges();

        expect(treeElement.nativeElement.classList).toContain('fd-tree--no-border');
    });

    it('should render icon and text from projected directives', () => {
        // First item
        expect(treeElement.nativeElement.querySelector('.fd-tree__text')?.textContent).toEqual('Item 1 (Level 1)');
        expect(treeElement.nativeElement.querySelector('.fd-tree__icon')?.classList).toContain('sap-icon--account');
    });

    it('should create nested level when expanded', () => {
        expect(component.treeItemElement.nativeElement.querySelector('.fd-tree')).toBeFalsy();
        component.expanded = true;
        fixture.detectChanges();
        expect(component.treeItemElement.nativeElement.querySelector('.fd-tree')).toBeTruthy();
        expect(component.treeItemElement.nativeElement.querySelector('.fd-tree .fd-tree__item')).toBeTruthy();
        expect(treeElement.nativeElement.classList).toContain('expanded-level-2');
    });

    it('should enable selection', async () => {
        component.selection = 'single';
        component.selectionPlacement = 'none';
        fixture.detectChanges();
        expect(treeElement.nativeElement.querySelector('fd-radio-button')).toBeFalsy();
        expect(treeElement.nativeElement.querySelector('fd-checkbox')).toBeFalsy();
        component.selectionPlacement = 'left';
        fixture.detectChanges();
        expect(treeElement.nativeElement.querySelector('fd-radio-button')).toBeTruthy();
        expect(treeElement.nativeElement.querySelector('fd-checkbox')).toBeFalsy();
        component.selection = 'multiple';
        fixture.detectChanges();
        expect(treeElement.nativeElement.querySelector('fd-radio-button')).toBeFalsy();
        expect(treeElement.nativeElement.querySelector('fd-checkbox')).toBeTruthy();
    });

    it('should mark selected value', async () => {
        component.selection = 'single';
        component.selectionPlacement = 'none';
        component.model = 'first';
        fixture.detectChanges();
        fixture.detectChanges();
        await fixture.whenStable();
        expect(
            treeElement.nativeElement.querySelector('.fd-tree__item-container.is-selected .fd-tree__text')?.textContent
        ).toEqual('Item 1 (Level 1)');
        component.model = 'second';
        fixture.detectChanges();
        await fixture.whenStable();
        expect(
            treeElement.nativeElement.querySelector('.fd-tree__item-container.is-selected .fd-tree__text')?.textContent
        ).toEqual('Item 2 (Level 1)');
        fixture.detectChanges();
    });
});

describe('Tree component with data source and tree item template', () => {
    let component: DataSourceTreeComponent;
    let tree: TreeComponent<any>;
    let treeElement: ElementRef<HTMLElement>;
    let fixture: ComponentFixture<DataSourceTreeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DataSourceTreeComponent],
            imports: [TreeModule, IconModule],
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
        }).compileComponents();

        fixture = TestBed.createComponent(DataSourceTreeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
        tree = component.tree;
        treeElement = component.treeElement;
    });

    it('should create', () => {
        expect(tree).toBeTruthy();
    });

    it('should render data source items', () => {
        expect(treeElement.nativeElement.querySelectorAll('.fd-tree__item').length).not.toEqual(0);
    });
});
