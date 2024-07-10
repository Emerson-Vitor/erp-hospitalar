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
        public DbSet<UsuarioEndereco> UsuariosEnderecos { get;set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UsuarioEndereco>()
                .HasKey(ue => new { ue.UsuarioId, ue.EnderecoId });

            modelBuilder.Entity<UsuarioEndereco>()
                .HasOne(ue => ue.Usuario)
                .WithMany(u => u.UsuarioEnderecos)
                .HasForeignKey(ue => ue.UsuarioId);

            modelBuilder.Entity<UsuarioEndereco>()
                .HasOne(ue => ue.Endereco)
                .WithMany(e => e.UsuarioEnderecos)
                .HasForeignKey(ue => ue.EnderecoId);

        }
    }
}
