﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ChallengeNetWeb.Models
{
    public class Card
    {
        [Key]
        public int Id { get; set; }
        public string Number { get; set; }
        public int Pin { get; set; }
        public decimal Amount { get; set; }
        public short StateId { get; set; }
    }
}
