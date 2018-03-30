using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mime;
using System.Text;
using System.Threading.Tasks;
using System.Reactive;
using System.Reactive.Linq;
using System.Reactive.Subjects;
using System.Reflection.Emit;
using System.Threading;

namespace ReactiveEx
{
    class Program
    {
        static void Main(string[] args)
        {
            ObservableOne();
            ObservableTwo();
            ObservableEnumerable();
            ObservableSequence();
            ObservableArraySequence();
            ObservableArraySequence2();
            HotObservable();
            Console.ReadLine();
        }

        private static void HotObservable()
        {
            Console.WriteLine("Current Time: " + DateTime.Now);
            var source = Observable.Interval(TimeSpan.FromSeconds(1));            //creates a sequence

            IConnectableObservable<long> hotObservable = source.Publish<long>();            // convert the sequence into a hot sequence

            IDisposable subscription1 = hotObservable.Subscribe(                            // no value is pushed to 1st subscription at this point
                x => Console.WriteLine("Observer 1: OnNext: {0}", x),
                ex => Console.WriteLine("Observer 1: OnError: {0}", ex.Message),
                () => Console.WriteLine("Observer 1: OnCompleted"));
            Console.WriteLine("Current Time after 1st subscription: " + DateTime.Now);
            Thread.Sleep(3000);                                                   //idle for 3 seconds

            hotObservable.Connect();   // hot is connected to source and starts pushing value to subscribers (all of them from this point in time)

            Console.WriteLine("Current Time after Connect: " + DateTime.Now);
            Thread.Sleep(3000);                                                   //idle for 3 seconds
            Console.WriteLine("Current Time just before 2nd subscription: " + DateTime.Now);

            IDisposable subscription2 = hotObservable.Subscribe(                            // value will immediately be pushed to 2nd subscription
                x => Console.WriteLine("Observer 2: OnNext: {0}", x),
                ex => Console.WriteLine("Observer 2: OnError: {0}", ex.Message),
                () => Console.WriteLine("Observer 2: OnCompleted"));

            Console.ReadKey();
        }

        private static void ObservableArraySequence2()
        {
            // IEnumerable source
            string[] weekDays = { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" };

            // Observer
            IObserver<string> observer = Observer.Create<string>(
                (string dayOfWeek) =>
                {
                    if (dayOfWeek.Equals("Wednesday", StringComparison.CurrentCultureIgnoreCase))
                    {
                        // do your job only on Wednesday
                        Console.WriteLine(" Observable Array, it's Wednesday, go to complete ...");
                    }
                    else
                    {
                        Console.WriteLine($" Observable Array, it's {dayOfWeek}, remain lazy!");
                    }
                },
                ex => Console.WriteLine($" Observable Array, OnError: {ex.Message}"),
                () => Console.WriteLine(" Observable Array, OnCompleted!"));

            // Converting an Enumerable Collection to an Observable Sequence
            IObservable<string> observableArray = weekDays.ToObservable();
            // Subscription
            IDisposable subscription = observableArray.Subscribe(observer);
            // Unsubscribe/Dispose
            subscription.Dispose();
        }

        private static void ObservableArraySequence()
        {
            string[] weekDays = { "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" };

            var observableArray = weekDays.ToObservable();
            IDisposable subscription = observableArray.Subscribe((string dayOfWeek) =>
            {
                if (dayOfWeek.Equals("Wednesday", StringComparison.CurrentCultureIgnoreCase))
                {
                    // do your job only on Wednesday
                    Console.WriteLine("Observable Array, it's Wednesday, go to complete ...");
                }
                else
                {
                    Console.WriteLine($"Observable Array, it's {dayOfWeek}, remain lazy!");
                }
            });

            subscription.Dispose();
        }
        private static void ObservableSequence()
        {

        }

        private static void ObservableEnumerable()
        {
            IEnumerable<int> e = new List<int> { 1, 2, 3, 4, 5 };

            IObservable<int> source = e.ToObservable();
            IDisposable subscription = source.Subscribe(
                                        x => Console.WriteLine("ObservableEnumerable OnNext: {0}", x),
                                        ex => Console.WriteLine("ObservableEnumerable OnError: {0}", ex.Message),
                                        () => Console.WriteLine("ObservableEnumerable OnCompleted"));
            subscription.Dispose();
        }

        private static void ObservableTwo()
        {
            IObservable<int> source = System.Reactive.Linq.Observable.Range(1, 10);

            IObserver<int> obsvr = Observer.Create<int>(
                x => Console.WriteLine("OnNext: {0}", x),
                ex => Console.WriteLine("OnError: {0}", ex.Message),
                () => Console.WriteLine("OnCompleted"));

            IDisposable subscription = source.Subscribe(obsvr);

            Console.WriteLine("Press ENTER to unsubscribe...");
            Console.ReadLine();

            subscription.Dispose();
        }

        private static void ObservableOne()
        {
            IObservable<int> source = System.Reactive.Linq.Observable.Range(1, 10);
            // public delegate void Action<in T>(T obj);
            // public static IDisposable Subscribe<T>(this IObservable<T> source, Action<T> onNext, Action<Exception> onError, Action onCompleted);
            IDisposable subscription = source.Subscribe(
                x => Console.WriteLine("OnNext: {0}", x),
                ex => Console.WriteLine("OnError: {0}", ex.Message),
                () => Console.WriteLine("OnCompleted"));
            Console.WriteLine("Press ENTER to unsubscribe...");
            Console.ReadLine();
            subscription.Dispose();
        }
    }
}