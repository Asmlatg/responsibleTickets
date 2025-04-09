using System;

namespace responsibleTickets.Application.DTOs
{
    public class ExpenseDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public decimal Amount { get; set; }
        public string Category { get; set; }
        public DateTime Date { get; set; }
    }
}
