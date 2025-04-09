using responsibleTickets.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace responsibleTickets.Infrastructure.Data
{
    public class ExpenseContext : DbContext
    {
        public ExpenseContext(DbContextOptions<ExpenseContext> options) : base(options) { }

        public DbSet<Expense> Expenses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<Expense>().HasKey(x => x.Id);
        }
    }
}
