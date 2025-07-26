import { useEffect, useState } from "react";
import html2canvas from "html2canvas";

export default function Body() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    imageUrl: "troll-face.svg", 
  });

  const [apimemes, setApiMemes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => {
        setApiMemes(data.data.memes);
        setLoading(false);
      });
  }, []);

  function handleSubmit(event) {
    const { name, value } = event.target;
    setMeme((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function generateNewImage() {
    const randomIndex = Math.floor(Math.random() * apimemes.length);
    const url = apimemes[randomIndex]?.url || meme.imageUrl;
    setMeme((prev => ({
      ...prev,
      imageUrl: url,
    })));
  }

  function handleDownload() {
    const memeElement = document.querySelector(".meme");
    if (!memeElement) return;

    html2canvas(memeElement, {
      useCORS: true,
      scale: 2,
    }).then((canvas) => {
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "meme.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setMeme({
        topText: "",
        bottomText: "",
        imageUrl: "troll-face.svg",
      });
    });
  }

  return (
    <main>
      <div className="form">
        <div className="form--row">
          <label>
            ✍️ Top Text
            <input
              type="text"
              placeholder="Funny stuff goes here..."
              name="topText"
              onChange={handleSubmit}
              value={meme.topText}
            />
          </label>

          <label>
            🖊️ Bottom Text
            <input
              type="text"
              placeholder="Punchline here..."
              name="bottomText"
              onChange={handleSubmit}
              value={meme.bottomText}
            />
          </label>
        </div>

        <div className="button-row">
          <button onClick={generateNewImage}>🖼️ Generate a new image</button>
          <button onClick={handleDownload}>⬇️ Download Meme</button>
        </div>
      </div>

      {loading ? (
        <p className="loading">⏳ Loading memes...</p>
      ) : (
        <div className="meme">
          <img src={meme.imageUrl} alt="Meme" />
          <span className="top">{meme.topText}</span>
          <span className="bottom">{meme.bottomText}</span>
        </div>
      )}
    </main>
  );
}
