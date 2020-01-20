using System;
using System.Data;
using System.Collections;
using System.Data.SqlClient;

namespace Insight.Portal.App.Repositories
{
    public class BuildQuery
    {
        private SqlParameter m_Param;
        private Hashtable m_ParamCollection;
        private string m_ConnString;
        private DataManager m_oDbManager;

        public string ConnectionString
        {
            get
            {
                return m_ConnString;
            }
            set
            {
                m_ConnString = value;
            }
        }

        public BuildQuery(string ConnString)
        {
            //Initialize hashtable which is going to hold parameter collections
            m_ParamCollection = new Hashtable();
            //Set Sql connection string 
            ConnectionString = ConnString;
            //Initailize datalayer object
            m_oDbManager = new DataManager(DataManager.DatabaseType.MsSql);
        }

        public void SetInParam(string ParamName, object ParamValue,SqlDbType Sqltype)
        {
            //Initialize Sql parameter
            m_Param = new SqlParameter();
            //Set parameter name
            m_Param.ParameterName = ParamName;
            //Set parameter value
            m_Param.Value = ParamValue;
            //Set parameter datatype
            m_Param.SqlDbType = Sqltype;
            //Set parameter direction as input
            m_Param.Direction = ParameterDirection.Input;
            //Add parameter into hashtable
            SetParam(m_Param);
        }
        public void SetOutParam(string ParamName, SqlDbType Sqltype)
        {
            //Initialize Sql parameter
            m_Param = new SqlParameter();
            //Set parameter name
            m_Param.ParameterName = ParamName;
            //Set parameter datatype
            m_Param.SqlDbType = Sqltype;
            //Check Out param type
            switch (Sqltype)
            {
                //If outparam type is varchar
                case SqlDbType.VarChar:
                case SqlDbType.NVarChar:
                    {
                        //Set default size
                        m_Param.Size = 1000;
                        break;
                    }
            }

            //Set parameter direction as output
            m_Param.Direction = ParameterDirection.Output;
            //Add parameter in hashtable
            SetParam(m_Param);
        }
        public void SetParam(SqlParameter SqlParam)
        {
            try
            {
                if (true == Utils.IsEmpty(SqlParam.Value))
                {
                    SqlParam.Value = DBNull.Value;
                }
                //Add paramter to hashtable
                m_ParamCollection.Add(SqlParam.ParameterName, SqlParam);
            }
            catch (Exception ex)
            {
                //Throw exception
                throw ex;
            }
        }
        public SqlParameter GetOutParam(string ParamName)
        {
            try
            {
                //Return outparameter from hashtable
                return (SqlParameter)m_ParamCollection[ParamName];
            }
            catch (Exception ex)
            {
                //Throw exception
                throw ex;
            }
        }
        public Hashtable GetParamCollection()
        {
            //Return Sql parameter collection of type hashtable
            return m_ParamCollection;
        }
        public void ClearParameters()
        {
            try
            {
                //Clear parammeter collection of type hashtable
                m_ParamCollection.Clear();
            }
            catch (Exception ex)
            {
                //Throw exception
                throw ex;
            }
        }

        public DataSet ExecuteDataset(string CmdTxt)
        {
            //Check hashtable against empty, if not null then CmdType is text
            if (true == Utils.IsEmpty(m_ParamCollection))
            {
                return m_oDbManager.ExecuteDataset(ConnectionString, CmdTxt);
            }
            //If hash table is not empty
            else
            {
                return m_oDbManager.ExecuteDataset(ConnectionString, CmdTxt, m_ParamCollection);
            }
        }
        public DataSet ExecuteDataset(string CmdTxt, CommandType CmdType)
        {
            //Check hashtable against empty, if not null then CmdType is text
            if (true == Utils.IsEmpty(m_ParamCollection))
            {
                return m_oDbManager.ExecuteDataset(ConnectionString, CmdType, CmdTxt);
            }
            //If hashtable is not empty
            else
            {
                return m_oDbManager.ExecuteDataset(ConnectionString, CmdTxt, m_ParamCollection);
            }
        }
        public DataSet ExecuteDataset(string CmdTxt, CommandType CmdType, int Timeout)
        {
            //Check hashtable against empty, if not null then CmdType is text
            if (true == Utils.IsEmpty(m_ParamCollection))
            {
                return m_oDbManager.ExecuteDataset(ConnectionString, CmdType, CmdTxt, Timeout);
            }
            //If hashtable is not empty
            else
            {
                return m_oDbManager.ExecuteDataset(ConnectionString, CmdTxt, m_ParamCollection, Timeout);
            }
        }

        public long ExecuteNonQuery(string CmdTxt, CommandType CmdType)
        {
            //Number of rows affected as a result of execute nonquery
            long RowsAffected;
            //Check hashtable against empty, if empty then dont pass hashtable
            if (true == Utils.IsEmpty(m_ParamCollection))
            {
                RowsAffected = m_oDbManager.ExecuteNonQuery(ConnectionString, CmdType, CmdTxt);
            }
            //If hashtable is not empty, then pass it to datalayer
            else
            {
                RowsAffected = m_oDbManager.ExecuteNonQuery(ConnectionString, CmdTxt, m_ParamCollection);
                
            }
            //Return no of rows affected
            return RowsAffected;
        }
        public long ExecuteNonQuery(string CmdTxt)
        {
            //Number of rows affected as a result of execute nonquery
            long RowsAffected;
            //Check hashtable against empty, if empty then dont pass hashtable
            if (true == Utils.IsEmpty(m_ParamCollection))
            {
                RowsAffected = m_oDbManager.ExecuteNonQuery(ConnectionString, CmdTxt);
            }
            //If hashtable is not empty, then pass it to datalayer
            else
            {
                RowsAffected = m_oDbManager.ExecuteNonQuery(ConnectionString, CmdTxt, m_ParamCollection);
            }
            //Return no of rows affected
            return RowsAffected;
        }

        public object ExecuteScalar(string CmdTxt, CommandType CmdType)
        {
            //First row first column value returned as a result of execute select query
            object RetVal;
            //Check hashtable against empty, if empty then dont pass hashtable
            if (true == Utils.IsEmpty(m_ParamCollection))
            {
                RetVal = m_oDbManager.ExecuteScalar(ConnectionString, CmdType, CmdTxt);
            }
            //If hashtable is not empty, then pass it to datalayer
            else
            {
                RetVal = m_oDbManager.ExecuteScalar(ConnectionString, CmdTxt, m_ParamCollection);
            }
            //Return first row first col value
            return RetVal;
        }
        public object ExecuteScalar(string CmdTxt)
        {
            //First row first column value returned as a result of execute select query
            object RetVal;
            //Check hashtable against empty, if empty then dont pass hashtable
            if (true == Utils.IsEmpty(m_ParamCollection))
            {
                RetVal = m_oDbManager.ExecuteScalar(ConnectionString, CmdTxt);
            }
            //If hashtable is not empty, then pass it to datalayer
            else
            {
                RetVal = m_oDbManager.ExecuteScalar(ConnectionString, CmdTxt, m_ParamCollection);
            }
            //Return first row first col value
            return RetVal;
        }
    }
}
