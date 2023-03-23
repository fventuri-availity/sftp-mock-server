import { Server } from 'ssh2';
import Client from 'ssh2-sftp-client';
import { MockServerConfig } from './server';
export declare const setup: (serverConfig?: MockServerConfig) => Promise<{
    server: Server;
    client: Client;
}>;
export declare const cleanup: ({ client, server, }: {
    client?: Client | undefined;
    server?: Server | undefined;
}) => Promise<void>;
