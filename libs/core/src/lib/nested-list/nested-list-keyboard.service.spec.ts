import { NestedListKeyboardService } from './nested-list-keyboard.service';
import { MenuKeyboardService } from '@fundamental-ngx/core/menu';
import { Subject } from 'rxjs';

class MockNestedLink {
    selected?: boolean;
    controlSelected?: boolean;
}

class MockNestedItem {
    linkItem: MockNestedLink;
    keyboardTriggered = new Subject<KeyboardEvent>();
    hasChildren: boolean;
    triggerOpen = (): void => {};
    triggerClose = (): void => {};
    focus = (): void => {};
    click = (): void => {};

    constructor(readonly allChildrenItems: MockNestedItem[] = [], public expanded: boolean = true) {}
}

interface MockNestedList {
    nestedItems: MockNestedItem[];
}

describe('NestedListKeyboardSupportService', () => {
    let object: MockNestedList;

    let service: NestedListKeyboardService;

    const toArray = (): MockNestedItem[] => [
        new MockNestedItem([
            new MockNestedItem(),
            new MockNestedItem(),
            new MockNestedItem([new MockNestedItem(), new MockNestedItem()])
        ]),
        new MockNestedItem(),
        new MockNestedItem(),
        new MockNestedItem(),
        new MockNestedItem()
    ];

    beforeEach(() => {
        object = {
            nestedItems: toArray()
        };
        service = new NestedListKeyboardService(new MenuKeyboardService());
    });

    it('Should return all of the items', () => {
        const resultItems = (service as any)._getAllListItems(<any>object);

        expect(resultItems.length).toBe(10);
    });

    it('Should handle focus other element', () => {
        const items = (<any>service)._getAllListItems(<any>object);

        const spy = jest.spyOn(items[1], 'focus');

        const keyboardEvent: any = { preventDefault: () => {}, key: 'ArrowDown' };

        (<any>service)._handleKeyDown(keyboardEvent, 0, items);

        expect(spy).toHaveBeenCalled();
    });

    it('Should handle open trigger on element', () => {
        const items = (<any>service)._getAllListItems(<any>object);

        items[0].expanded = false;
        items[0].hasChildren = true;

        const spyOne = jest.spyOn(items[0], 'triggerOpen');

        const spyTwo = jest.spyOn(items[1], 'focus');

        const keyboardEvent: any = { preventDefault: () => {}, key: 'ArrowRight' };

        (<any>service)._handleKeyDown(keyboardEvent, 0, items);

        expect(spyTwo).not.toHaveBeenCalled();
        expect(spyOne).toHaveBeenCalled();
    });

    it('Should handle close trigger on element', () => {
        const items = (<any>service)._getAllListItems(<any>object);

        items[0].expanded = true;
        items[0].hasChildren = true;

        const spyOne = jest.spyOn(items[0], 'triggerClose');

        const spyNine = jest.spyOn(items[9], 'focus');

        const keyboardEvent: any = { preventDefault: () => {}, key: 'ArrowLeft' };

        (<any>service)._handleKeyDown(keyboardEvent, 0, items);

        expect(spyNine).not.toHaveBeenCalled();
        expect(spyOne).toHaveBeenCalled();
    });

    it('Should focus last element', () => {
        const items = (<any>service)._getAllListItems(<any>object);

        items[0].expanded = false;
        items[0].hasChildren = true;

        const spy = jest.spyOn(items[items.length - 1], 'focus');

        const keyboardEvent: any = { preventDefault: () => {}, key: 'ArrowUp' };

        (<any>service)._handleKeyDown(keyboardEvent, 0, items);

        expect(spy).toHaveBeenCalled();
    });

    it('Should focus first element', () => {
        const items = (<any>service)._getAllListItems(<any>object);

        items[items.length - 1].expanded = false;
        items[items.length - 1].hasChildren = false;

        const spy = jest.spyOn(items[0], 'focus');

        const keyboardEvent: any = { preventDefault: () => {}, key: 'ArrowDown' };

        (<any>service)._handleKeyDown(keyboardEvent, items.length - 1, items);

        expect(spy).toHaveBeenCalled();
    });
});
