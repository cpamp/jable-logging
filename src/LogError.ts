export function Log(pipe: (out: string) => void = console.error, reThrow: boolean = true) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        var oldFunc = target[propertyKey];
        descriptor.value = function() {
            try {
                var result = oldFunc.apply(this, arguments);
            } catch(e) {
                pipe(target.constructor.name + '.' + propertyKey + ' threw error at ' + new Date(Date.now()).toUTCString() + ': ' + e);
                if (reThrow) throw e;
            }
            return result;
        }
    };
}