// newsData api: pub_24632c91231718cfd79a8ba8c04650e355e9a
//https://newsdata.io/api/1/news?apikey=pub_24632c91231718cfd79a8ba8c04650e355e9a&q=${}

async function newsData(subject = "London") {
  try {
    const data = await fetch(
      `https://newsdata.io/api/1/news?apikey=pub_24632c91231718cfd79a8ba8c04650e355e9a&q=${subject}`,
      { mode: "cors" }
    );
    const news = await data.json();
    return news;
  } catch (error) {
    alert(error + "\nNO NEWS DATA AVAILABLE");
    const newsWindow = document.querySelector(".news");
    newsWindow.classList.add("none");
  }
}

export async function useNewsData(subject, parent) {
  const Newscontainer = document.createElement("div");
  //   Newscontainer.innerHTML = "";
  parent.appendChild(Newscontainer);
  Newscontainer.classList.add("news");

  //   const iconContainer = document.createElement("div");
  //   Newscontainer.appendChild(iconContainer);
  const infoContainer = document.createElement("div");
  Newscontainer.appendChild(infoContainer);
  infoContainer.classList.add("gap");

  const data = await newsData(subject);
  const dataList = data.results;
  for (let x in dataList) {
    const articleContainer = document.createElement("div");
    infoContainer.appendChild(articleContainer);

    const title = document.createElement("div");
    title.style.cursor = "pointer";
    title.classList.add("title");
    title.textContent = dataList[x].title;
    articleContainer.appendChild(title);

    const description = document.createElement("div");
    description.classList.add("desc");

    description.textContent = dataList[x].description;
    articleContainer.appendChild(description);

    // const icon = new Image();
    // icon.src = dataList[x].image_url;
    // iconContainer.appendChild(icon);

    title.onclick = () => {
      window.open(dataList[x].link);
    };
  }
}
