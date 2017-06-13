export function Log(pipe: Function = console.log) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        var oldFunc = target[propertyKey];
        descriptor.value = function() {
            pipe(target.constructor.name + '.' + propertyKey + ' started at ' + new Date(Date.now()).toUTCString());
            var result = oldFunc.apply(this, arguments);
            pipe(target.constructor.name + '.' + propertyKey + ' ended at ' + new Date(Date.now()).toUTCString());
            return result;
        }
    };
}