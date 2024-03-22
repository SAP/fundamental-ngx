import { EventEmitter } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Subject } from 'rxjs';
import { take } from 'rxjs/operators';
import { KeyboardSupportItemInterface } from '../../interfaces/keyboard-support-item.interface';
import { KeyboardSupportService } from './keyboard-support.service';

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
        TestBed.configureTestingModule({ providers: [KeyboardSupportService] });
        items = [new MockKeyboardListElement(), new MockKeyboardListElement(), new MockKeyboardListElement()];
        service = TestBed.inject(KeyboardSupportService);
        menuItems = {
            changes: new Subject(),
            length: items.length,
            last: items[0],
            first: items[items.length - 1]
        };
    });

    it('should refresh listeners', () => {
        service.setKeyboardService(menuItems);
        const spy = jest.spyOn(<any>service, '_refreshEscapeLogic');

        menuItems.changes.next();

        expect(spy).toHaveBeenCalled();
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
