using responsibleTickets.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace responsibleTickets.Domain.Interfaces
{
    public interface IExpenseRepository
    {
        Task<IEnumerable<Expense>> GetExpensesAsync();
        Task<Expense> GetExpenseAsync(Guid id);
        Task AddExpenseAsync(Expense expense);
        Task UpdateExpenseAsync(Expense expense);
        Task DeleteExpenseAsync(Guid id);
    }
}
