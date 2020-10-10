using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace ChallengeNetWeb.Models
{
    [Table("Status")]
    public class Status
    {
        [Key]
        public short Id { get; set; }
        public string Description { get; set; }

    }
}
