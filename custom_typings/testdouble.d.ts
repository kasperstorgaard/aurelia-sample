declare module testdouble {
    export function verify(result: any): any;

    export function object(obj: Object): any;
    export function object(obj: Array<String>): any;
    export function object(name: String): any;
}

export = testdouble;