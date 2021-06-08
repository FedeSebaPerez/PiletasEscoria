using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace PiletasEscoria.Models
{
    public partial class PoolStatusProperties
    {
        public int IdStatus { get; set; }
        public int IdPool { get; set; }
        public int IdProperty { get; set; }
        public bool? Active { get; set; }
        public string Value { get; set; }
        public DateTimeOffset? InsDateTime { get; set; }
        public DateTimeOffset? UpdDateTime { get; set; }
        public bool? IsCountDown { get; set; }

        public virtual Pool IdPoolNavigation { get; set; }
        public virtual Property IdPropertyNavigation { get; set; }
        public virtual Status IdStatusNavigation { get; set; }
    }
}
