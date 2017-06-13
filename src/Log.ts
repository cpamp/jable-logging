export type IOutLogString = (construcotrName: string, propertyKey: string) => string;

function defaultStart(constructorName: string, propertyKey: string): string {
    return constructorName + '.' + propertyKey + ' started at ' + new Date(Date.now()).toUTCString();
}

function defaultEnd(constructorName: string, propertyKey: string): string {
    return constructorName + '.' + propertyKey + ' ended at ' + new Date(Date.now()).toUTCString();
}

export function Log(pipe: (out: string) => void = console.log, start: IOutLogString = defaultStart, end: IOutLogString = defaultEnd) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        var oldFunc = descriptor.value;
        descriptor.value = function() {
            pipe(start(target.constructor.name, propertyKey));
            try {
                var result = oldFunc.apply(this, arguments);
            } catch(e) {
                throw e;
            } finally {
                pipe(end(target.constructor.name, propertyKey));
            }
            return result;
        }
    };
}