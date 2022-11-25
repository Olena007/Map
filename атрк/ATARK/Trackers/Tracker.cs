using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Trackers
{
    public class Tracker
    {
        public double SpeedGenerate(bool inmove)
        {
            if (inmove == false)
            {
                return 0;
            }
            else
            {
                Random random = new Random();

                return random.Next(20, 25);
            } 
        }
    }
}
