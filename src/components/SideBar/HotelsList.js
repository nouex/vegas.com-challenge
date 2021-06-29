import { useEffect } from "react"
import useApi from "../../hooks/useApi"

const HotelsList = () => {
  const [ hotelsList, setHotelsList] = useApi("api/hotels")

  useEffect(() => {
    if (hotelsList === null || hotelsList.normalized) return
    const codesSeen = Object.create(null)
    const uniqueHotelsList = hotelsList.list.filter(hotel => {
      if (codesSeen[hotel.code]) return false
      codesSeen[hotel.code] = true
      return true
    })

    uniqueHotelsList.sort((l, r) => l.name.localeCompare(r.name))
    setHotelsList({ list: uniqueHotelsList, normalized: true })
  }, [hotelsList])

  let display

  // TODO: add 3rd option for error loading
  if (hotelsList === null || !hotelsList.normalized) display = "Loading..."
  else {
    display = hotelsList.list.map(hotel => (
      <div role="listitem" key={hotel.code} className="hotel">
        <span className="name">{hotel.name}</span>
        <span className="price">
          ${
            hotel.price
              .toLocaleString("en-US", { maximumFractionDigits: 2, minimumFractionDigits: 2 })
          }
        </span>
      </div>
    ))
  }

  return <div role="list" className="hotel-list">{display}</div>
}

export default HotelsList
