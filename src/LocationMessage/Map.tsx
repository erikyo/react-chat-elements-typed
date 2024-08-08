// Map.tsx
import type React from "react";
import type { FC } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { ILocationMessageProps } from "../types";
import L, { type LatLngExpression } from "leaflet";

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
	return (
		<Marker position={position} icon={markerIcon}>
			{children}
		</Marker>
	);
};

export const MapElement: FC<ILocationMessageProps> = (props) => {
	const { latitude, longitude, zoom } = props;

	function LocationMarker(props: ILocationMessageProps["marker"] | undefined) {
		if (!props) {
			return null;
		}
		const { latLng, markerText, markerColor } = props;
		return latLng ? (
			<Marker position={latLng as LatLngExpression} icon={markerIcon}>
				<Popup>{markerText}</Popup>
			</Marker>
		) : null;
	}

	return (
		<MapContainer
			center={[latitude, longitude]}
			zoom={zoom}
			scrollWheelZoom={false}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{props.marker && <LocationMarker {...props.marker} />}
		</MapContainer>
	);
};
