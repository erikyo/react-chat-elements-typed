// Map.tsx
import type React from "react";
import type { FC } from "react";
import { useState } from "react";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	useMap,
	useMapEvents,
} from "react-leaflet";
import L, { type LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { ILocationMessageProps } from "../types";

export const markerIcon = L.icon({
	iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
	shadowSize: [41, 41],
});

export const CustomMarker: React.FC<{
	position: L.LatLngExpression;
	children: React.ReactNode;
}> = ({ position, children }) => {
	const map = useMap();

	return (
		<Marker position={position} icon={markerIcon}>
			{children}
		</Marker>
	);
};

export const MapElement: FC<ILocationMessageProps> = (props) => {
	const { latitude, longitude, zoom } = props;
	function LocationMarker() {
		const [position, setPosition] = useState<LatLng | null>(null);
		const map = useMapEvents({
			click(e: L.LeafletMouseEvent) {
				setPosition(e.latlng);
				map.flyTo(e.latlng, map.getZoom());
			},
		});

		return position === null ? null : (
			<CustomMarker position={position}>
				<Popup>You clicked here</Popup>
			</CustomMarker>
		);
	}

	return (
		<MapContainer
			center={[Number.parseFloat(latitude), Number.parseFloat(longitude)]}
			zoom={Number(zoom)}
			scrollWheelZoom={false}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<LocationMarker />
		</MapContainer>
	);
};
