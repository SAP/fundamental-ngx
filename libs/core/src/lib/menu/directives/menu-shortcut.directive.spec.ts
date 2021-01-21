import { MenuShortcutDirective } from './menu-shortcut.directive';
import { MenuItemComponent } from '../menu-item/menu-item.component';
import { fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { Observable, Subject } from 'rxjs';

describe('MenuShortcutDirective', () => {
    const buildMenuItem = (subject: Subject<boolean>) => ({
        menuService: {
            get isMobileMode(): Observable<boolean> {
                return subject.asObservable()
            }
        }
    } as MenuItemComponent);

    const elementRefMock = {
        nativeElement: {
            style: {
                display: ''
            }
        }
    };

    let isMobileSubject: Subject<boolean>;
    let directive: MenuShortcutDirective;

    beforeEach(waitForAsync(() => {
        isMobileSubject = new Subject<boolean>();
        directive = new MenuShortcutDirective(buildMenuItem(isMobileSubject), elementRefMock)
    }));

    it('should create an instance', () => {
        expect(directive).toBeTruthy();
    });

    it('should hide/show depending on mobile mode', fakeAsync(() => {
        isMobileSubject.next(false);

        tick();

        expect(directive['_elementRef'].nativeElement.style.display).toBeFalsy();

        isMobileSubject.next(true);

        tick();

        expect(directive['_elementRef'].nativeElement.style.display).toBeFalsy('none');
    }));
});
