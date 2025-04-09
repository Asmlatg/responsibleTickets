using Microsoft.AspNetCore.Mvc;
using responsibleTickets.Application.DTOs;
using responsibleTickets.Application.Interfaces;

namespace ExpenseTracker.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExpensesController : ControllerBase
    {
        private readonly IExpenseService _expenseService;

        public ExpensesController(IExpenseService expenseService)
        {
            _expenseService = expenseService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ExpenseDto>>> GetExpenses()
        {
            var userId = GetUserIdFromToken();
            var expenses = await _expenseService.GetAllExpensesAsync(userId);
            return Ok(expenses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ExpenseDto>> GetExpense(Guid id)
        {
            var expense = await _expenseService.GetExpenseByIdAsync(id);
            if (expense == null)
            {
                return NotFound();
            }
            return Ok(expense);
        }

        [HttpPost]
        public async Task<ActionResult<ExpenseDto>> CreateExpense([FromForm] CreateExpenseDto createExpenseDto)
        {
            var userId = GetUserIdFromToken();
            var expense = await _expenseService.CreateExpenseAsync(userId, createExpenseDto);
            return CreatedAtAction(nameof(GetExpense), new { id = expense.Id }, expense);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateExpense(Guid id, [FromForm] UpdateExpenseDto updateExpenseDto)
        {
            if (id != updateExpenseDto.Id)
            {
                return BadRequest();
            }

            var userId = GetUserIdFromToken();
            await _expenseService.UpdateExpenseAsync(userId, updateExpenseDto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteExpense(Guid id)
        {
            await _expenseService.DeleteExpenseAsync(id);
            return NoContent();
        }

        [HttpPost("scan-receipt")]
        public async Task<ActionResult<ScanReceiptResultDto>> ScanReceipt([FromForm] ScanReceiptDto scanReceiptDto)
        {
            var scanResult = await _expenseService.ScanReceiptAsync(scanReceiptDto);
            return Ok(scanResult);
        }

        private Guid GetUserIdFromToken()
        {
            // In a real application, you would extract the user ID from the JWT token
            // For simplicity, we'll return a hardcoded ID
            return Guid.Parse("00000000-0000-0000-0000-000000000000");
        }
    }
}