import { FdLanguage } from '../models/lang';
import { loadJson } from './load-json';

/**
 * Load properties file content and return a FdLanguage object
 * @param propertiesFileContent
 */
export function loadProperties(propertiesFileContent: string): FdLanguage {
    const newFileContent = {};
    const items = propertiesFileContent.match(/(.*)=(.*)/g);
    (items || []).forEach((item: string) => {
        const [key, value] = item.split('=');
        newFileContent[key.trim()] = value.trim().replace(/\\#/g, '#');
    });
    return loadJson(newFileContent);
}
