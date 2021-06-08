using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace PiletasEscoria.Models
{
    public partial class Status
    {
        public Status()
        {
            Pool = new HashSet<Pool>();
            PoolAction = new HashSet<PoolAction>();
            PoolActionHistory = new HashSet<PoolActionHistory>();
            PoolStatusProperties = new HashSet<PoolStatusProperties>();
            StatusEmailTypeIdStatusNavigation = new HashSet<StatusEmailType>();
            StatusEmailTypeIdStatusNextPoolNavigation = new HashSet<StatusEmailType>();
        }

        public int IdStatus { get; set; }
        public string Name { get; set; }
        public bool? EmailAlert { get; set; }
        public bool? Active { get; set; }
        public DateTimeOffset? InsDateTime { get; set; }
        public DateTimeOffset? UpdDateTime { get; set; }
        public string Color { get; set; }

        public virtual ICollection<Pool> Pool { get; set; }
        public virtual ICollection<PoolAction> PoolAction { get; set; }
        public virtual ICollection<PoolActionHistory> PoolActionHistory { get; set; }
        public virtual ICollection<PoolStatusProperties> PoolStatusProperties { get; set; }
        public virtual ICollection<StatusEmailType> StatusEmailTypeIdStatusNavigation { get; set; }
        public virtual ICollection<StatusEmailType> StatusEmailTypeIdStatusNextPoolNavigation { get; set; }
    }
}
