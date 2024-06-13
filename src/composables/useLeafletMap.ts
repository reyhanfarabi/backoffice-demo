import type { ICoordinate } from '@/common/types'
import leaflet from 'leaflet'

interface IUseLeafletMap {
  init: (element: HTMLDivElement | null, coordinate?: ICoordinate) => void
  showCoordinateOnMap: (lat: number, long: number) => void
  setMarkerCenterMap: () => void
  getCenterMapCoordinate: () => ICoordinate
}

export const useLeafletMap = (): IUseLeafletMap => {
  let map: leaflet.Map | null = null
  let marker: leaflet.Marker | null = null

  const init = (element: HTMLDivElement | null, coordinate?: ICoordinate): void => {
    if (coordinate) {
      map = leaflet.map(element || 'map').setView([coordinate.latitude, coordinate.longitude], 12)
    } else {
      map = leaflet.map(element || 'map').locate({ setView: true, maxZoom: 16 })
    }

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

  const setMarkerCenterMap = (): void => {
    if (!map) return

    map.on('move', () => {
      if (!map) return

      if (!marker) {
        marker = leaflet.marker([map.getCenter().lat, map.getCenter().lng]).addTo(map)
      } else {
        marker.setLatLng(map.getCenter())
      }
    })
  }

  const getCenterMapCoordinate = (): ICoordinate => {
    if (!map)
      return {
        latitude: NaN,
        longitude: NaN
      }

    return {
      latitude: map?.getCenter().lat,
      longitude: map?.getCenter().lng
    }
  }

  return {
    init,
    showCoordinateOnMap,
    setMarkerCenterMap,
    getCenterMapCoordinate
  }
}
