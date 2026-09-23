import { DefaultMenuItem } from './default-menu-item.class';
import { MenuKeyboardService } from './menu-keyboard.service';

describe('MenuKeyboardService', () => {
    let service: MenuKeyboardService;
    let menuItems: DefaultMenuItem[];

    beforeEach(() => {
        service = new MenuKeyboardService();
        service.focusEscapeAfterList = jest.fn();
        service.focusEscapeBeforeList = jest.fn();
        const dummy = (): any => ({ focus: jest.fn(), click: jest.fn() });
        menuItems = [dummy(), dummy(), dummy()];
    });

    it('should create an instance', () => {
        expect(service).toBeTruthy();
    });

    it('should focus items based on arrow navigation', () => {
        const index = 1;
        service.keyDownHandler(new KeyboardEvent('keydown', { key: 'ArrowDown' }), index, menuItems);

        expect(menuItems[index + 1].focus).toHaveBeenCalled();

        service.keyDownHandler(new KeyboardEvent('keydown', { key: 'ArrowUp' }), index, menuItems);

        expect(menuItems[index - 1].focus).toHaveBeenCalled();

        expect(service.focusEscapeAfterList).not.toHaveBeenCalled();
        expect(service.focusEscapeBeforeList).not.toHaveBeenCalled();
    });

    it('should select items with space-bar or enter', () => {
        const index = 0;
        service.keyDownHandler(new KeyboardEvent('keydown', { key: ' ' }), index, menuItems);

        expect(menuItems[index].click).toHaveBeenCalled();

        service.keyDownHandler(new KeyboardEvent('keydown', { key: 'Enter' }), index, menuItems);

        expect(menuItems[index].click).toHaveBeenCalledTimes(2);
    });

    it('should focus first item on Home and last item on End', () => {
        const index = 1;

        service.keyDownHandler(new KeyboardEvent('keydown', { key: 'Home' }), index, menuItems);
        expect(menuItems[0].focus).toHaveBeenCalled();

        service.keyDownHandler(new KeyboardEvent('keydown', { key: 'End' }), index, menuItems);
        expect(menuItems[menuItems.length - 1].focus).toHaveBeenCalled();
    });

    it('should skip disabled items for Home and End when disabled metadata exists', () => {
        const enabledDummy = (): any => ({ focus: jest.fn(), click: jest.fn(), disabled: false });
        const disabledDummy = (): any => ({ focus: jest.fn(), click: jest.fn(), disabled: true });
        const itemsWithDisabled = [disabledDummy(), enabledDummy(), disabledDummy(), enabledDummy(), disabledDummy()];

        service.keyDownHandler(new KeyboardEvent('keydown', { key: 'Home' }), 3, itemsWithDisabled);
        expect(itemsWithDisabled[1].focus).toHaveBeenCalled();

        service.keyDownHandler(new KeyboardEvent('keydown', { key: 'End' }), 1, itemsWithDisabled);
        expect(itemsWithDisabled[3].focus).toHaveBeenCalled();
    });

    it('should not interact with items if disabled', () => {
        const index = 1;
        service.disableKeydownHandling = true;

        service.keyDownHandler(new KeyboardEvent('keydown', { key: 'ArrowDown' }), index, menuItems);

        expect(menuItems[index + 1].focus).not.toHaveBeenCalled();

        service.keyDownHandler(new KeyboardEvent('keydown', { key: 'ArrowUp' }), index, menuItems);

        expect(menuItems[index - 1].focus).not.toHaveBeenCalled();

        service.keyDownHandler(new KeyboardEvent('keydown', { key: ' ' }), index, menuItems);
        service.keyDownHandler(new KeyboardEvent('keydown', { key: 'Enter' }), index, menuItems);

        expect(menuItems[index].click).not.toHaveBeenCalled();
    });

    it('should call escape functions', () => {
        let index = menuItems.length - 1;

        service.keyDownHandler(new KeyboardEvent('keydown', { key: 'ArrowDown' }), index, menuItems);

        expect(service.focusEscapeAfterList).toHaveBeenCalled();

        index = 0;

        service.keyDownHandler(new KeyboardEvent('keydown', { key: 'ArrowUp' }), index, menuItems);

        expect(service.focusEscapeBeforeList).toHaveBeenCalled();
    });
});
