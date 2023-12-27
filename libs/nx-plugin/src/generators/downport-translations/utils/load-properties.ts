export function loadProperties(propertiesFileContent: string): Record<string, string> {
    const newFileContent = {};
    const items = propertiesFileContent.match(/(.*)=(.*)/g);
    (items || []).forEach((item: string) => {
        const firstEqualSignIndex = item.indexOf('=');
        const [key, value] = [item.slice(0, firstEqualSignIndex), item.slice(firstEqualSignIndex + 1)];
        newFileContent[key.trim()] = value.trim().replace(/\\#/g, '#');
    });
    return newFileContent;
}
