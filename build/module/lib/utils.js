import Client from 'ssh2-sftp-client';
import { closeServer, createSftpMockServer } from './server';
const debug = console.log;
export const setup = async (serverConfig = {}) => ({
    server: await createSftpMockServer({
        ...serverConfig,
        debug,
    }),
    client: new Client(),
});
export const cleanup = async ({ client, server, }) => {
    await client?.end();
    server ? await closeServer(server) : undefined;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sTUFBTSxNQUFNLGtCQUFrQixDQUFDO0FBRXRDLE9BQU8sRUFBRSxXQUFXLEVBQUUsb0JBQW9CLEVBQW9CLE1BQU0sVUFBVSxDQUFDO0FBRS9FLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUM7QUFFMUIsTUFBTSxDQUFDLE1BQU0sS0FBSyxHQUFHLEtBQUssRUFBRSxlQUFpQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbkUsTUFBTSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7UUFDakMsR0FBRyxZQUFZO1FBQ2YsS0FBSztLQUNOLENBQUM7SUFDRixNQUFNLEVBQUUsSUFBSSxNQUFNLEVBQUU7Q0FDckIsQ0FBQyxDQUFDO0FBRUgsTUFBTSxDQUFDLE1BQU0sT0FBTyxHQUFHLEtBQUssRUFBRSxFQUM1QixNQUFNLEVBQ04sTUFBTSxHQUlQLEVBQUUsRUFBRTtJQUNILE1BQU0sTUFBTSxFQUFFLEdBQUcsRUFBRSxDQUFDO0lBQ3BCLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztBQUNqRCxDQUFDLENBQUMifQ==