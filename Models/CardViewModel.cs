using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChallengeNetWeb.Models
{
    public class CardViewModel
    {
        public int Id { get; set; }
        public string Number { get; set; }
        public string Pin { get; set; }
        public decimal Amount { get; set; }
    }
}
