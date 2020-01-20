using System;
using System.Collections;
using System.Data;

namespace Insight.Portal.App.Repositories
{
    public class Utils
    {
        protected enum HashType
        {
            Key,
            Value
        }

        public static bool IsEmpty(object Control)
        {
            bool result;
            try
            {
                bool flag = false;
                if (Control != null)
                {
                    if (DBNull.Value != Control)
                    {
                        Type type = Control.GetType();
                        string key;
                        switch (key = type.ToString())
                        {
                            case "System.Data.DataSet":
                                if (((DataSet)Control).Tables.Count <= 0)
                                {
                                    flag = true;
                                    goto IL_4D3;
                                }
                                if (((DataSet)Control).Tables[0].Rows.Count <= 0)
                                {
                                    flag = true;
                                    goto IL_4D3;
                                }
                                goto IL_4D3;
                            case "System.Data.DataTable":
                                if (((DataTable)Control).Rows.Count <= 0)
                                {
                                    flag = true;
                                    goto IL_4D3;
                                }
                                goto IL_4D3;
                            case "System.String":
                                if ("" == Convert.ToString(Control))
                                {
                                    flag = true;
                                    goto IL_4D3;
                                }
                                goto IL_4D3;
                            case "System.Collections.Hashtable":
                                if (((Hashtable)Control).Count == 0)
                                {
                                    flag = true;
                                    goto IL_4D3;
                                }
                                goto IL_4D3;
                            case "System.Collections.ArrayList":
                                if (((ArrayList)Control).Count == 0)
                                {
                                    flag = true;
                                    goto IL_4D3;
                                }
                                goto IL_4D3;
                            case "System.Array":
                                if (((Array)Control).Length == 0)
                                {
                                    flag = true;
                                    goto IL_4D3;
                                }
                                goto IL_4D3;
                            case "System.Byte[]":
                                if (((byte[])Control).Length == 0)
                                {
                                    flag = true;
                                    goto IL_4D3;
                                }
                                goto IL_4D3;
                            case "System.Object[]":
                                if (((object[])Control).Length == 0)
                                {
                                    flag = true;
                                    goto IL_4D3;
                                }
                                goto IL_4D3;
                            case "System.String[]":
                                if (((string[])Control).Length == 0)
                                {
                                    flag = true;
                                    goto IL_4D3;
                                }
                                goto IL_4D3;
                            case "System.Data.DataRow[]":
                                if (((DataRow[])Control).Length == 0)
                                {
                                    flag = true;
                                    goto IL_4D3;
                                }
                                goto IL_4D3;
                            case "System.Data.DataRow":
                                flag = true;
                                for (int i = 0; i < ((DataRow)Control).Table.Columns.Count; i++)
                                {
                                    if (DBNull.Value != ((DataRow)Control)[i])
                                    {
                                        flag = false;
                                        break;
                                    }
                                }
                                goto IL_4D3;
                            case "System.DateTime":
                                {
                                    //DateTime dt = new DateTime(1, 1, 1);
                                    //if (0L == Utils.DateDiff(Utils.DateTimeInterval.Day, dt, (DateTime)Control))
                                    //{
                                    //    flag = true;
                                    //    goto IL_4D3;
                                    //}
                                    if ((DateTime)Control == DateTime.MinValue)
                                    {
                                        flag = true;
                                        goto IL_4D3;
                                    }
                                    goto IL_4D3;
                                }
                            case "System.Int16":
                            case "System.Int32":
                            case "System.Int64":
                            case "System.Double":
                            case "System.Single":
                            case "System.Decimal":
                                if (double.Parse(Control.ToString()) == 0.0)
                                {
                                    flag = true;
                                    goto IL_4D3;
                                }
                                goto IL_4D3;
                            case "System.Guid":
                                if (((Guid)Control).ToString() == "00000000-0000-0000-0000-000000000000")
                                {
                                    flag = true;
                                    goto IL_4D3;
                                }
                                goto IL_4D3;
                            case "System.Boolean":
                                goto IL_4D3;
                        }
                        throw new Exception("Unknown control type:" + type.ToString());
                    }
                    flag = true;
                }
                else
                {
                    flag = true;
                }
                IL_4D3:
                result = flag;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }

        public static Array GetHashValue(Hashtable HashValue)
        {
            return Utils.GetHash(HashValue, Utils.HashType.Value);
        }

        public static Array GetHashKey(Hashtable HashValue)
        {
            return Utils.GetHash(HashValue, Utils.HashType.Key);
        }

        protected static Array GetHash(Hashtable HashValue, Utils.HashType Type)
        {
            Array result;
            try
            {
                if (HashValue == null)
                {
                    throw new Exception("Null Hashtable reference not set to an instance");
                }
                Array array = Array.CreateInstance(typeof(object), HashValue.Count);
                if (Type == Utils.HashType.Key)
                {
                    HashValue.Keys.CopyTo(array, 0);
                }
                else
                {
                    HashValue.Values.CopyTo(array, 0);
                }
                result = array;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }
    }
}