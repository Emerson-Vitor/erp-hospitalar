using Microsoft.EntityFrameworkCore;
using CadastroUsuarios.Models;

namespace CadastroUsuarios.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Endereco> Enderecos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Usuario>()
                .HasOne(u => u.Endereco)
                .WithMany()
                .HasForeignKey(u => u.EnderecoId);
        }
    }
}
