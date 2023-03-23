"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.closeServer = exports.createSftpMockServer = void 0;
const ssh2_1 = require("ssh2");
const utils_1 = require("../utils");
const keys_1 = require("./data/keys");
const sftp_1 = require("./sftp");
const defaultData = {
    port: '9393',
    hostname: '127.0.0.1',
    debug: () => {
        return;
    },
    users: {
        test: { password: 'password', publicKey: keys_1.clientPublicKey },
    },
};
const createSftpMockServer = (config = {}) => {
    const conf = {
        ...defaultData,
        ...config,
    };
    return new Promise((resolve) => {
        const server = new ssh2_1.Server({
            hostKeys: [keys_1.serverPrivateKey],
        });
        server.on('connection', handleNewConnection({
            debug: conf.debug,
            users: conf.users,
        }));
        server.listen(Number(conf.port), conf.hostname, () => {
            conf.debug(`Listening on port ${conf.port} at ${conf.hostname}`);
            resolve(server);
        });
    });
};
exports.createSftpMockServer = createSftpMockServer;
const closeServer = (server, debug = defaultData.debug) => {
    debug('Close sftp server');
    return new Promise((resolve, reject) => server.close((error) => {
        if (error) {
            debug('Failed to close sftp server');
            reject(error);
        }
        debug('Closed sftp server successfully');
        resolve();
    }));
};
exports.closeServer = closeServer;
const handleNewConnection = (ctx) => (connection) => {
    ctx.debug(`Client connected!`);
    connection.on('authentication', checkAuthentication(ctx));
    connection.on('ready', () => ctx.debug('ready called'));
    connection.on('close', () => ctx.debug('close called'));
    connection.on('error', () => ctx.debug('error called'));
    connection.on('greeting', () => ctx.debug('greeting called'));
    connection.on('handshake', () => ctx.debug('handshake called'));
    connection.on('end', () => ctx.debug('end called'));
    connection.on('request', () => ctx.debug('request called'));
    connection.on('session', handleClientSession(ctx));
    connection.on('tcpip', () => ctx.debug('tcpip called'));
    connection.on('rekey', () => ctx.debug('rekey called'));
    connection.on('openssh.streamlocal', () => ctx.debug('openssh.streamlocal called'));
};
const checkAuthentication = (ctx) => (context) => {
    ctx.debug(`Client tried to authenticate using ${context.method}`);
    const targetInfo = ctx.users[context.username];
    switch (context.method) {
        case 'hostbased':
            return context.accept();
        case 'password': {
            return targetInfo !== undefined &&
                targetInfo?.password &&
                targetInfo.password === context.password
                ? context.accept()
                : context.reject(['publickey']);
        }
        case 'keyboard-interactive':
            return context.accept();
        case 'publickey': {
            const parsedKey = ssh2_1.utils.parseKey(targetInfo.publicKey);
            if (parsedKey instanceof Error) {
                ctx.debug('Could not parse public key ' + parsedKey);
                return context.reject();
            }
            const match = context.key.algo === parsedKey.type &&
                context.key.data.equals(parsedKey.getPublicSSH()) &&
                (!context.signature ||
                    !context.blob ||
                    parsedKey.verify(context.blob, context.signature));
            ctx.debug(`Verify key ended up with result: ${match}`);
            return match ? context.accept() : context.reject();
        }
        case 'none':
            return context.reject(['password', 'publickey']);
        default:
            throw new utils_1.UnreachableCaseError(context);
    }
};
const handleClientSession = (ctx) => (accept, _reject) => {
    const session = accept();
    ctx.debug(`Session started with client`);
    session.on('sftp', (0, sftp_1.handleSftpSession)(ctx));
    [
        'window-change',
        'exec',
        'pty',
        'signal',
        'subsystem',
        'x11',
        'auth-agent',
        'env',
        'shell',
    ].forEach((event) => {
        session.on(event, (_, reject) => {
            ctx.debug(`${event} call. NOT IMPLEMENTED`);
            reject();
        });
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9zZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0JBUWM7QUFHZCxvQ0FBZ0Q7QUFFaEQsc0NBQWdFO0FBQ2hFLGlDQUEyQztBQWtEM0MsTUFBTSxXQUFXLEdBR2I7SUFDRixJQUFJLEVBQUUsTUFBTTtJQUNaLFFBQVEsRUFBRSxXQUFXO0lBQ3JCLEtBQUssRUFBRSxHQUFHLEVBQUU7UUFDVixPQUFPO0lBQ1QsQ0FBQztJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLHNCQUFlLEVBQUU7S0FDM0Q7Q0FDRixDQUFDO0FBRUssTUFBTSxvQkFBb0IsR0FBaUIsQ0FBQyxNQUFNLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDaEUsTUFBTSxJQUFJLEdBQUc7UUFDWCxHQUFHLFdBQVc7UUFDZCxHQUFHLE1BQU07S0FDVixDQUFDO0lBRUYsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQzdCLE1BQU0sTUFBTSxHQUFHLElBQUksYUFBTSxDQUFDO1lBQ3hCLFFBQVEsRUFBRSxDQUFDLHVCQUFnQixDQUFDO1NBQzdCLENBQUMsQ0FBQztRQUVILE1BQU0sQ0FBQyxFQUFFLENBQ1AsWUFBWSxFQUNaLG1CQUFtQixDQUFDO1lBQ2xCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7U0FDbEIsQ0FBQyxDQUNILENBQUM7UUFFRixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7WUFDbkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsSUFBSSxDQUFDLElBQUksT0FBTyxJQUFJLENBQUMsUUFBUSxFQUFF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