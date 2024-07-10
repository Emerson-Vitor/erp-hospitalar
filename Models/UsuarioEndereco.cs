using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CadastroUsuarios.Models
{
    public class UsuarioEndereco
    {
        public int UsuarioId { get; set; }
    public Usuario Usuario { get; set; }

    public int EnderecoId { get; set; }
    public Endereco Endereco { get; set; }
    }
}