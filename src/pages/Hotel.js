import SideBar from "../components/SideBar/index"
import Content from "../components/Content"
import useApi from "../hooks/useApi"

function HotelPage() {
  const [ hotelData, ] = useApi("api/hotels/venetian")

  return (
    <div className="page">
      <SideBar hotelData={hotelData} />
      <Content hotelData={hotelData}/>
    </div>
  );
}

export default HotelPage;
