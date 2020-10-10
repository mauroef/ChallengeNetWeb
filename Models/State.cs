using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChallengeNetWeb.Models
{
    public class State
    {
        [Key]
        public short Id { get; set; }
        public string Description { get; set; }

    }
}
