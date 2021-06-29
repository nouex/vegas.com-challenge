const Header = ({ hotelData, setTab }) => {
  if (!hotelData) return null

  const { name, starRating, price, phoneNumber } = hotelData
  const stars = []
  for (let i = 0; i < Math.ceil(starRating); i++) {
    stars.push(<span key={i} className="icon-star icon"></span>)
  }
  const locationArea = hotelData.location.areaName

  // TODO: "Strip" is dynamic based on data object
  return (
    <header className="header">
      <div>
        <h1 className="name">{name.toUpperCase()}</h1><span>{stars}</span>
        <div className="header-info-container">
          <span className="header-info pointer" onClick={setTab.bind(null, "map")}>
            <span className="icon-mark icon"></span>{locationArea}
          </span>
          <span className="header-info">
            <span className="icon-phone icon"></span>{phoneNumber}
          </span>
          <span className="header-info">
            <span className="icon-like icon"></span>Best Price Guarantee
          </span>
        </div>
      </div>
      <div>
        <div className="price">${price}</div>
        <span>HOTEL ROOMS FROM</span>
      </div>
    </header>
  )
}

export default Header
