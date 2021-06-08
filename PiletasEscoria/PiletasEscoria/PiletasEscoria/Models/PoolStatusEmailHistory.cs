using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace PiletasEscoria.Models
{
    public partial class PoolStatusEmailHistory
    {
        public long IdPoolStatusEmailHistory { get; set; }
        public int IdPool { get; set; }
        public long IdStatusEmailType { get; set; }
        public DateTimeOffset? LastEmail { get; set; }

        public virtual Pool IdPoolNavigation { get; set; }
        public virtual StatusEmailType IdStatusEmailTypeNavigation { get; set; }
    }
}
