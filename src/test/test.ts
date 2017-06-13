

import { Log } from "../Log";
import { LogError } from "../LogError";

export class Test {
    @Log(void 0, (ctorN, pkey) => 'Start ' + ctorN + '.' + pkey, (ctorN, pkey) => 'End ' + ctorN + '.' + pkey)
    public logging() {

    }

    @Log()
    @LogError(void 0, (ctorN, pKey, er) => ctorN + '.' + pKey + ' throws: ' + er, false)
    public loggingError() {
        throw "Some Error";
    }

    @Log()
    @LogError(void 0, void 0, true)
    public loggingError2() {
        throw "Some Error";
    }
}

var t = new Test();

t.logging();
t.loggingError();
try {
    t.loggingError2()
} catch(e) {
    console.log('threw: ' + e);
}