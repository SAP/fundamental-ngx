import { Component, ViewChild } from '@angular/core';
import { MenuKeyboardService } from '../../menu/menu-keyboard.service';
import { NestedListModule } from '../nested-list.module';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NestedListKeyboardService } from '../nested-list-keyboard.service';
import { NestedListStateService } from '../nested-list-state.service';
import { NestedListDirective } from './nested-list.directive';

@Component({
    template: `
        <ul fd-nested-list [textOnly]="true" [compact]="true" #level1List>
            <li fd-nested-list-item>
                <a fd-nested-list-link>
                    <span fd-nested-list-title>Link 1</span>
                </a>
                <ul fd-nested-list [textOnly]="false">
                    <li fd-nested-list-item>
                        <a fd-nested-list-link>
                            <span fd-nested-list-title>Link 1</span>
                        </a>
                        <ul fd-nested-list [textOnly]="false" #level3List>
                            <li fd-nested-list-item>
                                <a fd-nested-list-link>
                                    <span fd-nested-list-title>Link 1</span>
                                </a>
                            </li>
                            <ul fd-nested-list [textOnly]="false" #level4List>
                                <li fd-nested-list-item>
                                    <a fd-nested-list-link>
                                        <span fd-nested-list-title>Link 1</span>
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
    @ViewChild('level4List', { static: true, read: NestedListDirective })
    level4List: NestedListDirective;

    @ViewChild('level3List', { static: true, read: NestedListDirective })
    level3List: NestedListDirective;

    @ViewChild('level1List', { static: true, read: NestedListDirective })
    level1List: NestedListDirective;
}

describe('NestedListDirective', () => {
    let component: TestNestedContainerComponent;
    let fixture: ComponentFixture<TestNestedContainerComponent>;
    let level1List: NestedListDirective;
    let level3List: NestedListDirective;
    let level4List: NestedListDirective;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [NestedListModule],
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
        expect((level1List as any)._elementRef.nativeElement.classList.contains('fd-nested-list')).toBeTruthy();
        expect(
            (level1List as any)._elementRef.nativeElement.classList.contains('fd-nested-list--text-only')
        ).toBeTruthy();
        expect(
            (level1List as any)._elementRef.nativeElement.classList.contains('fd-nested-list--compact')
        ).toBeTruthy();
        expect((level1List as any)._elementRef.nativeElement.classList.contains('level-1')).toBeTruthy();
        expect((level3List as any)._elementRef.nativeElement.classList.contains('level-3')).toBeTruthy();
        expect((level4List as any)._elementRef.nativeElement.classList.contains('level-4')).toBeTruthy();
    });
});
