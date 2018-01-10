using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace spX_CSharp_MVC.Models
{
    public class Joke
    {
        public string ID { get; set; }

        [Display(Name = "Oprindelse")]
        public string Origin { get; set; }

        [Display(Name = "Joke")]
        public string Value { get; set; }

        [Display(Name = "Tidspunkt")]
        public DateTime TimeStamp { get; set; }
    }
}