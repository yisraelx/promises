export interface IFn {
    id: string;
    type?: string;
    fn: Function;
}

export interface ITest {
    collection: any;
}

export interface ITestIteratee extends ITest {
    iteratee?: any;
}
