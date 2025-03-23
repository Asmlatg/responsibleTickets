using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace responsibleTickets.Domain.Entities
{
    public class Expense
    {
        public int Id { get; set; }
        public decimal Amount { get; set; }
        public string Description { get; set; }
        public DateTime Date { get; set; }
        public int CategoryId { get; set; }
        public Category Category { get; set; }
        public int? ReceiptId { get; set; }
        public Receipt Receipt { get; set; }
        public string UserId { get; set; }
    }
}
