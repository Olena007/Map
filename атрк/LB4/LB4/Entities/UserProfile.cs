using System;
using System.Collections.Generic;

namespace LB4.Entities
{
    public partial class UserProfile
    {
        public int UserId { get; set; }
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;

        public virtual Basket? Basket { get; set; }
    }
}
