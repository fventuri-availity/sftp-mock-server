"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanup = exports.setup = void 0;
const ssh2_sftp_client_1 = __importDefault(require("ssh2-sftp-client"));
const server_1 = require("./server");
const debug = console.log;
const setup = async (serverConfig = {}) => ({
    server: await (0, server_1.createSftpMockServer)({
        ...serverConfig,
        debug,
    }),
    client: new ssh2_sftp_client_1.default(),
});
exports.setup = setup;
const cleanup = async ({ client, server, }) => {
    await client?.end();
    server ? await (0, server_1.closeServer)(server) : undefined;
};
exports.cleanup = cleanup;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbGliL3V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLHdFQUFzQztBQUV0QyxxQ0FBK0U7QUFFL0UsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQztBQUVuQixNQUFNLEtBQUssR0FBRyxLQUFLLEVBQUUsZUFBaUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLE1BQU0sRUFBRSxNQUFNLElBQUEsNkJBQW9CLEVBQUM7UUFDakMsR0FBRyxZQUFZO1FBQ2YsS0FBSztLQUNOLENBQUM7SUFDRixNQUFNLEVBQUUsSUFBSSwwQkFBTSxFQUFFO0NBQ3JCLENBQUMsQ0FBQztBQU5VLFFBQUEsS0FBSyxTQU1mO0FBRUksTUFBTSxPQUFPLEdBQUcsS0FBSyxFQUFFLEVBQzVCLE1BQU0sRUFDTixNQUFNLEdBSVAsRUFBRSxFQUFFO0lBQ0gsTUFBTSxNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUM7SUFDcEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLElBQUEsb0JBQVcsRUFBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0FBQ2pELENBQUMsQ0FBQztBQVRXLFFBQUEsT0FBTyxXQVNsQiJ9