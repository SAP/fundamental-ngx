import { KeyboardSupportService } from './keyboard-support.service';
import { KeyboardSupportItemInterface } from '../../interfaces/keyboard-support-item.interface';
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';

class MockKeyboardListElement implements KeyboardSupportItemInterface {
    keyDown = new EventEmitter<KeyboardEvent>();

    focus(): void {}
    click(): void {}
}

describe('MenuKeyboardService', () => {
    let service: KeyboardSupportService<MockKeyboardListElement>;
    let menuItems: any;
    let items: MockKeyboardListElement[];

    beforeEach(() => {
        items = [new MockKeyboardListElement(), new MockKeyboardListElement(), new MockKeyboardListElement()];
        service = new KeyboardSupportService();
        menuItems = {
            changes: new Subject(),
            length: items.length,
            last: items[0],
            first: items[items.length - 1]
        };
    });

    it('should refresh listeners', () => {
        service.setKeyboardService(menuItems);
        jest.spyOn(<any>service, '_refreshEscapeLogic');

        menuItems.changes.next();

        expect((<any>service)._refreshEscapeLogic).toHaveBeenCalled();
    });

    it('should call escape methods ', (done) => {
        service.setKeyboardService(menuItems);
        let escapeAfter = false;
        let escapeBefore = false;
        service.focusEscapeList.pipe(take(2)).subscribe({
            next: (direction) => {
                if (direction === 'up') {
                    escapeAfter = true;
                }
                if (direction === 'down') {
                    escapeBefore = true;
                }
            },
            complete: () => {
                expect(escapeBefore).toBe(true);
                expect(escapeAfter).toBe(true);
                done();
            }
        });

        const keyDownEventUp = new KeyboardEvent('keydown', {
            key: 'ArrowUp'
        });

        const keyDownEventDown = new KeyboardEvent('keydown', {
            key: 'ArrowDown'
        });

        menuItems.first.keyDown.next(keyDownEventUp);
        menuItems.last.keyDown.next(keyDownEventDown);
    });
});
