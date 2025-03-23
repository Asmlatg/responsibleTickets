using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;    
namespace responsibleTickets.Infrastructure.Data
{
    public class AppDbContext :  DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        //i should define db dbset here
        //// public DbSet<mymodel> mymodels { get; set; } 
    }
}
