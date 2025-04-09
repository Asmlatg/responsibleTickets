using responsibleTickets.Application.DTOs;
using responsibleTickets.Application.Interfaces;
using responsibleTickets.Domain.Entities;
using responsibleTickets.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace responsibleTickets.Application.Services
{
    public class ExpenseService : IExpenseService
    {
        private readonly IExpenseRepository _expenseRepository;

        public ExpenseService(IExpenseRepository expenseRepository)
        {
            _expenseRepository = expenseRepository;
        }

        public async Task<IEnumerable<ExpenseDto>> GetExpensesAsync()
        {
            var expenses = await _expenseRepository.GetExpensesAsync();
            return expenses.Select(e => new ExpenseDto
            {
                Id = e.Id,
                Title = e.Title,
                Amount = e.Amount,
                Category = e.Category,
                Date = e.Date
            });
        }

        public async Task<ExpenseDto> GetExpenseByIdAsync(Guid id)
        {
            var expense = await _expenseRepository.GetExpenseAsync(id);
            return expense == null ? null : new ExpenseDto
            {
                Id = expense.Id,
                Title = expense.Title,
                Amount = expense.Amount,
                Category = expense.Category,
                Date = expense.Date
            };
        }

        public async Task AddExpenseAsync(ExpenseDto expenseDto)
        {
            var expense = new Expense
            {
                Id = Guid.NewGuid(),
                Title = expenseDto.Title,
                Amount = expenseDto.Amount,
                Category = expenseDto.Category,
                Date = expenseDto.Date
            };
            await _expenseRepository.AddExpenseAsync(expense);
        }

        public async Task UpdateExpenseAsync(ExpenseDto expenseDto)
        {
            var expense = new Expense
            {
                Id = expenseDto.Id,
                Title = expenseDto.Title,
                Amount = expenseDto.Amount,
                Category = expenseDto.Category,
                Date = expenseDto.Date
            };
            await _expenseRepository.UpdateExpenseAsync(expense);
        }

        public async Task DeleteExpenseAsync(Guid id)
        {
            await _expenseRepository.DeleteExpenseAsync(id);
        }
    }
}
