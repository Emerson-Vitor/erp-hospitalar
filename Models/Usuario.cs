using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using BCrypt.Net;

namespace CadastroUsuarios.Models
{
    public class Usuario
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [RegularExpression(@"^\d{3}\.\d{3}\.\d{3}-\d{2}$", ErrorMessage = "CPF inválido")]
        public string Cpf { get; set; }

        [Required]
        [MinLength(4)]
        [RegularExpression(@"^[a-zA-Z\s]*$", ErrorMessage = "O nome deve conter apenas letras e espaços")]
        public string Nome { get; set; }

        [Required]
        [EmailAddress(ErrorMessage = "Email inválido")]
        public string Email { get; set; }

        [Required]
        [RegularExpression(@"^\(\d{2}\)\s\d{4,5}-\d{4}$", ErrorMessage = "Telefone inválido")]
        public string Telefone { get; set; }

        [Required]
        [MinLength(8, ErrorMessage = "A senha deve ter no mínimo 8 caracteres")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$", ErrorMessage = "A senha deve conter letras maiúsculas, minúsculas e caracteres especiais")]
        public string Senha { get; set; }

        public int EnderecoId { get; set; }
        public Endereco Endereco { get; set; }

        public void HashPassword()
        {
            Senha = BCrypt.Net.BCrypt.HashPassword(Senha);
        }

        public bool VerifyPassword(string password)
        {
            return BCrypt.Net.BCrypt.Verify(password, Senha);
        }
    }

    public class LoginModel
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Senha { get; set; }
    }
}
