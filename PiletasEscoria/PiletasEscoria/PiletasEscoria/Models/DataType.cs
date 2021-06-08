using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace PiletasEscoria.Models
{
    public partial class DataType
    {
        public DataType()
        {
            Property = new HashSet<Property>();
        }

        public int IdDataType { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public bool? Active { get; set; }
        public DateTimeOffset? InsDateTime { get; set; }

        public virtual ICollection<Property> Property { get; set; }
    }
}
