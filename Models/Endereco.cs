using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace CadastroUsuarios.Models
{
   public class Endereco
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Logradouro { get; set; }
        [Required]
        public string Numero { get; set; }
        [Required]
        public string Bairro { get; set; }
        [Required]
        public string Cidade { get; set; }
        [Required]
        public string Estado { get; set; }

    }
}