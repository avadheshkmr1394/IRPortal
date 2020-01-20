using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using Column = DocumentFormat.OpenXml.Spreadsheet.Column;
using Columns = DocumentFormat.OpenXml.Spreadsheet.Columns;
using Text = DocumentFormat.OpenXml.Spreadsheet.Text;
//using BaselineTypes;
using System.Data;
using System.Web;

namespace Insight.Portal.Services.WebApi.Utils.Excel
{
    public class ExcelExport
    {
        #region InternalMethods
        public bool isITAreaListPage = false;
        internal class ColumnCaption
        {
            private static string[] Alphabets = { "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z" };
            private static ColumnCaption instance = null;
            private List<string> cellHeaders = null;
            public static ColumnCaption Instance
            {
                get
                {
                    if (instance == null)
                        return new ColumnCaption();
                    else return ColumnCaption.Instance;
                }
            }

            public ColumnCaption()
            {
                this.InitCollection();
            }

            private void InitCollection()
            {
                cellHeaders = new List<string>();

                foreach (string sItem in Alphabets)
                    cellHeaders.Add(sItem);

                foreach (string item in Alphabets)
                    foreach (string sItem in Alphabets)
                        cellHeaders.Add(item + sItem);
                // cellHeaders.RemoveAt(0);
            }

            /// <summary>
            /// Returns the column caption for the given row & column index.
            /// </summary>
            /// <param name="rowIndex">Index of the row.</param>
            /// <param name="columnIndex">Index of the column.</param>
            /// <returns></returns>
            internal string Get(int rowIndex, int columnIndex)
            {
                return this.cellHeaders.ElementAt(columnIndex) + (rowIndex + 1).ToString();
            }
        }
        internal class IrTextCell : Cell
        {
            private CellValue cellValue;
            public IrTextCell(int rowIndex, int colIndex, string text, bool? isAlternateRow = null, int styleIndex = 0)
            {
                CellReference = ColumnCaption.Instance.Get(Convert.ToInt32(rowIndex), colIndex);
                DataType = CellValues.String;
                cellValue = new CellValue();
                cellValue.Text = text;
                Append(cellValue);
                if (null != isAlternateRow) StyleIndex = !Convert.ToBoolean(isAlternateRow) ? (UInt32Value)13 : (UInt32Value)16;
                if (styleIndex > 0) { StyleIndex = Convert.ToUInt32(styleIndex); }
            }
        }
        internal class IrTextCellWrap : Cell
        {
            private CellValue cellValue;
            public IrTextCellWrap(int rowIndex, int colIndex, string text, bool? isAlternateRow = null, int styleIndex = 0)
            {
                CellReference = ColumnCaption.Instance.Get(Convert.ToInt32(rowIndex), colIndex);
                DataType = CellValues.String;
                cellValue = new CellValue();
                cellValue.Text = text;
                Append(cellValue);
                if (null != isAlternateRow) StyleIndex = !Convert.ToBoolean(isAlternateRow) ? (UInt32Value)27 : (UInt32Value)28;
                if (styleIndex > 0) { StyleIndex = Convert.ToUInt32(styleIndex); }
            }
        }
        internal class IrDateCell : Cell
        {
            private CellValue cellValue;
            public IrDateCell(int rowIndex, int colIndex, string text, bool? isAlternateRow = null, int styleIndex = 0)
            {
                CellReference = ColumnCaption.Instance.Get(Convert.ToInt32(rowIndex), colIndex);
                DataType = CellValues.String;
                cellValue = new CellValue();
                cellValue.Text = text;
                Append(cellValue);
                if (null != isAlternateRow) StyleIndex = !Convert.ToBoolean(isAlternateRow) ? (UInt32Value)1 : (UInt32Value)14;
                if (styleIndex > 0) { StyleIndex = Convert.ToUInt32(styleIndex); }
            }
        }
        internal class IrNumberCell : Cell
        {
            private CellValue cellValue;
            public IrNumberCell(int rowIndex, int colIndex, string text, bool? isAlternateRow = null, int styleIndex = 0)
            {
                decimal val = 0m;
                decimal.TryParse(text, out val);
                CellReference = ColumnCaption.Instance.Get(Convert.ToInt32(rowIndex), colIndex);
                DataType = CellValues.Number;
                cellValue = new CellValue();
                if (val != 0.0m) cellValue.Text = Convert.ToString(val);
                Append(cellValue);
                if (null != isAlternateRow) StyleIndex = !Convert.ToBoolean(isAlternateRow) ? (UInt32Value)2 : (UInt32Value)15;
                if (styleIndex > 0) { StyleIndex = Convert.ToUInt32(styleIndex); }
            }
        }
        internal class IrIntegerCell : Cell
        {
            private CellValue cellValue;
            public IrIntegerCell(int rowIndex, int colIndex, string text, bool? isAlternateRow = null, int styleIndex = 0)
            {
                int val = 0;
                int.TryParse(text, out val);
                CellReference = ColumnCaption.Instance.Get(Convert.ToInt32(rowIndex), colIndex);
                DataType = CellValues.Number;
                cellValue = new CellValue();
                if (val != 0.0m) cellValue.Text = Convert.ToString(val);
                Append(cellValue);
                if (null != isAlternateRow) StyleIndex = !Convert.ToBoolean(isAlternateRow) ? (UInt32Value)17 : (UInt32Value)18;
                if (styleIndex > 0) { StyleIndex = Convert.ToUInt32(styleIndex); }
            }
        }
        #endregion

        public string ExportToExcel<T>(string fileName, List<T> listData, string sheetName, List<string> headerNames, List<string> fieldsToBeExported, string unitId, string FilterOption)
        {
            using (SpreadsheetDocument excelDoc = SpreadsheetDocument.Create(fileName, DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook))
            {
                CreateExcelParts(excelDoc, listData, sheetName, headerNames, fieldsToBeExported, unitId, FilterOption);
            }
            return fileName;
        }
        public string ExportToExcel(string fileName, DataSet data, string sheetName, List<string> headerNames, List<string> fieldsToBeExported, string unitId, string FilterOption)
        {
            using (SpreadsheetDocument excelDoc = SpreadsheetDocument.Create(fileName, DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook))
            {
                CreateExcelParts(excelDoc, data, sheetName, headerNames, fieldsToBeExported, unitId, FilterOption);
            }
            return fileName;
        }
        private void CreateExcelParts(SpreadsheetDocument spreadsheetDoc, DataSet dsData, string sheetName, List<string> headerNames, List<string> fieldsToBeExported, string unitId, string filterOption)
        {
            WorkbookPart workbookPart = spreadsheetDoc.AddWorkbookPart();
            CreateWorkbookPart(workbookPart, sheetName);

            int workBookPartCount = 1;

            WorkbookStylesPart workbookStylesPart = workbookPart.AddNewPart<WorkbookStylesPart>("rId" + (workBookPartCount++).ToString());
            CreateWorkbookStylesPart(workbookStylesPart);

            WorksheetPart worksheetPart = workbookPart.AddNewPart<WorksheetPart>("rId" + (101).ToString());
            CreateWorksheetPart(workbookPart.WorksheetParts.ElementAt(0), dsData, sheetName, headerNames, fieldsToBeExported, unitId, filterOption);

            SharedStringTablePart sharedStringTablePart = workbookPart.AddNewPart<SharedStringTablePart>("rId" + (workBookPartCount++).ToString());
            CreateSharedStringTablePart(sharedStringTablePart, dsData, fieldsToBeExported, headerNames);

            workbookPart.Workbook.Save();
        }
        private void CreateExcelParts<T>(SpreadsheetDocument spreadsheetDoc, List<T> listData, string sheetName, List<string> headerNames, List<string> fieldsToBeExported, string unitId, string filterOption)
        {
            WorkbookPart workbookPart = spreadsheetDoc.AddWorkbookPart();
            CreateWorkbookPart(workbookPart, sheetName);

            int workBookPartCount = 1;

            WorkbookStylesPart workbookStylesPart = workbookPart.AddNewPart<WorkbookStylesPart>("rId" + (workBookPartCount++).ToString());
            CreateWorkbookStylesPart(workbookStylesPart);

            WorksheetPart worksheetPart = workbookPart.AddNewPart<WorksheetPart>("rId" + (101).ToString());
            CreateWorksheetPart(workbookPart.WorksheetParts.ElementAt(0), listData, sheetName, headerNames, fieldsToBeExported, unitId, filterOption);

            SharedStringTablePart sharedStringTablePart = workbookPart.AddNewPart<SharedStringTablePart>("rId" + (workBookPartCount++).ToString());
            CreateSharedStringTablePart(sharedStringTablePart, listData, fieldsToBeExported, headerNames);

            workbookPart.Workbook.Save();
        }

        private void CreateSharedStringTablePart<T>(SharedStringTablePart sharedStringTablePart, List<T> listData, List<string> fieldsToBeExported, List<string> headerNames)
        {
            UInt32Value stringCount = Convert.ToUInt32(listData.Count) + Convert.ToUInt32(fieldsToBeExported.Count);
            SharedStringTable sharedStringTable = new SharedStringTable() { Count = stringCount, UniqueCount = stringCount };

            foreach (string headerName in headerNames)
            {
                SharedStringItem sharedStringItem = new SharedStringItem();
                Text text = new Text();
                text.Text = headerName;
                sharedStringItem.Append(text);
                sharedStringTable.Append(sharedStringItem);
            }
            sharedStringTablePart.SharedStringTable = sharedStringTable;
        }
        private void CreateSharedStringTablePart(SharedStringTablePart sharedStringTablePart, DataSet dsData, List<string> fieldsToBeExported, List<string> headerNames)
        {
            UInt32Value stringCount = Convert.ToUInt32(dsData.Tables[0].Rows.Count) + Convert.ToUInt32(fieldsToBeExported.Count);
            SharedStringTable sharedStringTable = new SharedStringTable() { Count = stringCount, UniqueCount = stringCount };

            foreach (string headerName in headerNames)
            {
                SharedStringItem sharedStringItem = new SharedStringItem();
                Text text = new Text();
                text.Text = headerName;
                sharedStringItem.Append(text);
                sharedStringTable.Append(sharedStringItem);
            }
            sharedStringTablePart.SharedStringTable = sharedStringTable;
        }

        private void CreateWorksheetPart<T>(WorksheetPart worksheetPart, List<T> listData, string sheetName, List<string> headerNames, List<string> fieldsToBeExported, string unitId, string filterOption)
        {
            Worksheet worksheet = new Worksheet() { MCAttributes = new MarkupCompatibilityAttributes() { Ignorable = "x14ac" } };
            worksheet.AddNamespaceDeclaration("r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships");
            worksheet.AddNamespaceDeclaration("mc", "http://schemas.openxmlformats.org/markup-compatibility/2006");
            worksheet.AddNamespaceDeclaration("x14ac", "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac");

            SheetViews sheetViews = new SheetViews();
            SheetView sheetView = new SheetView() { WorkbookViewId = (UInt32Value)0U };
            Selection selection = new Selection() { ActiveCell = "A1" };
            sheetView.Append(selection);
            sheetViews.Append(sheetView);

            PageMargins pageMargins = new PageMargins() { Left = 0.7D, Right = 0.7D, Top = 0.75D, Bottom = 0.75D, Header = 0.3D, Footer = 0.3D };
            SheetFormatProperties sheetFormatPr = new SheetFormatProperties() { DefaultRowHeight = 15D, DyDescent = 0.25D };

            SheetData sheetData = new SheetData();

            UInt32Value rowIndex = 1U;
            Row row;
            Cell cell;

            string ExcelSheetHeadingMain = string.Empty;
            string ExcelSheetHeading = string.Empty;
            switch (sheetName)
            {
                case "GroupInsightList":
                    if (Convert.ToInt32(unitId) == 0)
                    {
                        ExcelSheetHeadingMain = "Company - Idea (Generation)";
                        ExcelSheetHeading = "A listing of active Ideas in a Company";
                    }
                    else
                    {
                        ExcelSheetHeadingMain = "Ideas - Admin " + " (G" + unitId + ")";
                        ExcelSheetHeading = "Custom list of Ideas";
                    }
                    break;
                case "ITCostRequests":
                    ExcelSheetHeadingMain = Convert.ToInt32(unitId) > 0 ? ("Group(" + unitId + ") - IT Cost Requests") : "Company - IT Cost Requests";
                    break;
                case "NPEDetails":
                    ExcelSheetHeadingMain = Convert.ToInt32(unitId) > 0 ? ("Group(" + unitId + ") - NPE Details") : "Company - NPE Details";// "NPE Details";
                    break;
                case "RevenueDetails":
                    ExcelSheetHeadingMain = Convert.ToInt32(unitId) > 0 ? ("Group(" + unitId + ") - Revenue Details") : "Company - Revenue Details";//"Revenue Details";
                    break;
                case "GroupIdeas":
                    ExcelSheetHeadingMain = "Group Ideas (Valuation) - " + " (G" + unitId + ")";
                    ExcelSheetHeading = "Custom list of Ideas (Valuation)";
                    break;
                case "CompanyIdeas":
                    ExcelSheetHeadingMain = "Company Ideas (Valuation)";
                    ExcelSheetHeading = "Custom list of Ideas (Valuation)";
                    break;
                case "GoIdeas":
                    ExcelSheetHeadingMain = Convert.ToInt32(unitId) > 0 ? ("Group(" + unitId + ") - Go Ideas") : "Company - Go Ideas";
                    break;
                case "GroupProjects":
                    ExcelSheetHeadingMain = "Group Projects - " + " (G" + unitId + ")";
                    ExcelSheetHeading = "Custom list of Projects";
                    break;
                case "CompanyProjects":
                    ExcelSheetHeadingMain = "Company Projects";
                    ExcelSheetHeading = "Custom list of Projects";
                    break;
                case "LineItems":
                    //ExcelSheetHeadingMain = "Line Items " + " (G" + unitId + ")";
                    ExcelSheetHeadingMain = Convert.ToInt32(unitId) > 0 ? ("Group(" + unitId + ") - Line Items") : "IT - Line Items";
                    ExcelSheetHeading = "Custom list of LineItems";
                    break;
                default:
                    ExcelSheetHeadingMain = Convert.ToInt32(unitId) > 0 ? ("Group(" + unitId + ") - " + sheetName) : "Company - " + sheetName;
                    break;
            }

            row = new Row() { RowIndex = rowIndex++, Spans = new ListValue<StringValue>() { InnerText = "1:3" }, DyDescent = 0.25D };
            cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), 0, ExcelSheetHeadingMain);
            cell.StyleIndex = 12;
            row.Append(cell);
            sheetData.Append(row);

            row = new Row() { RowIndex = rowIndex++, Spans = new ListValue<StringValue>() { InnerText = "1:3" }, DyDescent = 0.25D };
            cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), 0, DateTime.Now.ToString());
            row.Append(cell);
            sheetData.Append(row);

            if (ExcelSheetHeading != string.Empty)
            {
                row = new Row() { RowIndex = rowIndex++, Spans = new ListValue<StringValue>() { InnerText = "1:3" }, DyDescent = 0.25D };
                cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), 0, ExcelSheetHeading);
                row.Append(cell);
                sheetData.Append(row);
            }

            if (filterOption != string.Empty)// Will add row only if filter is available
            {
                row = new Row() { RowIndex = rowIndex++, Spans = new ListValue<StringValue>() { InnerText = "1:3" }, DyDescent = 0.25D };
                cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), 0, ("Filter : " + filterOption));
                row.Append(cell);
                sheetData.Append(row);
            }

            row = new Row() { RowIndex = rowIndex++, Spans = new ListValue<StringValue>() { InnerText = "1:3" }, DyDescent = 0.25D };
            for (int columnIndex = 0; columnIndex < headerNames.Count; columnIndex++)
            {
                cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), columnIndex, headerNames[columnIndex].ToString().FormatCode());
                cell.StyleIndex = 11;
                row.Append(cell);
            }
            sheetData.Append(row);

            for (int rIndex = 0; rIndex < listData.Count; rIndex++)
            {
                row = new Row() { RowIndex = rowIndex++, Spans = new ListValue<StringValue>() { InnerText = "1:3" }, DyDescent = 0.25D };
                bool isAlternateRow = (rIndex % 2 == 0);
                var rowData = listData[rIndex];
                int styleIndex = 0;
                if (isITAreaListPage)
                {
                    object itStatus = rowData.GetType().GetProperty("ITStatus").GetValue(rowData, null);
                    if (itStatus != null)
                        switch (Convert.ToString(itStatus))
                        {
                            case "In Progress":
                                styleIndex = 19;
                                break;
                            case "Submitted":
                            case "Resubmitted":
                                styleIndex = 20;
                                break;
                            case "Posted":
                                styleIndex = 21;
                                break;
                            case "Accepted":
                                styleIndex = 22;
                                break;
                        }
                }

                for (int cIndex = 0; cIndex < fieldsToBeExported.Count; cIndex++)
                {
                    string fieldName = fieldsToBeExported[cIndex];
                    string str = string.Empty;
                    if (fieldName == "FocusAreaID")
                    {
                        object ob1 = rowData.GetType().GetProperty("FocusAreaNumber").GetValue(rowData, null);
                        if (Convert.ToString(ob1) != "0")
                        {
                            object ob2 = rowData.GetType().GetProperty("FocusAreaName").GetValue(rowData, null);
                            str = string.Format("{0}-{1}", Convert.ToString(ob1), Convert.ToString(ob2));
                        }
                    }
                    object objVal = rowData.GetType().GetProperty(fieldName).GetValue(rowData, null);

                    if (objVal != null)
                    {
                        if (fieldName == "AllComments")
                        {
                            cell = new IrTextCellWrap((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, Convert.ToString(objVal), isAlternateRow, styleIndex);
                        }
                        else if (objVal is string)
                        {
                            cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, (fieldName == "FocusAreaID") ? str : Convert.ToString(objVal), isAlternateRow, styleIndex);
                        }
                        else if (objVal is bool)
                        {
                            cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, (bool)objVal ? "Yes" : "No", isAlternateRow, styleIndex);
                        }
                        else if (objVal is DateTime)
                        {
                            cell = new IrDateCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, string.Format("{0:MM/dd/yyyy}", objVal), isAlternateRow, styleIndex);//((DateTime)objVal).ToOADate().ToString()
                            //cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, string.Format("{0:MM/dd/yyyy}", objVal), isAlternateRow, styleIndex);
                        }
                        else if (objVal is decimal || objVal is double)
                        {
                            cell = new IrNumberCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, Convert.ToString(objVal), isAlternateRow, styleIndex);
                        }
                        else
                        {
                            long value;
                            if (long.TryParse(objVal.ToString(), out value))
                            {
                                cell = new IrIntegerCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, Convert.ToString(objVal), isAlternateRow, styleIndex);
                            }
                            else
                            {
                                cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, Convert.ToString(objVal), isAlternateRow, styleIndex);
                            }
                        }
                    }
                    else
                    {
                        cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex,
                                (fieldName == "FocusAreaID") ? str : Convert.ToString(objVal), isAlternateRow,
                                styleIndex);
                    }
                    row.Append(cell);

                }

                sheetData.Append(row);
            }

            //>>donot change the order of appended part, will produce error of repairing
            worksheet.Append(sheetViews);
            worksheet.Append(sheetFormatPr);
            worksheet.Append(sheetData);
            worksheet.Append(pageMargins);
            worksheetPart.Worksheet = worksheet;
            //>>donot change the order of appended part, will produce error of repairing


            //>> Merger cell B1 to NoOfColumns
            MergeCells mergeCells;
            if (worksheet.Elements<MergeCells>().Any()) mergeCells = worksheet.Elements<MergeCells>().First();
            else
            {
                mergeCells = new MergeCells();

                // Insert a MergeCells object into the specified position.
                if (worksheet.Elements<CustomSheetView>().Any()) worksheet.InsertAfter(mergeCells, worksheet.Elements<CustomSheetView>().First());
                else worksheet.InsertAfter(mergeCells, worksheet.Elements<SheetData>().First());
            }

            // Create the merged cell and append it to the MergeCells collection.
            MergeCell mergeCell = new MergeCell() { Reference = new StringValue(string.Format("A1:{0}", ColumnCaption.Instance.Get(0, headerNames.Count - 1))) };
            mergeCells.Append(mergeCell);
            //>> Merger cell B1 to NoOfColumns

            //>>Below code set column width(maxWidth 200)
            const int maxWidth = 100;
            int numCols = headerNames.Count;
            for (int col = 0; col < numCols; col++)
            {
                int width = headerNames[col].Length + 2;
                foreach (T obj in listData)
                {
                    PropertyInfo myf = obj.GetType().GetProperty(fieldsToBeExported[col]);
                    if (myf != null) width = Math.Max(width, Convert.ToString(myf.GetValue(obj, null)).Length);
                    if (width >= maxWidth) break;
                }
                SetColumnWidth(worksheetPart.Worksheet, (UInt32)col + 1, Math.Min(width, maxWidth));
            }

        }

        private void CreateWorksheetPart(WorksheetPart worksheetPart, DataSet dsData, string sheetName, List<string> headerNames, List<string> fieldsToBeExported, string unitId, string filterOption)
        {
            Worksheet worksheet = new Worksheet() { MCAttributes = new MarkupCompatibilityAttributes() { Ignorable = "x14ac" } };
            worksheet.AddNamespaceDeclaration("r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships");
            worksheet.AddNamespaceDeclaration("mc", "http://schemas.openxmlformats.org/markup-compatibility/2006");
            worksheet.AddNamespaceDeclaration("x14ac", "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac");

            SheetViews sheetViews = new SheetViews();
            SheetView sheetView = new SheetView() { WorkbookViewId = (UInt32Value)0U };
            Selection selection = new Selection() { ActiveCell = "A1" };
            sheetView.Append(selection);
            sheetViews.Append(sheetView);

            PageMargins pageMargins = new PageMargins() { Left = 0.7D, Right = 0.7D, Top = 0.75D, Bottom = 0.75D, Header = 0.3D, Footer = 0.3D };
            SheetFormatProperties sheetFormatPr = new SheetFormatProperties() { DefaultRowHeight = 15D, DyDescent = 0.25D };

            SheetData sheetData = new SheetData();

            UInt32Value rowIndex = 1U;
            Row row;
            Cell cell;

            string ExcelSheetHeadingMain = string.Empty;
            string ExcelSheetHeading = string.Empty;

            ExcelSheetHeadingMain = Convert.ToInt32(unitId) > 0 ? ("Group(" + unitId + ") - " + sheetName) : "Company - " + sheetName;

            row = new Row() { RowIndex = rowIndex++, Spans = new ListValue<StringValue>() { InnerText = "1:3" }, DyDescent = 0.25D };
            cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), 0, ExcelSheetHeadingMain);
            cell.StyleIndex = 12;
            row.Append(cell);
            sheetData.Append(row);

            row = new Row() { RowIndex = rowIndex++, Spans = new ListValue<StringValue>() { InnerText = "1:3" }, DyDescent = 0.25D };
            cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), 0, DateTime.Now.ToString());
            row.Append(cell);
            sheetData.Append(row);

            if (ExcelSheetHeading != string.Empty)
            {
                row = new Row() { RowIndex = rowIndex++, Spans = new ListValue<StringValue>() { InnerText = "1:3" }, DyDescent = 0.25D };
                cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), 0, ExcelSheetHeading);
                row.Append(cell);
                sheetData.Append(row);
            }

            if (filterOption != string.Empty)// Will add row only if filter is available
            {
                row = new Row() { RowIndex = rowIndex++, Spans = new ListValue<StringValue>() { InnerText = "1:3" }, DyDescent = 0.25D };
                cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), 0, ("Filter : " + filterOption));
                row.Append(cell);
                sheetData.Append(row);
            }

            row = new Row() { RowIndex = rowIndex++, Spans = new ListValue<StringValue>() { InnerText = "1:3" }, DyDescent = 0.25D };
            for (int columnIndex = 0; columnIndex < headerNames.Count; columnIndex++)
            {
                cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), columnIndex, headerNames[columnIndex].ToString().FormatCode());
                cell.StyleIndex = 11;
                row.Append(cell);
            }
            sheetData.Append(row);

            for (int rIndex = 0; rIndex < dsData.Tables[0].Rows.Count; rIndex++)
            {
                row = new Row() { RowIndex = rowIndex++, Spans = new ListValue<StringValue>() { InnerText = "1:3" }, DyDescent = 0.25D };
                bool isAlternateRow = (rIndex % 2 == 0);
                var rowData = dsData.Tables[0].Rows[rIndex];
                int styleIndex = 0;


                for (int cIndex = 0; cIndex < fieldsToBeExported.Count; cIndex++)
                {
                    string fieldName = fieldsToBeExported[cIndex];
                    string str = string.Empty;

                    object objVal = rowData[fieldName];

                    if (objVal != null)
                    {
                        if (fieldName == "AllComments")
                        {
                            cell = new IrTextCellWrap((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, Convert.ToString(objVal), isAlternateRow, styleIndex);
                        }
                        else if (objVal is string)
                        {
                            cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, (fieldName == "FocusAreaID") ? str : Convert.ToString(objVal), isAlternateRow, styleIndex);
                        }
                        else if (objVal is bool)
                        {
                            cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, (bool)objVal ? "Yes" : "No", isAlternateRow, styleIndex);
                        }
                        else if (objVal is DateTime)
                        {
                            cell = new IrDateCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, string.Format("{0:MM/dd/yyyy}", objVal), isAlternateRow, styleIndex);
                        }
                        else if (objVal is decimal || objVal is double)
                        {
                            cell = new IrNumberCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, Convert.ToString(objVal), isAlternateRow, styleIndex);
                        }
                        else
                        {
                            long value;
                            if (long.TryParse(objVal.ToString(), out value))
                            {
                                cell = new IrIntegerCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, Convert.ToString(objVal), isAlternateRow, styleIndex);
                            }
                            else
                            {
                                cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, Convert.ToString(objVal), isAlternateRow, styleIndex);
                            }
                        }
                    }
                    else
                    {
                        cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex,
                                Convert.ToString(objVal), isAlternateRow,
                                styleIndex);
                    }
                    row.Append(cell);

                }

                sheetData.Append(row);
            }

            //>>donot change the order of appended part, will produce error of repairing
            worksheet.Append(sheetViews);
            worksheet.Append(sheetFormatPr);
            worksheet.Append(sheetData);
            worksheet.Append(pageMargins);
            worksheetPart.Worksheet = worksheet;
            //>>donot change the order of appended part, will produce error of repairing


            //>> Merger cell B1 to NoOfColumns
            MergeCells mergeCells;
            if (worksheet.Elements<MergeCells>().Any()) mergeCells = worksheet.Elements<MergeCells>().First();
            else
            {
                mergeCells = new MergeCells();

                // Insert a MergeCells object into the specified position.
                if (worksheet.Elements<CustomSheetView>().Any()) worksheet.InsertAfter(mergeCells, worksheet.Elements<CustomSheetView>().First());
                else worksheet.InsertAfter(mergeCells, worksheet.Elements<SheetData>().First());
            }

            // Create the merged cell and append it to the MergeCells collection.
            MergeCell mergeCell = new MergeCell() { Reference = new StringValue(string.Format("A1:{0}", ColumnCaption.Instance.Get(0, headerNames.Count - 1))) };
            mergeCells.Append(mergeCell);
            //>> Merger cell B1 to NoOfColumns            

            //>>Below code set column width(maxWidth 200)
            const int maxWidth = 200;
            int numCols = 0;

            for (int columnIndex = 0; columnIndex < fieldsToBeExported.Count; columnIndex++)
            {
                int width = Convert.ToString(fieldsToBeExported[columnIndex]).Length + 4;
                foreach (DataRow dataRow in dsData.Tables[0].Rows)
                {
                    width = Math.Max(width, Convert.ToString(dataRow[fieldsToBeExported[columnIndex]]).Length);
                    if (width >= maxWidth) break;
                }
                SetColumnWidth(worksheetPart.Worksheet, (UInt32)numCols + 1, Math.Min(width, maxWidth));
                numCols++;
            }

        }

        private void CreateWorkbookStylesPart(WorkbookStylesPart workbookStylesPart)
        {
            Stylesheet stylesheet = new CustomStylesheet() { MCAttributes = new MarkupCompatibilityAttributes() { Ignorable = "x14ac" } };
            stylesheet.AddNamespaceDeclaration("mc", "http://schemas.openxmlformats.org/markup-compatibility/2006");
            stylesheet.AddNamespaceDeclaration("x14ac", "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac");

            StylesheetExtensionList stylesheetExtensionList = new StylesheetExtensionList();
            StylesheetExtension stylesheetExtension = new StylesheetExtension() { Uri = "{EB79DEF2-80B8-43e5-95BD-54CBDDF9020C}" };
            stylesheetExtension.AddNamespaceDeclaration("x14", "http://schemas.microsoft.com/office/spreadsheetml/2009/9/main");
            DocumentFormat.OpenXml.Office2010.Excel.SlicerStyles slicerStyles = new DocumentFormat.OpenXml.Office2010.Excel.SlicerStyles() { DefaultSlicerStyle = "SlicerStyleLight1" };
            stylesheetExtension.Append(slicerStyles);
            stylesheetExtensionList.Append(stylesheetExtension);

            stylesheet.Append(stylesheetExtensionList);

            workbookStylesPart.Stylesheet = stylesheet;
        }

        private void CreateWorkbookPart(WorkbookPart workbookPart, string sheetName)
        {
            Workbook workbook = new Workbook();
            Sheets sheets = new Sheets();

            Sheet sheet = new Sheet() { Name = sheetName, SheetId = Convert.ToUInt32(101), Id = "rId" + (101).ToString() };
            sheets.Append(sheet);

            CalculationProperties calculationProperties = new CalculationProperties()
            {
                CalculationId = (UInt32Value)123456U  // some default Int32Value
            };

            workbook.Append(sheets);
            workbook.Append(calculationProperties);

            workbookPart.Workbook = workbook;
        }

        private static void SetColumnWidth(Worksheet worksheet, uint index, DoubleValue dwidth)
        {
            Columns cs = worksheet.GetFirstChild<Columns>();
            if (cs != null)
            {
                IEnumerable<Column> ic = cs.Elements<Column>().Where(r => r.Min == index).Where(r => r.Max == index);
                if (ic.Any())
                {
                    Column c = ic.First();
                    c.Width = dwidth;
                }
                else
                {
                    Column c = new Column() { Min = index, Max = index, Width = dwidth, CustomWidth = true };
                    cs.Append(c);
                }
            }
            else
            {
                cs = new Columns();
                Column c = new Column() { Min = index, Max = index, Width = dwidth, CustomWidth = true };
                cs.Append(c);
                worksheet.InsertAfter(cs, worksheet.GetFirstChild<SheetFormatProperties>());
            }
        }

        #region "Export With PageName"
        public string ExportToExcel<T>(string fileName, List<T> listData, string sheetName, List<string> headerNames, List<string> fieldsToBeExported, string OrganisationName, string ExcelSheetHeadingMain, string PageName)
        {
            using (SpreadsheetDocument excelDoc = SpreadsheetDocument.Create(fileName, DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook))
            {
                CreateExcelParts(excelDoc, listData, sheetName, headerNames, fieldsToBeExported, OrganisationName, ExcelSheetHeadingMain, PageName);
            }
            return fileName;
        }

        private void CreateExcelParts<T>(SpreadsheetDocument spreadsheetDoc, List<T> listData, string sheetName, List<string> headerNames, List<string> fieldsToBeExported, string OrganisationName, string ExcelSheetHeadingMain, string PageName)
        {
            WorkbookPart workbookPart = spreadsheetDoc.AddWorkbookPart();
            CreateWorkbookPart(workbookPart, sheetName);

            int workBookPartCount = 1;

            WorkbookStylesPart workbookStylesPart = workbookPart.AddNewPart<WorkbookStylesPart>("rId" + (workBookPartCount++).ToString());
            CreateWorkbookStylesPart(workbookStylesPart);

            WorksheetPart worksheetPart = workbookPart.AddNewPart<WorksheetPart>("rId" + (101).ToString());
            CreateWorksheetPart(workbookPart.WorksheetParts.ElementAt(0), listData, sheetName, headerNames, fieldsToBeExported, OrganisationName, ExcelSheetHeadingMain, PageName);

            SharedStringTablePart sharedStringTablePart = workbookPart.AddNewPart<SharedStringTablePart>("rId" + (workBookPartCount++).ToString());
            CreateSharedStringTablePart(sharedStringTablePart, listData, fieldsToBeExported, headerNames);

            workbookPart.Workbook.Save();
        }
        private void CreateWorksheetPart<T>(WorksheetPart worksheetPart, List<T> listData, string sheetName, List<string> headerNames, List<string> fieldsToBeExported, string OrganisationName, string ExcelSheetHeadingMain, string PageName)
        {
            Worksheet worksheet = new Worksheet() { MCAttributes = new MarkupCompatibilityAttributes() { Ignorable = "x14ac" } };
            worksheet.AddNamespaceDeclaration("r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships");
            worksheet.AddNamespaceDeclaration("mc", "http://schemas.openxmlformats.org/markup-compatibility/2006");
            worksheet.AddNamespaceDeclaration("x14ac", "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac");


            SheetViews sheetViews = new SheetViews();
            SheetView sheetView = new SheetView() { WorkbookViewId = (UInt32Value)0U };
            Selection selection = new Selection() { ActiveCell = "A1" };
            sheetView.Append(selection);
            sheetViews.Append(sheetView);

            PageMargins pageMargins = new PageMargins() { Left = 0.7D, Right = 0.7D, Top = 0.75D, Bottom = 0.75D, Header = 0.3D, Footer = 0.3D };
            SheetFormatProperties sheetFormatPr = new SheetFormatProperties() { DefaultRowHeight = 15D, DyDescent = 0.25D };

            SheetData sheetData = new SheetData();

            UInt32Value rowIndex = 1U;
            Row row;
            Cell cell;

            string ExcelSheetHeading = string.Empty;

            ExcelSheetHeading = OrganisationName;

            row = new Row() { RowIndex = rowIndex++, Spans = new ListValue<StringValue>() { InnerText = "1:3" }, DyDescent = 0.25D };
            cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), 0, ExcelSheetHeadingMain);
            cell.StyleIndex = 12;
            row.Append(cell);
            sheetData.Append(row);

            row = new Row() { RowIndex = rowIndex++, Spans = new ListValue<StringValue>() { InnerText = "1:3" }, DyDescent = 0.25D };
            cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), 0, DateTime.Now.ToString());
            row.Append(cell);
            sheetData.Append(row);

            if (ExcelSheetHeading != string.Empty)
            {
                row = new Row() { RowIndex = rowIndex++, Spans = new ListValue<StringValue>() { InnerText = "1:3" }, DyDescent = 0.25D };
                cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), 0, ExcelSheetHeading);
                row.Append(cell);
                sheetData.Append(row);
            }

            row = new Row() { RowIndex = rowIndex++, Spans = new ListValue<StringValue>() { InnerText = "1:3" }, DyDescent = 0.25D };
            if (PageName != "ExecutiveDashboard")
            {
                for (int columnIndex = 0; columnIndex < headerNames.Count; columnIndex++)
                {
                    cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), columnIndex, headerNames[columnIndex].ToString().FormatCode() == "KPIName" ? "" : headerNames[columnIndex].ToString().FormatCode());
                    cell.StyleIndex = 11;
                    row.Append(cell);
                }
                sheetData.Append(row);
            }

            for (int rIndex = 0; rIndex < listData.Count; rIndex++)
            {
                row = new Row() { RowIndex = rowIndex++, Spans = new ListValue<StringValue>() { InnerText = "1:3" }, DyDescent = 0.25D };
                bool isAlternateRow = (rIndex % 2 == 0);
                var rowData = listData[rIndex];
                int styleIndex = 0;

                string strDashboardFieldValue = string.Empty;
                //if (PageName == "Dashboard")
                //{
                //    strDashboardFieldValue = Convert.ToString(rowData.GetType().GetProperty(fieldsToBeExported[0]).GetValue(rowData, null));
                //}

                for (int cIndex = 0; cIndex < fieldsToBeExported.Count; cIndex++)
                {
                    string fieldName = fieldsToBeExported[cIndex];
                    string str = string.Empty;
                    if (fieldName == "FocusAreaID")
                    {
                        object ob1 = rowData.GetType().GetProperty("FocusAreaNumber").GetValue(rowData, null);
                        if (Convert.ToString(ob1) != "0")
                        {
                            object ob2 = rowData.GetType().GetProperty("FocusAreaName").GetValue(rowData, null);
                            str = string.Format("{0}-{1}", Convert.ToString(ob1), Convert.ToString(ob2));
                        }
                    }
                    if (fieldName == "KPIName" && PageName == "ExecutiveDashboard")
                    {
                        strDashboardFieldValue = Convert.ToString(rowData.GetType().GetProperty(fieldName).GetValue(rowData, null));
                    }

                    object objVal = rowData.GetType().GetProperty(fieldName).GetValue(rowData, null);

                    if (objVal != null)
                    {
                        if (PageName == "ExecutiveDashboard" && (strDashboardFieldValue == "Idea Dashboard" || strDashboardFieldValue == "Implementation Dashboard"))
                        {
                            //strDashboardFieldValue = Convert.ToString(objVal);
                            cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, Convert.ToString(objVal), isAlternateRow, (fieldName == "KPIName") ? 23 : 24);
                        }
                        else if (PageName == "ExecutiveDashboard")
                        {
                            //strDashboardFieldValue = Convert.ToString(objVal);
                            cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, Convert.ToString(objVal), isAlternateRow, (fieldName == "KPIName") ? 25 : 26);
                        }
                        else if (PageName == "IdeaDashboard")
                        {
                            //strDashboardFieldValue = Convert.ToString(objVal);
                            cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, Convert.ToString(objVal), isAlternateRow, (fieldName == "KPIName") ? styleIndex : 29);
                        }
                        else if (objVal is string)
                        {
                            cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, (fieldName == "FocusAreaID") ? str : Convert.ToString(objVal), isAlternateRow, styleIndex);
                        }
                        else if (objVal is bool)
                        {
                            cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, (bool)objVal ? "Yes" : "No", isAlternateRow, styleIndex);
                        }
                        else if (objVal is DateTime)
                        {
                            cell = new IrDateCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, string.Format("{0:MM/dd/yyyy}", objVal), isAlternateRow, styleIndex);//((DateTime)objVal).ToOADate().ToString()
                            //cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, string.Format("{0:MM/dd/yyyy}", objVal), isAlternateRow, styleIndex);
                        }
                        else if (objVal is decimal || objVal is double)
                        {
                            cell = new IrNumberCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, Convert.ToString(objVal), isAlternateRow, styleIndex);
                        }
                        else
                        {
                            long value;
                            if (long.TryParse(objVal.ToString(), out value))
                            {
                                cell = new IrIntegerCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, Convert.ToString(objVal), isAlternateRow, styleIndex);
                            }
                            else
                            {
                                cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex, Convert.ToString(objVal), isAlternateRow, styleIndex);
                            }
                        }

                    }
                    else
                    {
                        cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex,
                                (fieldName == "FocusAreaID") ? str : Convert.ToString(objVal), isAlternateRow,
                                styleIndex);
                    }
                    row.Append(cell);

                }

                sheetData.Append(row);
            }

            //>>donot change the order of appended part, will produce error of repairing
            worksheet.Append(sheetViews);
            worksheet.Append(sheetFormatPr);
            worksheet.Append(sheetData);
            worksheet.Append(pageMargins);
            worksheetPart.Worksheet = worksheet;
            //>>donot change the order of appended part, will produce error of repairing

            //>> Merger cell B1 to NoOfColumns
            MergeCells mergeCells;
            if (worksheet.Elements<MergeCells>().Any()) mergeCells = worksheet.Elements<MergeCells>().First();
            else
            {
                mergeCells = new MergeCells();

                // Insert a MergeCells object into the specified position.
                if (worksheet.Elements<CustomSheetView>().Any()) worksheet.InsertAfter(mergeCells, worksheet.Elements<CustomSheetView>().First());
                else worksheet.InsertAfter(mergeCells, worksheet.Elements<SheetData>().First());
            }

            // Create the merged cell and append it to the MergeCells collection.
            MergeCell mergeCell = new MergeCell() { Reference = new StringValue(string.Format("A1:{0}", ColumnCaption.Instance.Get(0, headerNames.Count - 1))) };
            mergeCells.Append(mergeCell);
            //>> Merger cell B1 to NoOfColumns

            //>>Below code set column width(maxWidth 200)
            const int maxWidth = 100;
            int numCols = headerNames.Count;
            for (int col = 0; col < numCols; col++)
            {
                int width = headerNames[col].Length + 2;
                foreach (T obj in listData)
                {
                    PropertyInfo myf = obj.GetType().GetProperty(fieldsToBeExported[col]);
                    if (myf != null) width = Math.Max(width, Convert.ToString(myf.GetValue(obj, null)).Length + 1);
                    if (width >= maxWidth) break;
                }
                if (PageName == "ExecutiveDashboard")
                {
                    SetColumnWidth(worksheetPart.Worksheet, (UInt32)col + 1, Math.Min(width + 10, maxWidth));
                }
                else
                {
                    SetColumnWidth(worksheetPart.Worksheet, (UInt32)col + 1, Math.Min(width, maxWidth));
                }
            }

        }
        #endregion

        #region Export Employee Tax Saving

        public string ExportToExcel(string fileName, DataSet dsData, string sheetHeader)
        {
            using (SpreadsheetDocument excelDoc = SpreadsheetDocument.Create(fileName, DocumentFormat.OpenXml.SpreadsheetDocumentType.Workbook))
            {
                CreateExcelParts(excelDoc, dsData, sheetHeader);
            }
            return fileName;
        }
        private void CreateExcelParts(SpreadsheetDocument spreadsheetDoc, DataSet dsData, string sheetHeader)
        {
            WorkbookPart workbookPart = spreadsheetDoc.AddWorkbookPart();

            int workBookPartCount = 100;
            WorkbookStylesPart workbookStylesPart =
                workbookPart.AddNewPart<WorkbookStylesPart>("rId" + (workBookPartCount++).ToString());
            CreateWorkbookStylesPart(workbookStylesPart);

            WorksheetPart worksheetPart;
            List<string> lstSheetName = new List<string>();

            int sharedStringTablePartCount = 1;

            if (dsData.Tables.Count > 0)
            {
                lstSheetName.Add("Tax Saving");
                sharedStringTablePartCount = sharedStringTablePartCount + 1;

                worksheetPart = workbookPart.AddNewPart<WorksheetPart>("rId1");
                CreateWorksheetPart(worksheetPart, dsData, sheetHeader);
            }

            GeneratePartContent(workbookPart, lstSheetName);
            SharedStringTablePart sharedStringTablePart =
                workbookPart.AddNewPart<SharedStringTablePart>("rId" + (workBookPartCount++).ToString());
            for (int i = 1; i < sharedStringTablePartCount; i++)
            {
                CreateSharedStringTablePart(sharedStringTablePart, dsData);
            }
            workbookPart.Workbook.Save();
        }
        public void GeneratePartContent(WorkbookPart part, List<string> sheetNameList)
        {
            Workbook workbook1 = new Workbook();
            workbook1.AddNamespaceDeclaration("r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships");
            FileVersion fileVersion1 = new FileVersion() { ApplicationName = "xl", LastEdited = "7", LowestEdited = "6", BuildVersion = "9302" };
            WorkbookProperties workbookProperties1 = new WorkbookProperties() { FilterPrivacy = true, DefaultThemeVersion = (UInt32Value)124226U };

            BookViews bookViews1 = new BookViews();
            WorkbookView workbookView1 = new WorkbookView() { XWindow = 240, YWindow = 105, WindowWidth = (UInt32Value)14805U, WindowHeight = (UInt32Value)8010U, ActiveTab = (UInt32Value)0U };

            bookViews1.Append(workbookView1);

            Sheets sheets1 = new Sheets();
            Sheet sheet1;

            for (int i = 1; i < sheetNameList.Count + 1; i++)
            {
                uint sheetId = Convert.ToUInt32(i);
                sheet1 = new Sheet() { Name = sheetNameList[i - 1], SheetId = sheetId, Id = "rId" + i.ToString() };
                sheets1.Append(sheet1);
            }

            CalculationProperties calculationProperties1 = new CalculationProperties() { CalculationId = (UInt32Value)122211U };

            workbook1.Append(fileVersion1);
            workbook1.Append(workbookProperties1);
            workbook1.Append(bookViews1);
            workbook1.Append(sheets1);
            workbook1.Append(calculationProperties1);

            part.Workbook = workbook1;
        }
        public void CreateSharedStringTablePart(SharedStringTablePart sharedStringTablePart, DataSet dsData)
        {
            UInt32Value stringCount = Convert.ToUInt32(dsData.Tables[0].Rows.Count) + Convert.ToUInt32(dsData.Tables[0].Columns.Count);
            SharedStringTable sharedStringTable = new SharedStringTable() { Count = stringCount, UniqueCount = stringCount };

            foreach (DataTable dt in dsData.Tables)
            {
                foreach (DataColumn headerName in dt.Columns)
                {
                    SharedStringItem sharedStringItem = new SharedStringItem();
                    Text text = new Text();
                    text.Text = Convert.ToString(headerName);
                    sharedStringItem.Append(text);
                    sharedStringTable.Append(sharedStringItem);
                }
            }
            sharedStringTablePart.SharedStringTable = sharedStringTable;
        }
        public void CreateWorksheetPart(WorksheetPart worksheetPart, DataSet dsData, string sheetHeader)
        {
            Worksheet worksheet = new Worksheet()
            {
                MCAttributes = new MarkupCompatibilityAttributes() { Ignorable = "x14ac" }
            };
            worksheet.AddNamespaceDeclaration("r", "http://schemas.openxmlformats.org/officeDocument/2006/relationships");
            worksheet.AddNamespaceDeclaration("mc", "http://schemas.openxmlformats.org/markup-compatibility/2006");
            worksheet.AddNamespaceDeclaration("x14ac", "http://schemas.microsoft.com/office/spreadsheetml/2009/9/ac");

            SheetViews sheetViews = new SheetViews();
            SheetView sheetView = new SheetView() { WorkbookViewId = (UInt32Value)0U };
            Selection selection = new Selection() { ActiveCell = "A1" };
            sheetView.Append(selection);
            sheetViews.Append(sheetView);

            PageMargins pageMargins = new PageMargins()
            {
                Left = 0.7D,
                Right = 0.7D,
                Top = 0.75D,
                Bottom = 0.75D,
                Header = 0.3D,
                Footer = 0.3D
            };
            SheetFormatProperties sheetFormatPr = new SheetFormatProperties()
            {
                DefaultRowHeight = 15D,
                DyDescent = 0.25D
            };

            SheetData sheetData = new SheetData();

            UInt32Value rowIndex = 1U;
            Row row;
            Cell cell;

            string[] arrColumns = { "Col1", "Col2" };

            if (!string.IsNullOrWhiteSpace(sheetHeader))
            {
                row = new Row()
                {
                    RowIndex = rowIndex++,
                    Spans = new ListValue<StringValue>() { InnerText = "1:3" },
                    DyDescent = 0.25D
                };
                cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), 0, sheetHeader, false, 41);
                //  cell.StyleIndex = 12;
                row.Append(cell);

                sheetData.Append(row);
            }

            int count = 0;

            string[] strMergeCells = new string[dsData.Tables.Count];

            row = new Row()
            {
                RowIndex = rowIndex++,
                Spans = new ListValue<StringValue>() { InnerText = "1:3" },
                DyDescent = 0.25D
            };
            //row.CloneNode(true);
            for (int columnIndex = 0; columnIndex < dsData.Tables[0].Columns.Count; columnIndex++)
            {
                cell = new IrDateCell((Convert.ToInt32((UInt32)rowIndex) - 2), columnIndex,
                    Convert.ToString(dsData.Tables[0].Columns[columnIndex]).FormatCode(), false, 43);
                row.Append(cell);
            }
            sheetData.Append(row);

            foreach (DataTable dt in dsData.Tables)
            {
                //rowIndex++;

                row = new Row()
                {
                    RowIndex = rowIndex++,
                    Spans = new ListValue<StringValue>() { InnerText = "1:3" },
                    DyDescent = 0.25D
                };
                // row.CloneNode(true);
                cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), 0, Convert.ToString(dsData.Tables[count].TableName), false, 42);
                //cell.StyleIndex = 30;
                row.Append(cell);
                sheetData.Append(row);
                strMergeCells[count] = "A" + (rowIndex - 1) + ":" + "H" + (rowIndex - 1);
                count++;

                for (int rIndex = 0; rIndex < dt.Rows.Count; rIndex++)
                {
                    row = new Row()
                    {
                        RowIndex = rowIndex++,
                        Spans = new ListValue<StringValue>() { InnerText = "1:3" },
                        DyDescent = 0.25D
                    };
                    bool isAlternateRow = (rIndex % 2 == 0);
                    var rowData = dt.Rows[rIndex];
                    int styleIndex = 44;

                    for (int cIndex = 0; cIndex < dt.Columns.Count; cIndex++)
                    {
                        string fieldName = Convert.ToString(dt.Columns[cIndex]);

                        object objVal = rowData[fieldName];

                        if (objVal != null)
                        {
                            if (objVal is string)
                            {
                                cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex,
                                    Convert.ToString(objVal), isAlternateRow, styleIndex);
                            }
                            else if (objVal is bool)
                            {
                                cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex,
                                    (bool)objVal ? "Yes" : "No", isAlternateRow, styleIndex);
                            }
                            else if (objVal is DateTime)
                            {
                                cell = new IrDateCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex,
                                    string.Format("{0:MM/dd/yyyy}", objVal), isAlternateRow,
                                    styleIndex);
                            }
                            else if (objVal is decimal || objVal is double)
                            {
                                cell = new IrNumberCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex,
                                    Convert.ToString(objVal), isAlternateRow, 45);
                            }
                            else
                            {
                                long value;
                                if (long.TryParse(objVal.ToString(), out value))
                                {
                                    cell = new IrIntegerCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex,
                                        Convert.ToString(objVal), isAlternateRow, styleIndex);
                                }
                                else
                                {
                                    cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex,
                                        Convert.ToString(objVal), isAlternateRow, styleIndex);
                                }
                            }
                        }
                        else
                        {
                            cell = new IrTextCell((Convert.ToInt32((UInt32)rowIndex) - 2), cIndex,
                                                  Convert.ToString(objVal), isAlternateRow, styleIndex);
                        }
                        row.Append(cell);

                    }

                    sheetData.Append(row);
                }
            }

            //>>donot change the order of appended part, will produce error of repairing
            worksheet.Append(sheetViews);
            worksheet.Append(sheetFormatPr);
            worksheet.Append(sheetData);
            worksheet.Append(pageMargins);
            worksheetPart.Worksheet = worksheet;
            //>>donot change the order of appended part, will produce error of repairing


            //>> Merger cell B1 to NoOfColumns
            MergeCells mergeCells;
            if (worksheet.Elements<MergeCells>().Any()) mergeCells = worksheet.Elements<MergeCells>().First();
            else
            {
                mergeCells = new MergeCells();

                // Insert a MergeCells object into the specified position.
                if (worksheet.Elements<CustomSheetView>().Any())
                    worksheet.InsertAfter(mergeCells, worksheet.Elements<CustomSheetView>().First());
                else worksheet.InsertAfter(mergeCells, worksheet.Elements<SheetData>().First());
            }

            // Create the merged cell and append it to the MergeCells collection.
            MergeCell mergeCell = new MergeCell()
            {
                Reference =
                        new StringValue(string.Format("A1:{0}",
                                                      ColumnCaption.Instance.Get(0, dsData.Tables[0].Columns.Count - 1)))
            };
            mergeCells.Append(mergeCell);
            //>> Merger cell B1 to NoOfColumns

            //Merge cell Table Header Proforma Report
            for (int i = 0; i < strMergeCells.Length; i++)
            {
                mergeCell = new MergeCell() { Reference = new StringValue(strMergeCells[i]) };
                mergeCells.Append(mergeCell);
            }

            //>>Below code set column width(maxWidth 200)
            const int maxWidth = 100;
            int numCols = 0;

            foreach (DataColumn dataColumn in dsData.Tables[0].Columns)
            {
                int width = Convert.ToString(dataColumn) == "Col1"
                                ? Convert.ToString(dataColumn).Length + 20
                                : Convert.ToString(dataColumn).Length + 3;

                foreach (DataRow dataRow in dsData.Tables[0].Rows)
                {
                    width = Math.Max(width, Convert.ToString(dataRow[numCols]).Length);
                    if (width >= maxWidth) break;
                }
                SetColumnWidth(worksheetPart.Worksheet, (UInt32)numCols + 1, Math.Min(width, maxWidth));
                numCols++;
            }
        }
      
        #endregion
    }

    public static class Extensions
    {
        public static string FormatCode(this string sourceString)
        {
            if (sourceString.Contains("<"))
                sourceString = sourceString.Replace("<", "&lt;");

            if (sourceString.Contains(">"))
                sourceString = sourceString.Replace(">", "&gt;");

            return sourceString;
        }
    }

}

