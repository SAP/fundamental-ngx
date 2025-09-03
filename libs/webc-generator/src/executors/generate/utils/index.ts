import { input, output } from '@angular/core';

function ProxyInputs(inputNames: string[]) {
    return (cls: any) => {
        inputNames.forEach((inputName) => {
            cls.prototype[inputName] = input();
        });
    };
}

function ProxyOutputs(outputNames: string[]) {
    return (cls: any) => {
        outputNames.forEach((outputName) => {
            cls.prototype[outputName] = output();
        });
    };
}

export { ProxyInputs, ProxyOutputs };
