import { clientPrivateKey, clientPublicKey } from './data/keys';
import test from 'ava';
import { setup, cleanup } from './utils';
const port = Math.floor(Math.random() * 1000 + 9000);
test.serial('can create and close a sftp server', async (t) => {
    // GIVEN & WHEN
    const data = await setup({ port: String(port) });
    // THEN
    await cleanup({ server: data.server });
    t.pass();
});
test.serial('can connect to the server with a client using password', async (t) => {
    // GIVEN
    const data = await setup({
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
    await cleanup(data);
    t.pass();
});
test.serial('can connect to the server with a client using keyboard', async (t) => {
    // GIVEN
    const data = await setup({
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
    await cleanup(data);
    t.pass();
});
test.serial('cannot connect to the server with the wrong password', async (t) => {
    // GIVEN
    const data = await setup({
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
    await cleanup(data);
});
test.serial('can connect to the server with a client using public key', async (t) => {
    // GIVEN
    const data = await setup({
        port: String(port),
        users: {
            test: { publicKey: clientPublicKey },
        },
    });
    // WHEN
    await data.client.connect({
        host: '127.0.0.1',
        port,
        username: 'test',
        privateKey: clientPrivateKey,
    });
    // THEN
    await cleanup(data);
    t.pass();
});
test.serial('can get file information for unknown file', async (t) => {
    // GIVEN
    const data = await setup({ port: String(port) });
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
    await cleanup(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLnNwZWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3NlcnZlci5zcGVjLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxlQUFlLEVBQUUsTUFBTSxhQUFhLENBQUM7QUFDaEUsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBRXZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRXpDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVyRCxJQUFJLENBQUMsTUFBTSxDQUFDLG9DQUFvQyxFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUM1RCxlQUFlO0lBQ2YsTUFBTSxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUVqRCxPQUFPO0lBQ1AsTUFBTSxPQUFPLENBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDdkMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQ1gsQ0FBQyxDQUFDLENBQUM7QUFFSCxJQUFJLENBQUMsTUFBTSxDQUNULHdEQUF3RCxFQUN4RCxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7SUFDVixRQUFRO0lBQ1IsTUFBTSxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUM7UUFDdkIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDbEIsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtTQUMzQjtLQUNGLENBQUMsQ0FBQztJQUVILE9BQU87SUFDUCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxD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