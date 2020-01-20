IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[spCopyTaxSavingData]'))
BEGIN
    DROP PROCEDURE [dbo].[spCopyTaxSavingData]
END;
GO
--========================================================
-- Author:		Avadhesh kumar
-- Create date: 9 July 2019
-- Description: Copy Tax Saving
-- ========================================================  
CREATE PROCEDURE [spCopyTaxSavingData]
    @EmployeeId AS UNIQUEIDENTIFIER = NULL, 
	@FinancialPriviousYear INT = NULL
AS
BEGIN

    INSERT INTO [dbo].[TaxSaving]
    (
        TaxSavingId,
        EmployeeId,
        FinancialYear,
        TaxSavingType,
        RecurringFrequency,
        SavingDate,
        AccountNumber,
        Amount,
        ReceiptSubmitted,
        Remarks,
        EligibleCount
    )
    SELECT NEWID() AS TaxSavingId, EmployeeId, (FinancialYear + 1) AS FinancialYear, TaxSavingType, RecurringFrequency, SavingDate, AccountNumber, Amount,
           ReceiptSubmitted, Remarks, EligibleCount
    FROM [dbo].[TaxSaving]
    WHERE EmployeeId = @EmployeeId AND FinancialYear = @FinancialPriviousYear;
END;

