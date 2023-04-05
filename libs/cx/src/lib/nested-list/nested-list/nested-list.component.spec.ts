import { Component, ViewChild } from '@angular/core';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { CxNestedListModule } from '../nested-list.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { NestedListStateService } from '../nested-list-state.service';
import { NestedListComponent } from './nested-list.component';
import {
    ContentDensityGlobalKeyword,
    ContentDensityMode,
    LocalContentDensityMode
} from '@fundamental-ngx/core/content-density';

@Component({
    template: `
        <ul fdx-nested-list [textOnly]="true" [fdContentDensity]="contentDensity" #level1List>
            <li fdx-nested-list-item>
                <a fdx-nested-list-link>
                    <span fdx-nested-list-title>Link 1</span>
                </a>
                <ul fdx-nested-list [textOnly]="false">
                    <li fdx-nested-list-item>
                        <a fdx-nested-list-link>
                            <span fdx-nested-list-title>Link 1</span>
                        </a>
                        <ul fdx-nested-list [textOnly]="false" #level3List>
                            <li fdx-nested-list-item>
                                <a fdx-nested-list-link>
                                    <span fdx-nested-list-title>Link 1</span>
                                </a>
                            </li>
                            <ul fdx-nested-list [textOnly]="false" #level4List>
                                <li fdx-nested-list-item>
                                    <a fdx-nested-list-link>
                                        <span fdx-nested-list-title>Link 1</span>
                                    </a>
                                </li>
                            </ul>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    `
})
class TestNestedContainerComponent {
    contentDensity: LocalContentDensityMode = ContentDensityGlobalKeyword;

    @ViewChild('level4List', { static: true, read: NestedListComponent })
    level4List: NestedListComponent;

    @ViewChild('level3List', { static: true, read: NestedListComponent })
    level3List: NestedListComponent;

    @ViewChild('level1List', { static: true, read: NestedListComponent })
    level1List: NestedListComponent;
}

describe('NestedListDirective', () => {
    let component: TestNestedContainerComponent;
    let fixture: ComponentFixture<TestNestedContainerComponent>;
    let level1List: NestedListComponent;
    let level3List: NestedListComponent;
    let level4List: NestedListComponent;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [CxNestedListModule],
            declarations: [TestNestedContainerComponent],
            providers: [NestedListKeyboardService, MenuKeyboardService, NestedListStateService]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(TestNestedContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        level1List = component.level1List;
        level3List = component.level3List;
        level4List = component.level4List;
        fixture.detectChanges();
    });

    it('Should add classes', () => {
        component.contentDensity = ContentDensityMode.COMPACT;
        fixture.detectChanges();
        expect((level1List as any)._elementRef.nativeElement.classList.contains('fdx-nested-list')).toBeTruthy();
        expect(
            (level1List as any)._elementRef.nativeElement.classList.contains('fdx-nested-list--text-only')
        ).toBeTruthy();
        expect((level1List as any)._elementRef.nativeElement.classList.contains('is-compact')).toBeTruthy();
        expect((level1List as any)._elementRef.nativeElement.classList.contains('level-1')).toBeTruthy();
        expect((level3List as any)._elementRef.nativeElement.classList.contains('level-3')).toBeTruthy();
        expect((level4List as any)._elementRef.nativeElement.classList.contains('level-4')).toBeTruthy();
    });

    it('should handle content density when compact input is not provided', () => {
        component.contentDensity = ContentDensityGlobalKeyword;
        fixture.detectChanges();
        expect(
            fixture.nativeElement.querySelector('ul:first-of-type').classList.contains('fdx-nested-list--compact')
        ).toBe(false);
    });
});
