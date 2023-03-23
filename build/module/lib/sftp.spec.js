import test from 'ava';
import { setup, cleanup } from './utils';
const port = Math.floor(Math.random() * 1000 + 9000);
test.serial('can upload and download file', async (t) => {
    // GIVEN
    const data = await setup({
        port: String(port),
        users: {
            test: { password: 'test' },
        },
    });
    await data.client.connect({
        host: '127.0.0.1',
        port,
        username: 'test',
        password: 'test',
    });
    const content = 'My file content is awesome';
    // WHEN
    await data.client.put(Buffer.from(content), '/test/file.txt');
    const read = await data.client.get('/test/file.txt');
    // THEN
    t.is(read.toString(), content);
    await cleanup(data);
});
test.serial('can move and delete file', async (t) => {
    // GIVEN
    const data = await setup({
        port: String(port),
        users: {
            test: { password: 'test' },
        },
    });
    await data.client.connect({
        host: '127.0.0.1',
        port,
        username: 'test',
        password: 'test',
    });
    const content = 'My file content is awesome';
    // WHEN
    await data.client.put(Buffer.from(content), '/test/file.txt');
    const read = await data.client.get('/test/file.txt');
    t.is(read.toString(), content);
    await data.client.rename('/test/file.txt', '/test/fileRenamed.txt');
    const stat = await data.client.stat('/test/fileRenamed.txt');
    t.assert(stat.isFile);
    const read2 = await data.client.get('/test/fileRenamed.txt');
    t.is(read2.toString(), content);
    await data.client.delete('/test/fileRenamed.txt');
    t.throwsAsync(() => data.client.get('/test/fileRenamed.txt'));
    // THEN
    await cleanup(data);
});
test.serial('can read from directory', async (t) => {
    // GIVEN
    const data = await setup({
        port: String(port),
        users: {
            test: { password: 'test' },
        },
    });
    await data.client.connect({
        host: '127.0.0.1',
        port,
        username: 'test',
        password: 'test',
    });
    const content = 'My file content is awesome';
    // WHEN
    await data.client.put(Buffer.from(content), '/test/file.txt');
    const files = await data.client.list('/test');
    // THEN
    t.truthy(files.find((f) => f.name === 'file.txt'));
    t.throwsAsync(() => data.client.list('/unknown'));
    await cleanup(data);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Z0cC5zcGVjLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi9zZnRwLnNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxJQUFJLE1BQU0sS0FBSyxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRXpDLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztBQUVyRCxJQUFJLENBQUMsTUFBTSxDQUFDLDhCQUE4QixFQUFFLEtBQUssRUFBRSxDQUFDLEVBQUUsRUFBRTtJQUN0RCxRQUFRO0lBQ1IsTUFBTSxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUM7UUFDdkIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDbEIsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRTtTQUMzQjtLQUNGLENBQUMsQ0FBQztJQUNILE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDeEIsSUFBSSxFQUFFLFdBQVc7UUFDakIsSUFBSTtRQUNKLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLFFBQVEsRUFBRSxNQUFNO0tBQ2pCLENBQUMsQ0FBQztJQUNILE1BQU0sT0FBTyxHQUFHLDRCQUE0QixDQUFDO0lBRTdDLE9BQU87SUFDUCxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUM5RCxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFFckQsT0FBTztJQUNQLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEs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