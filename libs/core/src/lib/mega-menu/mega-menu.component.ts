import { ChangeDetectionStrategy, Component, ViewEncapsulation, Optional } from '@angular/core';
import { Observable, of } from 'rxjs';
import { RtlService } from '../utils/public_api';
import { map } from 'rxjs/operators';

const rtl = 'rtl';
const ltr = 'ltr';
/**
 *  Component represents mega menu element, which contains list with menu items, links, sublists, subitems and sublinks..
 *  ```html
 *  <fd-mega-menu>
 *      <ul fd-mega-menu-list>
 *          <fd-mega-menu-item>
 *              <a fd-mega-menu-link>Item 0</a>
 *              <li fd-mega-menu-subitem>
 *                 <a fd-mega-menu-sublink>Sub Item 1</a>
 *            </li>
 *              <li fd-mega-menu-subitem>
 *                <a fd-mega-menu-sublink>Sub Item 2</a>
 *           </li>
 *             <li fd-mega-menu-subitem>
 *                  <a fd-mega-menu-sublink>Sub Item 3</a>
 *             </li>
 *          </fd-mega-menu-item>
 *      </ul>
 *  </fd-mega-menu>
 *  ```
 * */
@Component({
    selector: 'fd-mega-menu',
    templateUrl: './mega-menu.component.html',
    styleUrls: ['./mega-menu.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class MegaMenuComponent {
    dir$: Observable<string>;

    constructor(@Optional() private rtlService: RtlService) {
        if (rtlService) {
            this.dir$ = rtlService.rtl.pipe(map((isRtl) => (isRtl ? rtl : ltr)));
        } else {
            this.dir$ = of(ltr);
        }
    }
}
