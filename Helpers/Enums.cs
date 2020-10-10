using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ChallengeNetWeb.Helpers
{
    public static class Enums
    {
        public enum Transaction
        { 
            Balance = 1,
            Withdraw = 2
        }

        public enum Status
        {
            Active = 1,
            Blocked = 2
        }

        public enum Card
        {
            MaxAttempt = 3
        }
    }
}
