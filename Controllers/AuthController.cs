using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using CadastroUsuarios.Models;
using CadastroUsuarios.Data;

namespace CadastroUsuarios.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Usuario usuario)
        {
            if (_context.Usuarios.Any(u => u.Cpf == usuario.Cpf || u.Email == usuario.Email))
            {
                return BadRequest("Usuário com o mesmo CPF ou email já existe.");
            }

            usuario.HashPassword();
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(usuario);
            var name = usuario.Nome;
            return Ok(new { token , name });
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginModel login)
        {
            var user = _context.Usuarios.SingleOrDefault(u => u.Email == login.Email);
            if (user == null || !user.VerifyPassword(login.Senha))
            {
                return Unauthorized("Email ou senha inválidos.");
            }

            var token = GenerateJwtToken(user);
            var name = user.Nome;
            return Ok(new { token, name });
        }


        private string GenerateJwtToken(Usuario usuario)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, usuario.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }


}