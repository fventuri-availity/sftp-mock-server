import { Server } from 'ssh2';
/**
 * Configuration that can be passed to the server at creation to control it's behavior
 */
export declare type MockServerConfig = {
    port?: string;
    hostname?: string;
    debug?: Debug;
    users?: Record<string, {
        password?: string;
        publicKey?: string;
    }>;
};
/**
 * Function that can be used to log debug information
 */
export declare type Debug = (message: string) => void;
/**
 * Call this function to create a new mock server
 * By default the server will listen on 127.0.0.1:9393
 *
 * ```ts
 * const mockServer = await createSftpMockServer({
 *  port: "9999",
 *  hostname: "127.0.0.1",
 *  debug: (msg: string) => logger.debug(msg),
 *  users: {
 *    alice: {
 *      password: "password",
 *      publicKey: clientPublicKey
 *    }
 *  }
 * })
 * ```
 *
 * @param config used to override the port and hostname that the server will listen on.
 * @returns a reference to the mock server
 */
declare type CreateServer = (config?: MockServerConfig) => Promise<Server>;
/**
 * Close an existing sftp server. It will free the port that the server was listening on.
 *
 * ```ts
 * await closeServer(server, console.log)
 * ```
 */
declare type CloseServer = (server: Server, debug?: Debug) => Promise<void>;
export declare const createSftpMockServer: CreateServer;
export declare const closeServer: CloseServer;
export {};
