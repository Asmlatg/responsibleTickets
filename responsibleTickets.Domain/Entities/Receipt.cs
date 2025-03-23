using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace responsibleTickets.Domain.Entities
{
    public class Receipt
    {
        public int Id { get; set; }
        public string ImagePath { get; set; }
        public string MerchantName { get; set; }
        public DateTime ReceiptDate { get; set; }
        public decimal TotalAmount { get; set; }
        public string RawText { get; set; }
        public DateTime UploadDate { get; set; }
        public ICollection<Expense> Expenses { get; set; }
    }
}
