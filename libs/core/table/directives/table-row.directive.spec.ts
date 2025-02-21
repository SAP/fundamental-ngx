import { Component, ViewChild } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TableModule } from '../table.module';
import { TableService } from '../table.service';
import { HIDDEN_CLASS_NAME, TableRowDirective } from './table-row.directive';

@Component({
    template: `
        <tr #directiveElement fd-table-row id="row">
            @for (key of keys; track key) {
                <td fd-table-cell [key]="key">{{ key }}</td>
            }
        </tr>
    `,
    standalone: true,
    imports: [TableModule]
})
class TestComponent {
    @ViewChild(TableRowDirective)
    tableRow: TableRowDirective;

    keys: string[] = ['key1', 'key2', 'key3', 'key4'];

    getElements(): HTMLCollection {
        return (document.getElementById('row') as HTMLElement).children;
    }
}

describe('TableRowDirective', () => {
    let component: TestComponent;
    let fixture: ComponentFixture<TestComponent>;

    const getElements = (): Element[] => {
        const _elements = component.getElements();

        const result: Element[] = [];

        for (let i = 0; i < _elements.length; i++) {
            result.push(_elements[i]);
        }

        return result;
    };

    const getInnerTextFromNodes = (): string[] => getElements().map((cell) => cell.innerHTML);

    const getVisibleCells = (): string[] =>
        getElements()
            .filter((cell) => !cell.classList.contains(HIDDEN_CLASS_NAME))
            .map((cell) => cell.innerHTML);

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [TestComponent],
            providers: [TableService]
        }).compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should sort elements', async () => {
        let keys = component.keys;

        expect(getInnerTextFromNodes()).toEqual(keys);

        keys = [...component.keys].reverse();

        (<any>component.tableRow)._resetCells(keys);

        fixture.detectChanges();
        await fixture.whenStable();

        const textFromNodes = getInnerTextFromNodes();

        expect(textFromNodes).toEqual(keys);

        keys = [component.keys[1], component.keys[0], component.keys[3], component.keys[2]];

        (<any>component.tableRow)._resetCells(keys);

        fixture.detectChanges();

        expect(getInnerTextFromNodes()).toEqual(keys);
    });

    it('should hide elements', () => {
        let keys = component.keys;

        expect(getInnerTextFromNodes()).toEqual(keys);

        component.keys.pop();

        keys = component.keys;

        (<any>component.tableRow)._resetCells(keys);

        fixture.detectChanges();

        expect(getVisibleCells()).toEqual(keys);

        component.keys.pop();

        keys = component.keys;

        (<any>component.tableRow)._resetCells(keys);

        fixture.detectChanges();

        expect(getVisibleCells()).toEqual(keys);
    });
});
