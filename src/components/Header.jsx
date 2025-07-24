import trollFace from "/public/troll-face.svg"

export default function Header() {
    return (
        <header className="header">
            <img 
                src={trollFace} 
                alt="Meme logo"
                className="header--image"
            />
            <h1 className="header--title">studio</h1>
        </header>
    )
}
