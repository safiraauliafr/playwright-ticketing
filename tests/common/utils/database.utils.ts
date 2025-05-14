import mysql from 'mysql2/promise'

export class DatabaseUtils {
  private static connection: mysql.Connection | null = null

  /**
   * Get a MySQL connection
   * @returns MySQL connection
   */
  private static async getConnection(): Promise<mysql.Connection> {
    if (!this.connection) {
      this.connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: parseInt(process.env.DB_PORT || '3306'),
      })
    }
    return this.connection
  }

  /**
   * Execute a query and return results
   * @param query SQL query string
   * @param params Query parameters
   * @returns Query results
   */
  public static async query<T>(query: string, params: any[] = []): Promise<T[]> {
    const connection = await this.getConnection()
    try {
      const [rows] = await connection.execute(query, params)
      return rows as T[]
    } catch (error) {
      console.error('Database query error:', error)
      throw error
    }
  }

  /**
   * Get SMS token for a given phone number
   * @param phoneNumber Phone number to lookup
   * @returns SMS token if found
   */
  public static async getSmsToken(phoneNumber: string): Promise<string | null> {
    const query = `
        SELECT sms_token
        FROM sms_tokens
                 JOIN contacts ON sms_tokens.sms_tokenable_id = contacts.id
        WHERE contacts.phone = ?
        ORDER BY sms_tokens.created_at DESC LIMIT 1
    `

    try {
      const results = await this.query<{ sms_token: string }>(query, [phoneNumber])
      return results.length > 0 ? results[0].sms_token : null
    } catch (error) {
      console.error('Error getting SMS token:', error)
      return null
    }
  }

  /**
   * Close the database connection
   */
  public static async closeConnection(): Promise<void> {
    if (this.connection) {
      await this.connection.end()
      this.connection = null
    }
  }
}
