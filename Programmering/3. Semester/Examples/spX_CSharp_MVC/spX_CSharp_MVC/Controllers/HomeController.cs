using Newtonsoft.Json.Linq;
using spX_CSharp_MVC.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;

namespace spX_CSharp_MVC.Controllers
{
    public class HomeController : Controller
    {
        static List<Joke> joke;
        static List<Joke> jokes = new List<Joke>();

        public ActionResult Index()
        {
            joke = GetJokes();

            ViewBag.jokes = jokes.OrderByDescending(x => x.TimeStamp);

            return View(joke);
        }
        
        public ActionResult SaveJoke(string id)
        {
            Joke inputJoke = new Joke();
            inputJoke = joke.FirstOrDefault(x => x.ID == id);

            jokes.Add(inputJoke);

            return RedirectToAction("Index");
        }

        private List<Joke> GetJokes()
        {
            if (joke != null)
            {
                joke = null;
            }

            joke = new List<Joke>();

            using (HttpClient client = new HttpClient())
            {
                client.DefaultRequestHeaders.Add("Accept", "application/json");

                using (HttpResponseMessage response = client.GetAsync("https://api.chucknorris.io/jokes/random").Result)
                {
                    if (response.IsSuccessStatusCode)
                    {
                        HttpContent responseContent = response.Content;

                        JObject jObject = JObject.Parse(responseContent.ReadAsStringAsync().Result);

                        Joke chuckJoke = new Joke
                        {
                            ID = jObject["id"].ToString(),
                            Origin = "Chuck Joke",
                            Value = jObject["value"].ToString(),
                            TimeStamp = DateTime.Now
                        };

                        joke.Add(chuckJoke);
                    }
                }

                using (HttpResponseMessage response = client.GetAsync("https://icanhazdadjoke.com/").Result)
                {
                    client.DefaultRequestHeaders.Add("Accept", "application/json");

                    if (response.IsSuccessStatusCode)
                    {
                        HttpContent responseContent = response.Content;

                        JObject jObject = JObject.Parse(responseContent.ReadAsStringAsync().Result);

                        Joke dadJoke = new Joke
                        {
                            ID = jObject["id"].ToString(),
                            Origin = "Dad Joke",
                            Value = jObject["joke"].ToString(),
                            TimeStamp = DateTime.Now
                        };

                        joke.Add(dadJoke);
                    }
                }

                return joke;
            }
        }
    }
}
