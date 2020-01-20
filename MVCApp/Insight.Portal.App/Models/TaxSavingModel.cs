using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Insight.Portal.App.Models
{
    public class TaxSavingModel
    {

        public Guid TaxSavingId { get; set; }
        public Guid EmployeeId { get; set; }
        public string FullName { get; set; }
        public int FinancialYear { get; set; }
        public int TaxSavingType { get; set; }
        public string TaxSavingTypeName { get; set; }
        public int RecurringFrequency { get; set; }
        public string SavingDate { get; set; }
        public string AccountNumber { get; set; }
        public decimal? Amount { get; set; }
        public decimal? TotalAmount { get; set; }
        public string Remarks { get; set; }
        public bool? ReceiptSubmitted { get; set; }
        public int EligibleCount { get; set; }
    }
}