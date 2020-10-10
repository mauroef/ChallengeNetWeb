using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChallengeNetWeb.Context;
using ChallengeNetWeb.Helpers;
using ChallengeNetWeb.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ChallengeNetWeb.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class ATMController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ATMController(AppDbContext context)
        {
            this._context = context;
        }

        [HttpPost]
        [Route("[action]")]
        public ActionResult PostCardNumber([FromBody] CardViewModel vm)
        {
            try
            {
                if (!String.IsNullOrEmpty(vm.Number))
                {
                    bool response = _context.Card
                        .Where(x => x.Status.Id != (short)Enums.Status.Blocked)
                        .Where(x => x.Number == vm.Number).Any();

                    return Ok(response);
                }
                else
                {
                    return BadRequest("Error");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("[action]")]
        public ActionResult PostPin([FromBody] CardViewModel vm)
        {
            try
            {
                if (!String.IsNullOrEmpty(vm.Number) && !String.IsNullOrEmpty(vm.Pin))
                {
                    var _card = _context.Card.Where(c => c.Number == vm.Number).SingleOrDefault();
                    short _wrongCounter = _card?.WrongAttempt ?? 0;
                    
                    if (_card == null)
                    {
                        return BadRequest("Card not found.");
                    }
                    else if (_card.Pin == vm.Pin)
                    {            
                        if (_card.WrongAttempt > 0)
                        {
                            _card.WrongAttempt = 0;
                            _context.SaveChanges();
                        }

                        return Ok("Success");
                    }
                    else if (_card.WrongAttempt >= (short)Enums.Card.MaxAttempt)
                    {
                        _card.StatusId = (short)Enums.Status.Blocked;
                    }
                    else 
                    {
                        _wrongCounter++;
                        _card.WrongAttempt = _wrongCounter;
                    }

                    _context.SaveChanges();

                    return BadRequest(_wrongCounter);
                }
                else
                {
                    return BadRequest("Input error.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("[action]")]
        public ActionResult PostBalance([FromBody] CardViewModel vm)
        {
            try
            {
                if (vm.Id > 0)
                {
                    var _newTransaction = new CardTransaction()
                    {
                        CardId = vm.Id,
                        TransactionId = (short)Enums.Transaction.Balance,
                        CreatedAt = DateTime.Now
                    };

                    _context.CardTransaction.Add(_newTransaction);
                    _context.SaveChanges();

                    return Ok("Success!");
                }
                else
                {
                    return BadRequest("Id card error.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("[action]")]
        public ActionResult PostWithdraw([FromBody] CardViewModel vm)
        {
            try
            {
                if (vm.Amount > 0)
                {
                    var _card = _context.Card.Find(vm.Id);

                    if (_card != null && _card.Balance >= vm.Amount)
                    {
                        decimal _newBalance = _card.Balance - vm.Amount;
                        var _newTransaction = new CardTransaction()
                        {
                            CardId = vm.Id,
                            TransactionId = (short)Enums.Transaction.Withdraw,
                            Balance = _newBalance,
                            Amount = vm.Amount,
                            CreatedAt = DateTime.Now
                        };

                        _card.Balance = _newBalance;
                        _context.CardTransaction.Add(_newTransaction);
                        _context.SaveChanges();

                        return Ok("Success");
                    }
                    else
                    {
                        return BadRequest("Not enough funds.");
                    }
                }
                else
                {
                    return BadRequest("Amount error.");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
