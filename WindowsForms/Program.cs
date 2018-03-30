using System;
using System.Collections.Generic;
using System.Linq;
using System.Reactive;
using System.Reactive.Linq;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsForms
{
    static class Program
    {
        /// <summary>
        /// The main entry point for the application.
        /// </summary>
        [STAThread]
        static void Main()
        {
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);

            var lbl = new Label () { Padding = Padding.Add(new Padding(3), new Padding(3)) };
            var frm = new Form1 { Controls = { lbl } };
            IObservable<EventPattern<MouseEventArgs>> move = Observable.FromEventPattern<MouseEventArgs>(frm, "MouseMove");
            move.Subscribe(evt => {
                lbl.Text = evt.EventArgs.Location.ToString();
            });
            Application.Run(frm);
        }
    }
}
