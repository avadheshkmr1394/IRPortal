using System;
using System.Collections;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;

namespace Insight.Portal.App.Repositories
{
    public class DataManager
    {
        protected bool m_CloseConnection = true;
        private DataManager.DatabaseType BackendType;
        private int m_CommandTimeout = 0;

        public DataManager(DataManager.DatabaseType bkendType)
        {
            this.BackendType = bkendType;
        }

        public long ExecuteNonQuery(string connString, string spName, Hashtable ParamTable)
        {
            return this.ExecuteNonQuery(connString, spName, CommandType.StoredProcedure, ParamTable);
        }
        public long ExecuteNonQuery(string connString, CommandType CmdType, string cmdText)
        {
            return this.ExecuteNonQuery(connString, cmdText, CmdType, (Hashtable)null);
        }
        public long ExecuteNonQuery(string connString, string cmdText)
        {
            return this.ExecuteNonQuery(connString, cmdText, CommandType.Text, (Hashtable)null);
        }
        protected long ExecuteNonQuery(string connString, string spName, CommandType CmdType, Hashtable ParamTable)
        {
            return this.ExecuteNonQuery(this.GetConnection(connString, true), spName, CmdType, ParamTable);
        }
        protected long ExecuteNonQuery(DbConnection DbConn, string spName, CommandType CmdType, Hashtable ParamTable)
        {
            return (long)this.ExecuteQuery(DbConn, (DbTransaction)null, spName, CmdType, ParamTable, DataManager.ExecuteAction.NonQuery);
        }
        protected long ExecuteNonQuery(DbTransaction DbTrans, string spName, CommandType CmdType, Hashtable ParamTable)
        {
            return (long)this.ExecuteQuery(DbTrans.Connection, DbTrans, spName, CmdType, ParamTable, DataManager.ExecuteAction.NonQuery);
        }
        public long ExecuteNonQuery(DbTransaction DbTrans, string CmdText)
        {
            return this.ExecuteNonQuery(DbTrans, CmdText, CommandType.Text, (Hashtable)null);
        }
        public long ExecuteNonQuery(DbTransaction DbTrans, CommandType CmdType, string CmdText)
        {
            return this.ExecuteNonQuery(DbTrans, CmdText, CmdType, (Hashtable)null);
        }
        public long ExecuteNonQuery(DbTransaction DbTrans, string spName, Hashtable ParamTable)
        {
            return this.ExecuteNonQuery(DbTrans, spName, CommandType.StoredProcedure, ParamTable);
        }
        protected object ExecuteQuery(DbConnection DbConn, DbTransaction DbTrans, string spName, CommandType CmdType, Hashtable ParamTable, DataManager.ExecuteAction ExecAction)
        {
            if (this.ValidateCommandText(spName))
            {
                try
                {
                    if (DbConn.State != ConnectionState.Open)
                    {
                        DbConn.Open();
                    }
                    DbCommand dbCommand = this.GetDbCommand(spName, DbConn);
                    dbCommand.Transaction = DbTrans;
                    try
                    {
                        dbCommand.CommandType = CmdType;
                        if (ParamTable != null)
                        {
                            Array hashValue = Utils.GetHashValue(ParamTable);
                            for (int index = 0; index < hashValue.Length; ++index)
                            {
                                dbCommand.Parameters.Add((object)(DbParameter)hashValue.GetValue(index));
                            }
                        }
                        if (ExecAction == DataManager.ExecuteAction.NonQuery)
                        {
                            long num = long.Parse(dbCommand.ExecuteNonQuery().ToString());
                            return (object)num;
                        }
                        else
                        {
                            object obj = dbCommand.ExecuteScalar();
                            return obj;
                        }
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                    finally
                    {
                        if (this.m_CloseConnection)
                        {
                            DbConn.Close();
                            dbCommand.Dispose();
                        }
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (this.m_CloseConnection)
                    {
                        DbConn.Dispose();
                    }
                }
            }
            else
            {
                throw new Exception("Command text empty");
            }
        }

        public DataSet ExecuteDataset(string connString, string spName, Hashtable ParamTable)
        {
            return this.ExecuteDataset(connString, spName, CommandType.StoredProcedure, ParamTable);
        }
        public DataSet ExecuteDataset(string connString, string spName, Hashtable ParamTable, int Timeout)
        {
            m_CommandTimeout = Timeout;
            return this.ExecuteDataset(connString, spName, CommandType.StoredProcedure, ParamTable);
        }
        public DataSet ExecuteDataset(string connString, CommandType CmdType, string CmdText)
        {
            return this.ExecuteDataset(connString, CmdText, CmdType, (Hashtable)null);
        }
        public DataSet ExecuteDataset(string connString, CommandType CmdType, string CmdText, int Timeout)
        {
            m_CommandTimeout = Timeout;
            return this.ExecuteDataset(connString, CmdText, CmdType, (Hashtable)null);
        }
        public DataSet ExecuteDataset(string connString, string CmdText)
        {
            return this.ExecuteDataset(connString, CmdText, CommandType.Text, (Hashtable)null);
        }
        protected DataSet ExecuteDataset(string connString, string spName, CommandType CmdType, Hashtable ParamTable)
        {
            return this.ExecuteDataset(this.GetConnection(connString, true), (DbTransaction)null, spName, CmdType, ParamTable);
        }
        protected DataSet ExecuteDataset(DbTransaction DbTrans, string spName, CommandType CmdType, Hashtable ParamTable)
        {
            return this.ExecuteDataset(DbTrans.Connection, DbTrans, spName, CmdType, ParamTable);
        }
        public DataSet ExecuteDataset(DbTransaction DbTrans, string spName, Hashtable ParamTable)
        {
            return this.ExecuteDataset(DbTrans, spName, CommandType.StoredProcedure, ParamTable);
        }
        public DataSet ExecuteDataset(DbTransaction DbTrans, CommandType CmdType, string CmdText)
        {
            return this.ExecuteDataset(DbTrans, CmdText, CmdType, (Hashtable)null);
        }
        public DataSet ExecuteDataset(DbTransaction DbTrans, string CmdText)
        {
            return this.ExecuteDataset(DbTrans, CmdText, CommandType.Text, (Hashtable)null);
        }
        protected DataSet ExecuteDataset(DbConnection DbConn, DbTransaction DbTrans, string spName, CommandType CmdType, Hashtable ParamTable)
        {
            if (!this.ValidateCommandText(spName))
                throw new Exception("Command text empty");
            try
            {
                if (DbConn.State != ConnectionState.Open)
                {
                    DbConn.Open();
                }
                DbCommand dbCommand = this.GetDbCommand(spName, DbConn);
                dbCommand.Transaction = DbTrans;
                try
                {
                    dbCommand.CommandType = CmdType;
                    if (m_CommandTimeout > 0)
                    {
                        dbCommand.CommandTimeout = m_CommandTimeout;
                    }
                    if (ParamTable != null)
                    {
                        Array hashValue = Utils.GetHashValue(ParamTable);
                        for (int index = 0; index < hashValue.Length; ++index)
                        {
                            dbCommand.Parameters.Add((object)(DbParameter)hashValue.GetValue(index));
                        }
                    }
                    DbDataAdapter dataAdapter = this.GetDataAdapter();
                    try
                    {
                        DataSet dataSet = new DataSet();
                        dataAdapter.SelectCommand = dbCommand;
                        ((DataAdapter)dataAdapter).Fill(dataSet);
                        return dataSet;
                    }
                    catch (Exception ex)
                    {
                        throw ex;
                    }
                    finally
                    {
                        dataAdapter.Dispose();
                    }
                }
                catch (Exception ex)
                {
                    throw ex;
                }
                finally
                {
                    if (this.m_CloseConnection)
                    {
                        DbConn.Close();
                    }
                    dbCommand.Dispose();
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (this.m_CloseConnection)
                {
                    DbConn.Dispose();
                }
            }
        }

        public object ExecuteScalar(string connString, string spName, Hashtable ParamTable)
        {
            DataSet dataSet = this.ExecuteDataset(connString, spName, CommandType.StoredProcedure, ParamTable);
            if (dataSet.Tables.Count > 0 && dataSet.Tables[0].Rows.Count > 0)
                return dataSet.Tables[0].Rows[0][0];
            else
                return (object)"";
        }
        public object ExecuteScalar(string connString, CommandType CmdType, string CmdText)
        {
            DataSet dataSet = this.ExecuteDataset(connString, CmdText, CmdType, (Hashtable)null);
            if (dataSet.Tables.Count > 0 && dataSet.Tables[0].Rows.Count > 0)
                return dataSet.Tables[0].Rows[0][0];
            else
                return (object)"";
        }
        public object ExecuteScalar(string connString, string CmdText)
        {
            return this.ExecuteScalar(connString, CmdText, CommandType.Text, (Hashtable)null);
        }
        protected object ExecuteScalar(string connString, string spName, CommandType CmdType, Hashtable ParamTable)
        {
            return this.ExecuteScalar(this.GetConnection(connString, true), spName, CmdType, ParamTable);
        }
        protected object ExecuteScalar(DbConnection DbConn, string spName, CommandType CmdType, Hashtable ParamTable)
        {
            return this.ExecuteQuery(DbConn, (DbTransaction)null, spName, CmdType, ParamTable, DataManager.ExecuteAction.Scalar);
        }
        protected object ExecuteScalar(DbTransaction DbTrans, string spName, CommandType CmdType, Hashtable ParamTable)
        {
            return this.ExecuteQuery(DbTrans.Connection, DbTrans, spName, CmdType, ParamTable, DataManager.ExecuteAction.Scalar);
        }
        public object ExecuteScalar(DbTransaction DbTrans, string CmdText)
        {
            return this.ExecuteScalar(DbTrans, CmdText, CommandType.Text, (Hashtable)null);
        }
        public object ExecuteScalar(DbTransaction DbTrans, CommandType CmdType, string CmdText)
        {
            DataSet dataSet = this.ExecuteDataset(DbTrans, CmdText, CmdType, (Hashtable)null);
            if (dataSet.Tables.Count > 0 && dataSet.Tables[0].Rows.Count > 0)
                return dataSet.Tables[0].Rows[0][0];
            else
                return (object)"";
        }
        public object ExecuteScalar(DbTransaction DbTrans, string spName, Hashtable ParamTable)
        {
            DataSet dataSet = this.ExecuteDataset(DbTrans, spName, CommandType.StoredProcedure, ParamTable);
            if (dataSet.Tables.Count > 0 && dataSet.Tables[0].Rows.Count > 0)
                return dataSet.Tables[0].Rows[0][0];
            else
                return (object)"";
        }

        public DbConnection GetConnection(string connString)
        {
            return this.GetConnection(connString, false);
        }
        protected DbConnection GetConnection(string connString, bool closeConn)
        {
            try
            {
                if (this.ValidateConnectionString(connString))
                {
                    DbConnection dbConnection = this.GetDbConnection(connString);
                    this.m_CloseConnection = closeConn;
                    return dbConnection;
                }
                else
                {
                    throw new Exception("Connection string empty");
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool CanConnect(string connString)
        {
            try
            {
                this.ExecuteScalar(connString, "select 1 from dual");
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        protected bool ValidateConnectionString(string connString)
        {
            if (connString == null)
            {
                return false;
            }
            else
            {
                if (connString.Length < 15)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        }
        protected bool ValidateCommandText(string spName)
        {
            if (spName == null)
            {
                return false;
            }
            else
            {
                if (spName.Length < 1)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        }

        private DbCommandBuilder GetDbCommandBuilder(DbDataAdapter dbAdapter)
        {
            throw new Exception("The method or operation is not implemented.");
        }

        private DbCommand GetDbCommand(string spName, DbConnection DbConn)
        {
            if (this.BackendType == DataManager.DatabaseType.MsSql)
                return (DbCommand)new SqlCommand(spName, (SqlConnection)DbConn);
            else
                throw new Exception("The selected Backend type is curently not supported by DataLayer");
        }

        private DbDataAdapter GetDataAdapter()
        {
            if (this.BackendType == DataManager.DatabaseType.MsSql)
                return (DbDataAdapter)new SqlDataAdapter();
            else
                throw new Exception("The selected Backend type is curently not supported by DataLayer");
        }

        private DbConnection GetDbConnection(string connString)
        {
            if (this.BackendType == DataManager.DatabaseType.MsSql)
                return (DbConnection)new SqlConnection(connString);
            else
                throw new Exception("The selected Backend type is curently not supported by DataLayer");
        }

        public enum DatabaseType
        {
            MsSql,
            MsAccess,
            MsExcel,
            Oracle,
        }

        protected enum ExecuteAction
        {
            NonQuery,
            Scalar,
        }
    }
}
