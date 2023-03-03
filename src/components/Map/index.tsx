import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import MapTopBar from '@components/TopBar'

import { AppConfig } from '@lib/AppConfig'
import { Places } from '@lib/Places'

import MapContextProvider from './MapContextProvider'
import useLeafletWindow from './useLeafletWindow'
import useMapContext from './useMapContext'
import useMarker from './useMarker'

const CenterToMarkerButton = dynamic(async () => (await import('./ui/CenterButton')).CenterButton, {
  ssr: false,
})
const CustomMarker = dynamic(async () => (await import('./ui/CustomMarker')).CustomMarker, {
  ssr: false,
})
const LeafletMap = dynamic(async () => (await import('./LeafletMap')).LeafletMap, {
  ssr: false,
})

const MapInner = () => {
  const { map } = useMapContext()
  const leafletWindow = useLeafletWindow()
  const { markerCenterPos, markerMinZoom } = useMarker({
    locations: Places,
    map,
  })
  const isLoading = !map || !leafletWindow

  // center/zoom map based on markers locations
  useEffect(() => {
    if (map && leafletWindow) {
      map.flyTo(markerCenterPos, markerMinZoom, { animate: false })
      map.setMinZoom(markerMinZoom)
    }
  }, [map, leafletWindow])

  return (
    <>
      <MapTopBar />
      <LeafletMap center={markerCenterPos} zoom={markerMinZoom} maxZoom={AppConfig.maxZoom}>
        {!isLoading ? (
          <>
            <CenterToMarkerButton center={markerCenterPos} zoom={markerMinZoom} />
            {Places.map(item => (
              <CustomMarker key={(item.position as number[]).join('')} position={item.position} />
            ))}
          </>
        ) : (
          <>l</>
        )}
      </LeafletMap>
    </>
  )
}

const Map = () => (
  <MapContextProvider>
    <MapInner />
  </MapContextProvider>
)

export default Map
