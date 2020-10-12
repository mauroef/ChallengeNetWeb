using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ChallengeNetWeb.Models
{
    [Table("Card")]
    public class Card
    {
        [Key]
        public int Id { get; set; }
        public string Number { get; set; } 
        public string Pin { get; set; }
        public decimal Balance { get; set; }
        public short WrongAttempt { get; set; }
        public DateTime ExpirationDate { get; set; }
        public short StatusId { get; set; }
        public virtual Status Status { get; set; }
    }
}
