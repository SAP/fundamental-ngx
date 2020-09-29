import { MenuKeyboardService } from './menu-keyboard.service';
import { DefaultMenuItem } from './default-menu-item.class';

describe('MenuKeyboardService', () => {
    let service: MenuKeyboardService;
    let menuItems: DefaultMenuItem[];

    beforeEach(() => {
        service = new MenuKeyboardService();
        service.focusEscapeAfterList = jasmine.createSpy();
        service.focusEscapeBeforeList = jasmine.createSpy();
        menuItems = [
            jasmine.createSpyObj('DefaultMenuItem', ['focus', 'click']),
            jasmine.createSpyObj('DefaultMenuItem', ['focus', 'click']),
            jasmine.createSpyObj('DefaultMenuItem', ['focus', 'click'])
        ];
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
