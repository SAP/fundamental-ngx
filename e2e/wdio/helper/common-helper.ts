import { click } from '../driver/wdio';

export function checkLinkTargetDestination(element, site: string): void {
    click(element);
    expect(browser).toHaveUrlContaining(site);
}
