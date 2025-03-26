import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { LatLngTuple } from 'leaflet';

// Fix for default marker icon issue in React Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom Icons
const createCustomIcon = (iconUrl: string, iconSize: [number, number]) => {
  return L.icon({
    iconUrl,
    iconSize,
    iconAnchor: [iconSize[0] / 2, iconSize[1]],
    popupAnchor: [0, -iconSize[1]],
  });
};

const parkIcon = createCustomIcon('https://cdn-icons-png.flaticon.com/512/1186/1186470.png', [32, 32]);
const gymIcon = createCustomIcon('https://cdn-icons-png.flaticon.com/512/2936/2936886.png', [32, 32]);
const marketIcon = createCustomIcon('https://cdn-icons-png.flaticon.com/512/869/869636.png', [32, 32]);
const eventIcon = createCustomIcon('https://cdn-icons-png.flaticon.com/512/2921/2921222.png', [32, 32]);

// Resource types
type ResourceType = 'park' | 'gym' | 'market' | 'event';

// Resource location data
interface Resource {
  id: number;
  name: string;
  position: LatLngTuple;
  description: string;
  type: ResourceType;
  address: string;
  distance?: string;
}

// Setting up default resources
const defaultResources: Resource[] = [
  {
    id: 1,
    name: "Central Park",
    position: [37.7749, -122.4194],
    description: "Large urban park with walking trails, playgrounds, and open spaces.",
    type: "park",
    address: "101 Park Ave, San Francisco, CA"
  },
  {
    id: 2,
    name: "Fitness Center Plus",
    position: [37.7800, -122.4158],
    description: "Modern gym with cardio equipment, weights, and fitness classes.",
    type: "gym",
    address: "250 Montgomery St, San Francisco, CA"
  },
  {
    id: 3,
    name: "Weekend Farmers Market",
    position: [37.7735, -122.4212],
    description: "Fresh local produce, organic foods, and artisanal products.",
    type: "market",
    address: "Ferry Building, San Francisco, CA",
    distance: "0.8 miles"
  },
  {
    id: 4,
    name: "Community Yoga in the Park",
    position: [37.7775, -122.4183],
    description: "Free community yoga sessions every Saturday morning.",
    type: "event",
    address: "Mission Dolores Park, San Francisco, CA",
    distance: "1.2 miles"
  },
  {
    id: 5,
    name: "Green Hills Park",
    position: [37.7825, -122.4120],
    description: "Scenic park with running trails and sports facilities.",
    type: "park",
    address: "750 Howard St, San Francisco, CA",
    distance: "1.5 miles"
  },
  {
    id: 6,
    name: "Strong Bodies Gym",
    position: [37.7710, -122.4170],
    description: "Family-friendly fitness center with personal training options.",
    type: "gym",
    address: "180 New Montgomery St, San Francisco, CA",
    distance: "0.9 miles"
  },
  {
    id: 7,
    name: "Organic Foods Market",
    position: [37.7790, -122.4250],
    description: "Specialty grocery store focusing on organic and local products.",
    type: "market",
    address: "2001 Market St, San Francisco, CA",
    distance: "1.7 miles"
  },
  {
    id: 8,
    name: "Health Fair",
    position: [37.7815, -122.4222],
    description: "Annual health fair with free screenings and wellness information.",
    type: "event",
    address: "Civic Center Plaza, San Francisco, CA",
    distance: "0.6 miles"
  }
];

interface MapComponentProps {
  height?: string;
  width?: string;
  center?: LatLngTuple;
  zoom?: number;
  showResourceTypes?: ResourceType[];
}

export default function MapComponent({ 
  height = "400px", 
  width = "100%", 
  center = [37.7749, -122.4194], 
  zoom = 13,
  showResourceTypes = ['park', 'gym', 'market', 'event']
}: MapComponentProps) {
  const [resources, setResources] = useState<Resource[]>(defaultResources);

  // Filter resources based on the types to show
  const filteredResources = resources.filter(resource => 
    showResourceTypes.includes(resource.type)
  );

  const getIcon = (type: ResourceType) => {
    switch(type) {
      case 'park': return parkIcon;
      case 'gym': return gymIcon;
      case 'market': return marketIcon;
      case 'event': return eventIcon;
      default: return new L.Icon.Default();
    }
  };

  return (
    <div style={{ height, width }}>
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {filteredResources.map((resource) => (
          <Marker 
            key={resource.id} 
            position={resource.position}
            icon={getIcon(resource.type)}
          >
            <Popup>
              <div>
                <h3 className="text-lg font-medium">{resource.name}</h3>
                <p className="text-sm text-neutral-600">{resource.description}</p>
                <p className="text-xs mt-1"><strong>Address:</strong> {resource.address}</p>
                {resource.distance && (
                  <p className="text-xs"><strong>Distance:</strong> {resource.distance}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}