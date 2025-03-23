using responsibleTickets.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace responsibleTickets.Domain.Interfaces.Repositories
{
    public interface IReceiptRepository
    {
        Task<Receipt> GetByIdAsync(int id);
        Task<IEnumerable<Receipt>> GetAllAsync(string userId);
        Task<int> AddAsync(Receipt receipt);
        Task UpdateAsync(Receipt receipt);
        Task DeleteAsync(int id);
    }
}
