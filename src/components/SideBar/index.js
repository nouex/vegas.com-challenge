import HotelImg from "./HotelImg"
import HotelsList from "./HotelsList"

const SideBar = ({ hotelData }) => {
  if (!hotelData) return null
  const { href } = hotelData.media.find(({type}) => type === "productImage")

  return (
    <div className="side-bar">
      <HotelImg src={href}/>
      <HotelsList />
    </div>
  )
}

export default SideBar
