using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace PiletasEscoria.Models
{
    public partial class EmailType
    {
        public EmailType()
        {
            StatusEmailType = new HashSet<StatusEmailType>();
        }

        public long IdEmailType { get; set; }
        public string EmailSubject { get; set; }
        public string EmailBody { get; set; }
        public bool? Active { get; set; }
        public DateTimeOffset? InsDateTime { get; set; }
        public DateTimeOffset? UpdDateTime { get; set; }

        public virtual ICollection<StatusEmailType> StatusEmailType { get; set; }
    }
}
