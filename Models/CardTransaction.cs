using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChallengeNetWeb.Models
{
    public class CardTransaction
    {
        [Key]
        public int Id { get; set; }
        public int CardId { get; set; }
        public short TransactionId { get; set; }

    }
}
