using System;
using System.Collections.Generic;

// Code scaffolded by EF Core assumes nullable reference types (NRTs) are not used or disabled.
// If you have enabled NRTs for your project, then un-comment the following line:
// #nullable disable

namespace PiletasEscoria.Models
{
    public partial class Property
    {
        public Property()
        {
            //PoolAction = new HashSet<PoolAction>();
            //PoolActionHistory = new HashSet<PoolActionHistory>();
            //PoolStatusProperties = new HashSet<PoolStatusProperties>();
            //StatusEmailType = new HashSet<StatusEmailType>();
        }

        public int IdProperty { get; set; }
        public int? IdDataType { get; set; }
        public string Name { get; set; }
        public bool? Active { get; set; }
        public DateTimeOffset? InsDateTime { get; set; }
        public DateTimeOffset? UpdDateTime { get; set; }

        public DataType IdDataTypeNavigation { get; set; }
        //public virtual ICollection<PoolAction> PoolAction { get; set; }
        //public virtual ICollection<PoolActionHistory> PoolActionHistory { get; set; }
        //public virtual ICollection<PoolStatusProperties> PoolStatusProperties { get; set; }
        //public virtual ICollection<StatusEmailType> StatusEmailType { get; set; }
    }
}
