import { AcceptSftpConnection, RejectConnection } from 'ssh2';
import { Context } from './types';
export declare const handleSftpSession: (ctx: Context) => (accept: AcceptSftpConnection, _reject: RejectConnection) => void;
