using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace AngularjsMvc.Models.EF
{
    public class AngularjsMvcDbContext : DbContext
    {
        public AngularjsMvcDbContext():base("name = AngularjsMvcDbContext")
        {

        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }

        public DbSet<User> Users { get; set; }
    }
}