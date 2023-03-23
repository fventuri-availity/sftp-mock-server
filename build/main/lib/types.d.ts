import { Debug } from './server';
export declare type Context = {
    debug: Debug;
    users: Record<string, {
        password?: string;
        publicKey?: string;
    }>;
};
