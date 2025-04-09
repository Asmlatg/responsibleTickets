using responsibleTickets.Application.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace responsibleTickets.Application.Interfaces
{
    public interface IExpenseService
    {
        Task<IEnumerable<ExpenseDto>> GetExpensesAsync();
        Task<ExpenseDto> GetExpenseByIdAsync(Guid id);
        Task AddExpenseAsync(ExpenseDto expenseDto);
        Task UpdateExpenseAsync(ExpenseDto expenseDto);
        Task DeleteExpenseAsync(Guid id);
    }
}

