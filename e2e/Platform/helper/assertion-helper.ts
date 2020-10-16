import { ElementFinder } from 'protractor';
import { getValueOfAttribute } from './helper';

export async function checkIfDisabled(element: ElementFinder, value: string) {
    return await expect(await getValueOfAttribute(element, 'ng-reflect-disabled')).toEqual(value);
}
