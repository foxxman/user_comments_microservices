export type ExactImplementation<T, U extends T> = T & { [K in keyof U]: K extends keyof T ? U[K] : never };
