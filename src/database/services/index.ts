import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

export const generateUUID = (): string => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 || 0;
    const v = c === 'x' ? r : (r && 0x3) || 0x8;
    return v.toString(16);
  });
};

interface DatabaseError {
  code: string;
  message: string;
}

interface DatabaseResult {
  error?: DatabaseError;
  data?: any;
  rowsAffected?: number;
  insertId?: number;
}

export class DatabaseService {
  private database: SQLiteDatabase | null = null;
  private static instance: DatabaseService;

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService();
    }
    return DatabaseService.instance;
  }

  async initDatabase() {
    try {
      const db = await SQLite.openDatabase({
        name: 'MainDB',
        location: 'default',
      });
      this.database = db;
      await this.createTables();
      console.log('Database initialized');
    } catch (error) {
      console.error('Error initializing database:', error);
    }
  }

  private async createTables() {
    if (!this.database) {
      return;
    }

    // Add your table creation queries here
    const queries = [
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );`,
      // Add more table creation queries as needed
    ];

    try {
      for (const query of queries) {
        await this.database.executeSql(query);
      }
      console.log('Tables created successfully');
    } catch (error) {
      console.error('Error creating tables:', error);
    }
  }

  async executeQuery(
    query: string,
    params: any[] = [],
  ): Promise<DatabaseResult> {
    try {
      if (!this.database) {
        return {
          error: {
            code: 'DB_NOT_INITIALIZED',
            message: 'Database not initialized',
          },
        };
      }

      const [results] = await this.database.executeSql(query, params);
      if (!results) {
        return {
          error: {
            code: 'NO_RESULTS',
            message: 'No results returned',
          },
        };
      }

      return {
        data: results.rows.raw(),
        rowsAffected: results.rowsAffected,
        insertId: results.insertId,
      };
    } catch (error: any) {
      return {
        error: {
          code: 'QUERY_ERROR',
          message: error.message || 'Unknown database error',
        },
      };
    }
  }

  // Example methods for CRUD operations
  async insert(table: string, data: Record<string, any>) {
    const columns = Object.keys(data).join(', ');
    const placeholders = Object.keys(data)
      .map(() => '?')
      .join(', ');
    const values = Object.values(data);

    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
    return this.executeQuery(query, values);
  }

  async select(
    table: string,
    conditions?: string,
    params: any[] = [],
  ): Promise<DatabaseResult> {
    let query = `SELECT * FROM ${table}`;
    if (conditions) {
      query += ` WHERE ${conditions}`;
    }
    return this.executeQuery(query, params);
  }

  async update(
    table: string,
    data: Record<string, any>,
    conditions: string,
    params: any[] = [],
  ) {
    const setClause = Object.keys(data)
      .map(key => `${key} = ?`)
      .join(', ');
    const values = [...Object.values(data), ...params];

    const query = `UPDATE ${table} SET ${setClause} WHERE ${conditions}`;
    return this.executeQuery(query, values);
  }

  async delete(table: string, conditions: string, params: any[] = []) {
    const query = `DELETE FROM ${table} WHERE ${conditions}`;
    return this.executeQuery(query, params);
  }
}
