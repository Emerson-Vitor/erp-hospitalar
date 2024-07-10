using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;

using System.Text;
using CadastroUsuarios.Models;
using CadastroUsuarios.Data;
using Microsoft.AspNetCore.Authorization;

namespace CadastroUsuarios.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public UserController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }


    [HttpGet("registers")]
    public async Task<IActionResult> GetRegisters()
    {
        var usuarios = await _context.Usuarios.Include(u => u.Endereco).ToListAsync();
        return Ok(usuarios);
    }

  
    [HttpPut("register/{id}")]
    public async Task<IActionResult> UpdateRegisterById(int id, [FromBody] Usuario updatedUsuario)
    {
        var usuario = await _context.Usuarios.Include(u => u.Endereco).FirstOrDefaultAsync(u => u.Id == id);
        if (usuario == null)
        {
            return NotFound("Usuário não encontrado.");
        }

      
        if (_context.Usuarios.Any(u => (u.Cpf == updatedUsuario.Cpf || u.Email == updatedUsuario.Email) && u.Id != id))
        {
            return BadRequest("Usuário com o mesmo CPF ou email já existe.");
        }
        usuario.Nome = updatedUsuario.Nome;
        usuario.Cpf = updatedUsuario.Cpf;
        usuario.Email = updatedUsuario.Email;
        usuario.Telefone = updatedUsuario.Telefone;


        if (updatedUsuario.Endereco != null)
        {
            if (usuario.Endereco == null)
            {
                usuario.Endereco = new Endereco();
            }
            usuario.Endereco.Logradouro = updatedUsuario.Endereco.Logradouro;
            usuario.Endereco.Cidade = updatedUsuario.Endereco.Cidade;
            usuario.Endereco.Estado = updatedUsuario.Endereco.Estado;
            usuario.Endereco.Numero = updatedUsuario.Endereco.Numero;
            usuario.Endereco.Bairro = updatedUsuario.Endereco.Bairro;
            
        }

        await _context.SaveChangesAsync();

        return NoContent();
    }
    }

}