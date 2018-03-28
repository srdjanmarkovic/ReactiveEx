using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reactive;

namespace ReactiveEx
{
    class Program
    {
        static void Main(string[] args)
        {
            ObservableOne();
            Console.ReadLine();
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
