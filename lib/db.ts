import mysql from 'mysql2/promise';

// Parse host and port from DB_HOST (supports "host:port" format)
const parseHost = (hostString: string) => {
  if (hostString.includes(':')) {
    const [host, port] = hostString.split(':');
    return { host, port: parseInt(port, 10) };
  }
  return { host: hostString };
};

const hostConfig = parseHost(process.env.DB_HOST || 'localhost');

// Database connection configuration
const dbConfig = {
  ...hostConfig,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'moneydesk',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,
  // Performance optimizations
  acquireTimeout: 60000,
  timeout: 60000,
  reconnect: true,
  // Reduce connection overhead
  multipleStatements: false,
};

// Create connection pool
let pool: mysql.Pool | null = null;

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool(dbConfig);
  }
  return pool;
}

// Test database connection
export async function testConnection(): Promise<boolean> {
  try {
    const connection = await getPool().getConnection();
    await connection.ping();
    connection.release();
    return true;
  } catch (error: any) {
    console.error('Database connection error:', error);
    console.error('Error details:', {
      code: error.code,
      errno: error.errno,
      sqlState: error.sqlState,
      message: error.message,
    });
    console.error('Database config:', {
      host: dbConfig.host,
      user: dbConfig.user,
      database: dbConfig.database,
      hasPassword: !!dbConfig.password,
    });
    // Re-throw the error so we can see it in the API response
    throw error;
  }
}

// Execute a query
export async function query(sql: string, params?: any[]): Promise<any> {
  try {
    const [results] = await getPool().execute(sql, params);
    return results;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

// Close the pool (useful for cleanup)
export async function closePool(): Promise<void> {
  if (pool) {
    await pool.end();
    pool = null;
  }
}

