using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace PiletasEscoria.Models
{
    public partial class StatusEmailType
    {
        public StatusEmailType()
        {
            PoolStatusEmail = new HashSet<PoolStatusEmail>();
            PoolStatusEmailHistory = new HashSet<PoolStatusEmailHistory>();
        }

        public long IdStatusEmailType { get; set; }
        public int? IdStatus { get; set; }
        public int? IdProperty { get; set; }
        public long? IdEmailType { get; set; }
        public TimeSpan? Interval { get; set; }
        public int? IdStatusNextPool { get; set; }

        public virtual EmailType IdEmailTypeNavigation { get; set; }
        public virtual Property IdPropertyNavigation { get; set; }
        public virtual Status IdStatusNavigation { get; set; }
        public virtual Status IdStatusNextPoolNavigation { get; set; }
        public virtual ICollection<PoolStatusEmail> PoolStatusEmail { get; set; }
        public virtual ICollection<PoolStatusEmailHistory> PoolStatusEmailHistory { get; set; }
    }
}
