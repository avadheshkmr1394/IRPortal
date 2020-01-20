using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Spreadsheet;

namespace Insight.Portal.App.Utils.Excel
{
    public class CustomStylesheet : Stylesheet
    {
        public CustomStylesheet()
        {
            #region Fonts
            var fonts = new Fonts();
            var color = new Color();
            //Font Index 0
            var font = new DocumentFormat.OpenXml.Spreadsheet.Font();
            var fontName = new FontName { Val = StringValue.FromString("Arial") };
            var fontSize = new FontSize { Val = DoubleValue.FromDouble(9) };
            font.FontName = fontName;
            font.FontSize = fontSize;
            fonts.Append(font);

            //Font Index 1
            font = new DocumentFormat.OpenXml.Spreadsheet.Font();
            fontName = new FontName { Val = StringValue.FromString("Arial") };
            fontSize = new FontSize { Val = DoubleValue.FromDouble(10) };
            font.FontName = fontName;
            font.FontSize = fontSize;
            font.Bold = new Bold();
            fonts.Append(font);

            //Font Index 2
            font = new DocumentFormat.OpenXml.Spreadsheet.Font();
            fontName = new FontName { Val = StringValue.FromString("Arial") };
            fontSize = new FontSize { Val = DoubleValue.FromDouble(15) };
            font.FontName = fontName;
            font.FontSize = fontSize;
            font.Bold = new Bold();
            fonts.Append(font);

            //Font Index 3 Posted
            font = new DocumentFormat.OpenXml.Spreadsheet.Font();
            fontName = new FontName { Val = StringValue.FromString("Arial") };
            fontSize = new FontSize { Val = DoubleValue.FromDouble(9) };
            font.FontName = fontName;
            font.FontSize = fontSize;
            color = new Color() { Rgb = new HexBinaryValue() { Value = "0000FF" } };
            font.Color = color;
            fonts.Append(font);

            //Font Index 4 InProgress
            font = new DocumentFormat.OpenXml.Spreadsheet.Font();
            fontName = new FontName { Val = StringValue.FromString("Arial") };
            fontSize = new FontSize { Val = DoubleValue.FromDouble(9) };
            font.FontName = fontName;
            font.FontSize = fontSize;
            color = new Color() { Rgb = new HexBinaryValue() { Value = "FF8B45" } };
            font.Color = color;
            fonts.Append(font);

            //Font Index 5 Submitted/resubmitted
            font = new DocumentFormat.OpenXml.Spreadsheet.Font();
            fontName = new FontName { Val = StringValue.FromString("Arial") };
            fontSize = new FontSize { Val = DoubleValue.FromDouble(9) };
            font.FontName = fontName;
            font.FontSize = fontSize;
            color = new Color() { Rgb = new HexBinaryValue() { Value = "FF0000" } };
            font.Color = color;
            fonts.Append(font);

            //Font Index 6 Accepted
            font = new DocumentFormat.OpenXml.Spreadsheet.Font();
            fontName = new FontName { Val = StringValue.FromString("Arial") };
            fontSize = new FontSize { Val = DoubleValue.FromDouble(9) };
            font.FontName = fontName;
            font.FontSize = fontSize;
            color = new Color() { Rgb = new HexBinaryValue() { Value = "2C6100" } };
            font.Color = color;
            fonts.Append(font);

            //Font Index 7 Dashboard
            font = new DocumentFormat.OpenXml.Spreadsheet.Font();
            fontName = new FontName { Val = StringValue.FromString("Calibri") };
            fontSize = new FontSize { Val = DoubleValue.FromDouble(15) };
            font.FontName = fontName;
            font.FontSize = fontSize;
            fonts.Append(font);

            //Font Index 8
            font = new DocumentFormat.OpenXml.Spreadsheet.Font();
            fontName = new FontName { Val = StringValue.FromString("Calibri") };
            fontSize = new FontSize { Val = DoubleValue.FromDouble(9) };
            font.FontName = fontName;
            font.FontSize = fontSize;
            fonts.Append(font);

            //Font Index 9 Header
            font = new DocumentFormat.OpenXml.Spreadsheet.Font();
            fontName = new FontName { Val = StringValue.FromString("Calibri") };
            fontSize = new FontSize { Val = DoubleValue.FromDouble(18) };
            color = new Color() { Rgb = new HexBinaryValue() { Value = "FFFFFF" } };
            font.Color = color;
            font.Bold = new Bold();
            font.FontName = fontName;
            font.FontSize = fontSize;
            fonts.Append(font);

            //Font Index 10 Body Bold
            font = new DocumentFormat.OpenXml.Spreadsheet.Font();
            fontName = new FontName { Val = StringValue.FromString("Calibri") };
            fontSize = new FontSize { Val = DoubleValue.FromDouble(11) };
            font.Bold = new Bold();
            font.FontName = fontName;
            font.FontSize = fontSize;
            fonts.Append(font);

            //Font Index 11 Body Normal
            font = new DocumentFormat.OpenXml.Spreadsheet.Font();
            fontName = new FontName { Val = StringValue.FromString("Calibri") };
            fontSize = new FontSize { Val = DoubleValue.FromDouble(11) };
            font.FontName = fontName;
            font.FontSize = fontSize;
            fonts.Append(font);

            fonts.Count = UInt32Value.FromUInt32((uint)fonts.ChildElements.Count);
            #endregion

            #region Fills
            var fills = new Fills();

            //Fill index  0
            var fill = new Fill();
            var patternFill = new PatternFill { PatternType = PatternValues.None };
            fill.PatternFill = patternFill;
            fills.Append(fill);

            //Fill index  1
            fill = new Fill();
            patternFill = new PatternFill { PatternType = PatternValues.Gray125 };
            fill.PatternFill = patternFill;
            fills.Append(fill);

            //Fill index  2
            fill = new Fill();
            patternFill = new PatternFill { PatternType = PatternValues.Solid, ForegroundColor = new ForegroundColor() };
            patternFill.ForegroundColor = TranslateForeground(System.Drawing.Color.LightBlue);
            patternFill.BackgroundColor = new BackgroundColor { Rgb = patternFill.ForegroundColor.Rgb };
            fill.PatternFill = patternFill;
            fills.Append(fill);

            //Fill index  3
            fill = new Fill();
            patternFill = new PatternFill { PatternType = PatternValues.Solid, ForegroundColor = new ForegroundColor() };
            patternFill.ForegroundColor = TranslateForeground(System.Drawing.Color.FromArgb(211, 211, 211));
            patternFill.BackgroundColor = new BackgroundColor { Rgb = patternFill.ForegroundColor.Rgb };
            fill.PatternFill = patternFill;
            fills.Append(fill);

            //Fill index  4
            fill = new Fill();
            patternFill = new PatternFill { PatternType = PatternValues.Solid, ForegroundColor = new ForegroundColor() };
            patternFill.ForegroundColor = TranslateForeground(System.Drawing.Color.FromArgb(211, 211, 211));
            patternFill.BackgroundColor = new BackgroundColor() { Rgb = patternFill.ForegroundColor.Rgb };
            fill.PatternFill = patternFill;
            fills.Append(fill);

            //Fill index  5
            fill = new Fill();
            patternFill = new PatternFill { PatternType = PatternValues.Solid, ForegroundColor = new ForegroundColor() };
            patternFill.ForegroundColor = TranslateForeground(System.Drawing.Color.FromArgb(245, 245, 245));
            patternFill.BackgroundColor = new BackgroundColor { Rgb = patternFill.ForegroundColor.Rgb };
            fill.PatternFill = patternFill;
            fills.Append(fill);

            //Fill index  6 ForeGround Header Blue
            fill = new Fill();
            patternFill = new PatternFill { PatternType = PatternValues.Solid, ForegroundColor = new ForegroundColor() };
            patternFill.ForegroundColor = TranslateForeground(System.Drawing.Color.FromArgb(0, 176, 240));
            patternFill.BackgroundColor = new BackgroundColor { Rgb = patternFill.ForegroundColor.Rgb };
            
            fill.PatternFill = patternFill;
            fills.Append(fill);

            //Fill index  7 ForeGround Header green
            fill = new Fill();
            patternFill = new PatternFill { PatternType = PatternValues.Solid, ForegroundColor = new ForegroundColor() };
            patternFill.ForegroundColor = TranslateForeground(System.Drawing.Color.FromArgb(146, 208, 80));
            patternFill.BackgroundColor = new BackgroundColor { Rgb = patternFill.ForegroundColor.Rgb };
            fill.PatternFill = patternFill;
            fills.Append(fill);

            fills.Count = UInt32Value.FromUInt32((uint)fills.ChildElements.Count);
            #endregion

            #region Borders
            var borders = new Borders();
            //All Boarder Index 0
            var border = new Border
            {
                LeftBorder = new LeftBorder { Style = BorderStyleValues.Thin, Color = new Color() { Indexed = (UInt32Value)64U } },
                RightBorder = new RightBorder { Style = BorderStyleValues.Thin, Color = new Color() { Indexed = (UInt32Value)64U } },
                TopBorder = new TopBorder { Style = BorderStyleValues.Thin, Color = new Color() { Indexed = (UInt32Value)64U } },
                BottomBorder = new BottomBorder { Style = BorderStyleValues.Thin, Color = new Color() { Indexed = (UInt32Value)64U } },
                DiagonalBorder = new DiagonalBorder()
            };
            borders.Append(border);

            //All Boarder Index 1
            border = new Border
            {
                LeftBorder = new LeftBorder { Style = BorderStyleValues.Thin, Color = new Color() { Indexed = (UInt32Value)64U } },
                RightBorder = new RightBorder { Style = BorderStyleValues.Thin, Color = new Color() { Indexed = (UInt32Value)64U } },
                TopBorder = new TopBorder { Style = BorderStyleValues.Thin, Color = new Color() { Indexed = (UInt32Value)64U } },
                BottomBorder = new BottomBorder { Style = BorderStyleValues.Thin, Color = new Color() { Indexed = (UInt32Value)64U } },
                DiagonalBorder = new DiagonalBorder()
            };
            borders.Append(border);
            //All Boarder Index 2
            border = new Border
            {
                LeftBorder = new LeftBorder { Style = BorderStyleValues.Thin, Color = new Color() { Indexed = (UInt32Value)64U } },
                RightBorder = new RightBorder { Style = BorderStyleValues.Thin, Color = new Color() { Indexed = (UInt32Value)64U } },
                TopBorder = new TopBorder { Style = BorderStyleValues.Thin, Color = new Color() { Indexed = (UInt32Value)64U } },
                BottomBorder = new BottomBorder { Style = BorderStyleValues.Thin, Color = new Color() { Indexed = (UInt32Value)64U } },
                DiagonalBorder = new DiagonalBorder()
            };
            borders.Append(border);
            borders.Count = UInt32Value.FromUInt32((uint)borders.ChildElements.Count);
            #endregion

            #region CellStyleFormats
            var cellStyleFormats = new CellStyleFormats();

            var cellFormat = new CellFormat { NumberFormatId = 0, FontId = 0, FillId = 0, BorderId = 1 };
            cellStyleFormats.Append(cellFormat);

            cellFormat = new CellFormat { NumberFormatId = 0, FontId = 2, FillId = 4, BorderId = 1 };
            cellStyleFormats.Append(cellFormat);

            cellStyleFormats.Count = UInt32Value.FromUInt32((uint)cellStyleFormats.ChildElements.Count);
            uint iExcelIndex = 164;

            #endregion

            #region NumberFormats
            var numberingFormats = new NumberingFormats();

            var nformatDateTime = new NumberingFormat
            {
                NumberFormatId = UInt32Value.FromUInt32(iExcelIndex++),
                FormatCode = StringValue.FromString("dd/mm/yyyy hh:mm:ss")
            };
            numberingFormats.Append(nformatDateTime);
            var nformat4Decimal = new NumberingFormat
            {
                NumberFormatId = UInt32Value.FromUInt32(iExcelIndex++),
                FormatCode = StringValue.FromString("#,##0.0000")
            };
            numberingFormats.Append(nformat4Decimal);
            var nformat2Decimal = new NumberingFormat
            {
                NumberFormatId = UInt32Value.FromUInt32(iExcelIndex++),
                FormatCode = StringValue.FromString("#,##0.00")
            };
            numberingFormats.Append(nformat2Decimal);
            var nformatForcedText = new NumberingFormat
            {
                NumberFormatId = UInt32Value.FromUInt32(iExcelIndex),
                FormatCode = StringValue.FromString("@")
            };
            numberingFormats.Append(nformatForcedText);
            #endregion

            #region CellFormats
            var cellFormats = new CellFormats();

            // index 0
            cellFormat = new CellFormat
            {
                NumberFormatId = 0,
                FontId = 0,
                FillId = 0,
                FormatId = 0
            };
            cellFormats.Append(cellFormat);

            // index 1
            // Cell Standard Date format 
            cellFormat = new CellFormat
            {
                NumberFormatId = 14,
                FontId = 0,
                FillId = 0,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormat.AppendChild(new Alignment { Vertical = VerticalAlignmentValues.Top });
            cellFormats.Append(cellFormat);
            // Index 2
            // Cell Standard Number format with 2 decimal placing
            cellFormat = new CellFormat
            {
                NumberFormatId = 4,
                FontId = 0,
                FillId = 0,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormat.AppendChild(new Alignment { Vertical = VerticalAlignmentValues.Top });
            cellFormats.Append(cellFormat);
            // Index 3
            // Cell Date time custom format
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatDateTime.NumberFormatId,
                FontId = 0,
                FillId = 0,
                BorderId = 0,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormats.Append(cellFormat);
            // Index 4
            // Cell 4 decimal custom format
            cellFormat = new CellFormat
            {
                NumberFormatId = nformat4Decimal.NumberFormatId,
                FontId = 0,
                FillId = 0,
                BorderId = 0,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormats.Append(cellFormat);
            // Index 5
            // Cell 2 decimal custom format
            cellFormat = new CellFormat
            {
                NumberFormatId = nformat2Decimal.NumberFormatId,
                FontId = 0,
                FillId = 0,
                BorderId = 0,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormats.Append(cellFormat);
            // Index 6
            // Cell forced number text custom format
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 0,
                FillId = 0,
                BorderId = 0,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormats.Append(cellFormat);
            // Index 7
            // Cell text with font 12 
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 1,
                FillId = 0,
                BorderId = 0,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormats.Append(cellFormat);
            // Index 8
            // Cell text
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 0,
                FillId = 0,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormats.Append(cellFormat);
            // Index 9
            // Coloured 2 decimal cell text
            cellFormat = new CellFormat
            {
                NumberFormatId = nformat2Decimal.NumberFormatId,
                FontId = 0,
                FillId = 2,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormats.Append(cellFormat);
            // Index 10
            // Coloured cell text
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 0,
                FillId = 2,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormats.Append(cellFormat);
            // Index 11
            // Coloured cell text
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 1,
                FillId = 3,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormats.Append(cellFormat);

            // index 12 for insight header
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 2,
                FillId = 4,
                //BorderId = 1,
                FormatId = 1,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormats.Append(cellFormat);

            // index 13
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 0,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormat.AppendChild(new Alignment { Vertical = VerticalAlignmentValues.Top });
            cellFormats.Append(cellFormat);

            // index 14 alternate for index 1
            // Cell Standard Date format 
            cellFormat = new CellFormat
            {
                NumberFormatId = 14,
                FontId = 0,
                FillId = 5,
                BorderId = 0,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormat.AppendChild(new Alignment { Vertical = VerticalAlignmentValues.Top });
            cellFormats.Append(cellFormat);
            // Index 15  alternate for index 2
            // Cell Standard Number format with 2 decimal placing
            cellFormat = new CellFormat
            {
                NumberFormatId = 4,
                FontId = 0,
                FillId = 5,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormat.AppendChild(new Alignment { Vertical = VerticalAlignmentValues.Top });
            cellFormats.Append(cellFormat);
            // index 16  alternate for index 13
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 0,
                FillId = 5,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormat.AppendChild(new Alignment { Vertical = VerticalAlignmentValues.Top });
            cellFormats.Append(cellFormat);
            // Index 17
            // Integer Cell format
            cellFormat = new CellFormat
            {
                FontId = 0,
                FillId = 0,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormat.AppendChild(new Alignment { Vertical = VerticalAlignmentValues.Top });
            cellFormats.Append(cellFormat);
            // Index 18
            // Integer Cell format alternate
            cellFormat = new CellFormat
            {
                FontId = 0,
                FillId = 5,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormat.AppendChild(new Alignment { Vertical = VerticalAlignmentValues.Top });
            cellFormats.Append(cellFormat);

            /*Style index for ITAreaList */
            // index 19  In-Progress
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 4,
                FillId = 0,//6
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormats.Append(cellFormat);

            // index 20  Submitted
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 5,
                FillId = 0,//7
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormats.Append(cellFormat);

            // index 21  Posted
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 3,
                FillId = 0,//8
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormats.Append(cellFormat);

            // index 22  Accepted
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 6,
                FillId = 0,//9
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormats.Append(cellFormat);
            /*Style index for ITAreaList */

            /*Style index for Dashboard */
            // Index 23
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 7,
                FillId = 4,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormats.Append(cellFormat);

            // Index 24
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 8,
                FillId = 4,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormat.AppendChild(new Alignment { Horizontal = HorizontalAlignmentValues.Right });
            cellFormats.Append(cellFormat);
            //cellFormat.ApplyAlignment = new BooleanValue(true);

            // Index 25
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 7,
                FillId = 0,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormats.Append(cellFormat);

            // Index 26
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 7,
                FillId = 0,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true),

            };
            cellFormat.AppendChild(new Alignment { Horizontal = HorizontalAlignmentValues.Right });
            cellFormats.AppendChild(cellFormat);

            // index 27 for wrapText --AllComments
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 0,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormat.AppendChild(new Alignment { WrapText = true });
            cellFormats.AppendChild(cellFormat);

            // index 28 for Alternate Wrap --AllComments
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 0,
                FillId = 5,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormat.AppendChild(new Alignment { WrapText = true });
            cellFormats.AppendChild(cellFormat);
            //cellFormat.ApplyAlignment = new BooleanValue(true);

            // index 29 for Alternate Wrap --AllComments
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 0,
                FillId = 0,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true),

            };
            cellFormat.AppendChild(new Alignment { Horizontal = HorizontalAlignmentValues.Right });
            cellFormats.AppendChild(cellFormat);

            // Index 30
            // Coloured cell text without border
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 1,
                FillId = 3,
                BorderId = 0,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormats.Append(cellFormat);

            // Index 31
            // Coloured cell text without border right aligned
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 1,
                FillId = 3,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true),
                Alignment = new Alignment { Horizontal = HorizontalAlignmentValues.Right, Vertical = VerticalAlignmentValues.Top }
            };
            cellFormats.AppendChild(cellFormat);

            // index 32
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 0,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true),
                Alignment = new Alignment { Horizontal = HorizontalAlignmentValues.Right, Vertical = VerticalAlignmentValues.Top }
            };
            cellFormats.Append(cellFormat);

            // index 33  alternate for index 32
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 0,
                FillId = 5,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true),
                Alignment = new Alignment { Horizontal = HorizontalAlignmentValues.Right, Vertical = VerticalAlignmentValues.Top }
            };
            cellFormats.Append(cellFormat);

            // index 34  date format 17 = 'mmm-yy'
            cellFormat = new CellFormat
            {
                NumberFormatId = 17,
                FontId = 1,
                FillId = 3,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true),
                Alignment = new Alignment { Horizontal = HorizontalAlignmentValues.Right, Vertical = VerticalAlignmentValues.Top }
            };
            cellFormats.Append(cellFormat);

            // index 35
            // Cell Standard date format 17 = 'mmm-yy'
            cellFormat = new CellFormat
            {
                NumberFormatId = 17,
                FontId = 0,
                FillId = 0,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true),
                Alignment = new Alignment { Horizontal = HorizontalAlignmentValues.Right, Vertical = VerticalAlignmentValues.Top }
            };
            cellFormats.Append(cellFormat);

            // index 36 alternate for index 35
            // Cell Standard date format 17 = 'mmm-yy'
            cellFormat = new CellFormat
            {
                NumberFormatId = 17,
                FontId = 0,
                FillId = 5,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true),
                Alignment = new Alignment { Horizontal = HorizontalAlignmentValues.Right, Vertical = VerticalAlignmentValues.Top }
            };
            cellFormats.Append(cellFormat);

            // Index 37
            // Coloured cell text for Excel Header 
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 2,
                FillId = 3,
                BorderId = 0,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormats.Append(cellFormat);


            // Index 38
            // Bold text Cell - Left Align
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 1,
                FillId = 0,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true)
            };
            cellFormats.Append(cellFormat);

            // Index 39
            // Bold text Cell with background - Center Align
            cellFormat = new CellFormat
            {
                NumberFormatId = nformatForcedText.NumberFormatId,
                FontId = 1,
                FillId = 3,
                BorderId = 2,
                FormatId = 0,
                ApplyBorder = true,
                ApplyNumberFormat = BooleanValue.FromBoolean(true),
                Alignment = new Alignment { Horizontal = HorizontalAlignmentValues.Center }
            };
            cellFormats.Append(cellFormat);

            // Index 40
            // Bold text Cell - Right Align
            cellFormat = new CellFormat
            {
                NumberFormatId = 4,
                FontId = 1,
                FillId = 0,
                BorderId = 1,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true),
                Alignment = new Alignment { Horizontal = HorizontalAlignmentValues.Right }
            };
            cellFormats.Append(cellFormat);

            /* End Style index for Dashboard */

            // Fonts For Tax Savings
            // Index 41 For Header
            cellFormat = new CellFormat
            {
                NumberFormatId = 0,
                FontId = 9,
                FillId = 6,
                BorderId = 0,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true),
                Alignment = new Alignment { Horizontal = HorizontalAlignmentValues.Left }
            };
            cellFormats.Append(cellFormat);

            // Index 42 For Header
            cellFormat = new CellFormat
            {
                NumberFormatId = 0,
                FontId = 10,
                FillId = 7,
                BorderId = 0,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true),
                Alignment = new Alignment { Horizontal = HorizontalAlignmentValues.Left }
            };
            cellFormats.Append(cellFormat);

            // Index 43 For Body Header Bold
            cellFormat = new CellFormat
            {
                NumberFormatId = 0,
                FontId = 10,
                FillId = 0,
                BorderId = 0,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true),
                Alignment = new Alignment { Horizontal = HorizontalAlignmentValues.Center }
            };
            cellFormats.Append(cellFormat);

            // Index 44 For Body Header Normal
            cellFormat = new CellFormat
            {
                NumberFormatId = 0,
                FontId = 11,
                FillId = 0,
                BorderId = 0,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true),
                Alignment = new Alignment { Horizontal = HorizontalAlignmentValues.Left }
            };
            cellFormats.Append(cellFormat);

            // Index 45 For Body Cell Float
            cellFormat = new CellFormat
            {
                NumberFormatId = 4,
                FontId = 11,
                FillId = 0,
                BorderId = 0,
                FormatId = 0,
                ApplyNumberFormat = BooleanValue.FromBoolean(true),
                Alignment = new Alignment { Horizontal = HorizontalAlignmentValues.Right }
            };
            cellFormats.Append(cellFormat);

            numberingFormats.Count = UInt32Value.FromUInt32((uint)numberingFormats.ChildElements.Count);
            cellFormats.Count = UInt32Value.FromUInt32((uint)cellFormats.ChildElements.Count);
            #endregion

            this.Append(numberingFormats);
            this.Append(fonts);
            this.Append(fills);
            this.Append(borders);
            this.Append(cellStyleFormats);
            this.Append(cellFormats);

            var css = new CellStyles();
            var cs = new CellStyle
            {
                Name = StringValue.FromString("Normal"),
                FormatId = 0,
                BuiltinId = 0
            };
            css.Append(cs);
            css.Count = UInt32Value.FromUInt32((uint)css.ChildElements.Count);

            this.Append(css);

            var dfs = new DifferentialFormats { Count = 0 };
            this.Append(dfs);
            var tss = new TableStyles
            {
                Count = 0,
                DefaultTableStyle = StringValue.FromString("TableStyleMedium9"),
                DefaultPivotStyle = StringValue.FromString("PivotStyleLight16")
            };
            this.Append(tss);

        }
        private static ForegroundColor TranslateForeground(System.Drawing.Color fillColor)
        {
            return new ForegroundColor()
            {
                Rgb = new HexBinaryValue()
                {
                    Value =
                        System.Drawing.ColorTranslator.ToHtml(
                        System.Drawing.Color.FromArgb(
                            fillColor.A,
                            fillColor.R,
                            fillColor.G,
                            fillColor.B)).Replace("#", "")
                }
            };
        }
    }
}
    

