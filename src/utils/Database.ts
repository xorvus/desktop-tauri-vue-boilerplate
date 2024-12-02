import DB from '@tauri-apps/plugin-sql';
class Database {
    public db!: DB;
    static async init(dbName: string): Promise<DB> {
        const db = await DB.load(`sqlite:${dbName}`);
        new Database().db = db;
        return db;
    }

}


export default Database;