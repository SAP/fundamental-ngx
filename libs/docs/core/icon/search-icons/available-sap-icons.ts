import businessIcons from '@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts/BusinessSuiteInAppSymbols.json';
import tntIcons from '@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts/SAP-icons-TNT.json';
import sapIcons from '@sap-theming/theming-base-content/content/Base/baseLib/baseTheme/fonts/SAP-icons.json';

interface SAPIconType {
    names: string[];
    groups: string[];
    tags: string[];
    rtl: string; // "flip" | "none"
}

export interface FdIconDocsType {
    name: string;
    names: string[];
    groups: string[];
    tags: string[];
    font: string;
    searchMatches?: Record<string, Array<[number, number]> | Record<number, Array<[number, number]>>>;
}

export const availableSapIcons: FdIconDocsType[] = [];

const toFdDocIconType = ({ names, groups, tags }: SAPIconType, font: string): FdIconDocsType => ({
    name: names[0],
    names,
    groups,
    tags,
    font
});

Object.values(sapIcons).forEach((icon: SAPIconType) => {
    const n = toFdDocIconType(icon, 'SAP-icons');
    if (n.name === 'soccer') {
        // Soccer icon is incorrectly named in SAP-icons.json
        n.name = 'soccor';
    }
    if (n.name === 'status-in-process') {
        // status-in-process icon is incorrectly named in SAP-icons.json
        n.name = 'status-in-progress';
    }
    availableSapIcons.push(n);
});

Object.values(tntIcons).forEach((icon: SAPIconType) => {
    availableSapIcons.push(toFdDocIconType(icon, 'SAP-icons-TNT'));
});

Object.values(businessIcons).forEach((icon: SAPIconType) => {
    availableSapIcons.push(toFdDocIconType(icon, 'sap-icon-businessSuiteInAppSymbols'));
});
