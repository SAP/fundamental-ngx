
export function docJsonEntityTypes() { // docsJson: Record<string, any>
    return [
        'components',
        'directives',
        'pipes',
        'classes',
        'interfaces',
        'injectables',
        'modules'
    ];

    // return Object.keys(docsJson).reduce((acc: string[], key) => {
    //     if (!Array.isArray(docsJson[key])) {
    //         Object.keys(docsJson[key]).forEach((subKey) => {
    //             if (!Array.isArray(docsJson[key][subKey])) {
    //                 // Object.keys(docsJson[key][subKey]).forEach((subSubKey) => {
    //                 //     acc.push(`${key}.${subKey}.${subSubKey}`);
    //                 // });
    //                 return;
    //             }
    //             acc.push(`${key}.${subKey}`);
    //         });
    //     } else {
    //         acc.push(key);
    //     }
    //     return acc;
    // }, []);
}
