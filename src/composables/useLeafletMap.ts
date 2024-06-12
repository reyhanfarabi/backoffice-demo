import leaflet from 'leaflet'

interface IUseLeafletMap {
  init: (element: HTMLDivElement | null) => void
  showCoordinateOnMap: (lat: number, long: number) => void
}

export const useLeafletMap = (): IUseLeafletMap => {
  let map: leaflet.Map | null = null
  let marker: leaflet.Marker | null = null

  const init = (element: HTMLDivElement | null): void => {
    map = leaflet.map(element || 'map').locate({ setView: true, maxZoom: 16 })

    leaflet
      .tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
      .addTo(map)
  }

  const showCoordinateOnMap = (lat: number, long: number): void => {
    if (!map) return

    if (marker) map.removeLayer(marker)
    marker = leaflet.marker([lat, long]).addTo(map)
    map.flyTo({ lat: lat, lng: long })
  }

  return {
    init,
    showCoordinateOnMap
  }
}
