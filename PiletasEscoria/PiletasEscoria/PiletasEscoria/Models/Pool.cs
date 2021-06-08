using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace PiletasEscoria.Models
{
    public partial class Pool
    {
        public Pool()
        {
            PoolAction = new HashSet<PoolAction>();
            PoolActionHistory = new HashSet<PoolActionHistory>();
            PoolStatusEmail = new HashSet<PoolStatusEmail>();
            PoolStatusEmailHistory = new HashSet<PoolStatusEmailHistory>();
            PoolStatusProperties = new HashSet<PoolStatusProperties>();
        }

        public int IdPool { get; set; }
        public string Identification { get; set; }
        public bool? Active { get; set; }
        public int? IdStatus { get; set; }
        public DateTimeOffset? InsDateTime { get; set; }
        public DateTimeOffset? UpdDateTime { get; set; }
        public bool? SentEmail { get; set; }
        public DateTimeOffset? LastEmail { get; set; }
        public DateTimeOffset? DateTimeToAlarm { get; set; }

        public virtual Status IdStatusNavigation { get; set; }
        public virtual ICollection<PoolAction> PoolAction { get; set; }
        public virtual ICollection<PoolActionHistory> PoolActionHistory { get; set; }
        public virtual ICollection<PoolStatusEmail> PoolStatusEmail { get; set; }
        public virtual ICollection<PoolStatusEmailHistory> PoolStatusEmailHistory { get; set; }
        public virtual ICollection<PoolStatusProperties> PoolStatusProperties { get; set; }
    }
}
