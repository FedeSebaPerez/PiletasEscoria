using System;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace PiletasEscoria.Models
{
    public partial class User
    {
        public User()
        {
            //PoolAction = new HashSet<PoolAction>();
            //PoolActionHistory = new HashSet<PoolActionHistory>();
        }

        public int IdUser { get; set; }
        public string Identification { get; set; }
        public string Password { get; set; }
        public bool? Active { get; set; }
        public DateTimeOffset? InsDateTime { get; set; }
        public DateTimeOffset? UpdDateTime { get; set; }
        public bool? IsAdmin { get; set; }

        //public virtual ICollection<PoolAction> PoolAction { get; set; }
        //public virtual ICollection<PoolActionHistory> PoolActionHistory { get; set; }
    }
}
