const Map = ({hotelData}) => {
  if (!hotelData) return null
  const { location, media } = hotelData

  const mediaObject = media.find(o => o.type === "productMap")

  return (
    <>
      <div className="tab-content">
        <span className="icon-mark icon"></span>
        <span className="address">{location.address}, {location.city}, {location.state} {location.postalCode}</span>
      </div>
      <img src={mediaObject.href} alt="Location" className="map-img"/>
    </>
  )
}

export default Map


//
//
// "areaName": "Strip",
// "address": "3355 S. Las Vegas Blvd.",
// "city": "Las Vegas",
// "state": "NV",
// "postalCode": "89109",
// "longitude": -115.1693,
// "latitude": 36.1237
