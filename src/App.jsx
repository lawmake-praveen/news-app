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
    "ScienceAndTechnology",
    "Entertainment",
    "LifeStyle",
  ];

  useEffect(() => {
    async function loadNews() {
      const url = `https://bing-news-search1.p.rapidapi.com/news?category=${query}&mkt=en-IN`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "9fab679c76msh839a2b807bd8a13p158e0fjsn02e0841c5276",
          "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error(error);
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
          data.value.map((item) => (
            <a
              href={item.url}
              className="article-link"
              key={item.name}
              target="_black"
            >
              <div className="box">
                <div className="img">
                  <img
                    src={item?.image?.thumbnail?.contentUrl}
                    alt={item.name}
                  />
                </div>
                <div className="text">
                  <p className="title">{item.name}</p>
                  <p className="source">{item.provider[0].name}</p>
                </div>
              </div>
            </a>
          ))}
      </div>
      {/* <div className="btn-container">
        <button
          className="read-more"
          onClick={() =>
            setTotalArticles((prevTotalArticles) => prevTotalArticles + 10)
          }
        >
          Read More
        </button>
      </div> */}
    </main>
  );
}

export default App;
