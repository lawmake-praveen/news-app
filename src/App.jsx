import { useEffect, useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";

function App() {
  const [data, setData] = useState();
  const [sideBar, setSideBar] = useState(false);
  const [totalArticles, setTotalArticles] = useState(12);
  const [query, setQuery] = useState("India");
  const Categories = [
    "India",
    "World",
    "Politics",
    "Business",
    "Sports",
    "Technology",
    "Science",
    "Health",
    "Entertainment",
    "Environment",
    "Lifestyle",
    "Education",
    "Weather",
    "Crime",
    "Automotive",
    "Travel",
  ];

  useEffect(() => {
    async function loadNews() {
      const apiKey = `51003ed9f93f4abca6a97248915311ff`;
      const BASE_URL = `https://newsapi.org`;
      const searchNews = `${BASE_URL}/v2/everything?q=${query}&from=2023-05-20&pageSize=${totalArticles}&sortBy=popularity&apiKey=${apiKey}`;

      try {
        const response = await fetch(`${searchNews}`);
        const responseJson = await response.json();
        setData(responseJson);
      } catch (error) {
        console.log(error);
        alert("API Key is Full");
      }
    }
    setSideBar(false);
    loadNews();
  }, [query, totalArticles]);

  return (
    <main className="app">
      <AiOutlineMenu className="menu" onClick={() => setSideBar(true)} />
      <ul className={`sidebar ${sideBar ? "sidebar-open" : ""}`}>
        <span>
          <AiOutlineClose onClick={() => setSideBar(false)} className="close" />
        </span>
        <li>Categories</li>
        {Categories.map((item, index) => (
          <li
            key={index}
            onClick={(e) => {
              setQuery(e.target.innerText), setTotalArticles(12);
            }}
          >
            {item}
          </li>
        ))}
      </ul>
      <h1 className="heading">Daily News</h1>
      <h2 className="indication">
        Category: <span>"{query}"</span>
      </h2>
      <div className="container">
        {data &&
          data.articles.map((item) => (
            <a
              href={item.url}
              className="article-link"
              key={item.title}
              target="_black"
            >
              <div className="box">
                <div className="img">
                  <img src={item.urlToImage} alt={item.title} />
                </div>
                <div className="text">
                  <p className="title">{item.title}</p>
                  <p className="source">{item.author}</p>
                </div>
              </div>
            </a>
          ))}
      </div>
      <div className="btn-container">
        <button
          className="read-more"
          onClick={() =>
            setTotalArticles((prevTotalArticles) => prevTotalArticles + 10)
          }
        >
          Read More
        </button>
      </div>
    </main>
  );
}

export default App;
