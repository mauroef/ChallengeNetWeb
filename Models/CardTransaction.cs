using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ChallengeNetWeb.Models
{
    [Table("CardTransaction")]
    public class CardTransaction
    {
        public int CardId { get; set; }
        public short TransactionId { get; set; }
        public decimal Balance { get; set; }
        public decimal Amount { get; set; }
        public DateTime CreatedAt { get; set; }
        public virtual Card Card { get; set; }
        public virtual Transaction Transaction { get; set; }
    }
}
