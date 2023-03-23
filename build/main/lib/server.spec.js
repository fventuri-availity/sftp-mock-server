"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = require("./data/keys");
const ava_1 = __importDefault(require("ava"));
const utils_1 = require("./utils");
const port = Math.floor(Math.random() * 1000 + 9000);
ava_1.default.serial('can create and close a sftp server', async (t) => {
    // GIVEN & WHEN
    const data = await (0, utils_1.setup)({ port: String(port) });
    // THEN
    await (0, utils_1.cleanup)({ server: data.server });
    t.pass();
});
ava_1.default.serial('can connect to the server with a client using password', async (t) => {
    // GIVEN
    const data = await (0, utils_1.setup)({
        port: String(port),
        users: {
            test: { password: 'test' },
        },
    });
    // WHEN
    await data.client.connect({
        host: '127.0.0.1',
        port,
        username: 'test',
        password: 'test',
    });
    // THEN
    await (0, utils_1.cleanup)(data);
    t.pass();
});
ava_1.default.serial('can connect to the server with a client using keyboard', async (t) => {
    // GIVEN
    const data = await (0, utils_1.setup)({
        port: String(port),
    });
    // WHEN
    await data.client.connect({
        host: '127.0.0.1',
        port,
        username: 'test',
        tryKeyboard: true,
    });
    // THEN
    await (0, utils_1.cleanup)(data);
    t.pass();
});
ava_1.default.serial('cannot connect to the server with the wrong password', async (t) => {
    // GIVEN
    const data = await (0, utils_1.setup)({
        port: String(port),
        users: {
            test: { password: 'test' },
        },
    });
    // WHEN
    const error = await t.throwsAsync(() => data.client.connect({
        host: '127.0.0.1',
        port,
        username: 'test',
        password: 'wrong-password',
    }));
    // THEN
    t.is(error.code, 'ERR_GENERIC_CLIENT');
    await (0, utils_1.cleanup)(data);
});
ava_1.default.serial('can connect to the server with a client using public key', async (t) => {
    // GIVEN
    const data = await (0, utils_1.setup)({
        port: String(port),
        users: {
            test: { publicKey: keys_1.clientPublicKey },
        },
    });
    // WHEN
    await data.client.connect({
        host: '127.0.0.1',
        port,
        username: 'test',
        privateKey: keys_1.clientPrivateKey,
    });
    // THEN
    await (0, utils_1.cleanup)(data);
    t.pass();
});
ava_1.default.serial('can get file information for unknown file', async (t) => {
    // GIVEN
    const data = await (0, utils_1.setup)({ port: String(port) });
    // WHEN
    await data.client.connect({
        host: '127.0.0.1',
        port,
        username: 'test',
        password: 'password',
    });
    const result = await data.client.exists('/test');
    t.false(result);
    // THEN
    await (0, utils_1.cleanup)(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3NlcnZlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsc0NBQWdFO0FBQ2hFLDhDQUF1QjtBQUV2QixtQ0FBeUM7QUFFekMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDO0FBRXJELGFBQUksQ0FBQyxNQUFNLENBQUMsb0NBQW9DLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0lBQzVELGVBQWU7SUFDZixNQUFNLElBQUksR0FBRyxNQUFNLElBQUEsYUFBSyxFQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFFakQsT0FBTztJQUNQLE1BQU0sSUFBQSxlQUFPLEVBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ1gsQ0FBQyxDQUFDLENBQUM7QUFFSCxhQUFJLENBQUMsTUFBTSxDQUNULHdEQUF3RCxFQUN4RCxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDVixRQUFRO0lBQ1IsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFBLGFBQUssRUFBQztRQUN2QixJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNsQixLQUFLLEVBQUU7WUFDTCxJQUFJLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFO1NBQzNCO0tBQ0YsQ0FBQyxDQUFDO0lBRUgsT0FBTztJQUNQLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDeEIsSUFBSSxFQUFFLFdBQVc7UUFDakIsSUFBSTtRQUNKLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLFFBQVEsRUFBRSxNQUFN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