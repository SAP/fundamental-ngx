import { click } from '../driver/wdio';

export function checkLinkTargetDestination(element: string, site: string): void {
    click(element);
    expect(browser).toHaveUrlContaining(site);
}

export function getRandomInt(max: number): number {
    return Math.floor(Math.random() * Math.floor(max));
}
