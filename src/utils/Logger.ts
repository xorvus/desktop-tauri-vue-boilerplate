import { warn, debug, trace, info, error } from '@tauri-apps/plugin-log';

class Logger {
    static warn(message: string) {
        console.warn(message);
        warn(message).then();
    }

    static debug(message: string) {
        console.debug(message);
        debug(message).then();
    }

    static trace(message: string) {
        console.trace(message);
        trace(message).then();
    }

    static info(message: string) {
        console.info(message);
        info(message).then();
    }

    static error(message: string) {
        console.error(message);
        error(message).then();
    }

    static log(message: string) {
        console.log(message);
    }
}


export default Logger;