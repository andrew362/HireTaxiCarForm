import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker } from 'react-google-maps';
import Geocode from 'react-geocode';
import Autocomplete from 'react-google-autocomplete';
const API_KEY = 'AIzaSyBh6LOD-m7USoYP6uLED_CDwVlmNvZErZc';
Geocode.setApiKey(API_KEY);
Geocode.enableDebug();

class Map extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			mapActive: false,
			address: '',
			city: '',
			area: '',
			state: '',
			mapPosition: {
				lat: 52.2297684,
				lng: 21.0107907
			},
			markerPosition: {
				lat: 52.2297684,
				lng: 21.0107907
			}
		};
	}

	componentDidMount() {
		Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
			response => {
				const address = response.results[0].formatted_address,
					addressArray = response.results[0].address_components,
					city = this.getCity(addressArray),
					area = this.getArea(addressArray),
					state = this.getState(addressArray);

				this.setState({
					address: address ? address : '',
					area: area ? area : '',
					city: city ? city : '',
					state: state ? state : ''
				});
			},
			error => {
				console.error(error);
			}
		);
	}

	shouldComponentUpdate(nextProps, nextState) {
		if (
			this.state.address !== nextState.address ||
			this.state.city !== nextState.city ||
			this.state.area !== nextState.area ||
			this.state.state !== nextState.state
		) {
			return true;
		} else if (this.state.markerPosition.lat === nextState.markerPosition.lat) {
			return false;
		}
	}

	getCity = addressArray => {
		let city = '';
		for (let i = 0; i < addressArray.length; i++) {
			if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
				city = addressArray[i].long_name;
				return city;
			}
		}
	};

	getArea = addressArray => {
		let area = '';
		for (let i = 0; i < addressArray.length; i++) {
			if (addressArray[i].types[0]) {
				for (let j = 0; j < addressArray[i].types.length; j++) {
					if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
						area = addressArray[i].long_name;
						return area;
					}
				}
			}
		}
	};

	getState = addressArray => {
		let state = '';
		for (let i = 0; i < addressArray.length; i++) {
			for (let i = 0; i < addressArray.length; i++) {
				if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
					state = addressArray[i].long_name;
					return state;
				}
			}
		}
	};

	onChange = event => {
		this.setState({ [event.target.name]: event.target.value });
	};

	onInfoWindowClose = event => {};

	onPlaceSelected = place => {
		if (place.formatted_address) {
			const address = place.formatted_address,
				addressArray = place.address_components,
				city = this.getCity(addressArray),
				area = this.getArea(addressArray),
				state = this.getState(addressArray),
				latValue = place.geometry.location.lat(),
				lngValue = place.geometry.location.lng();

			this.setState(
				{
					address: address ? address : '',
					area: area ? area : '',
					city: city ? city : '',
					state: state ? state : '',
					mapActive: true,
					markerPosition: {
						lat: latValue,
						lng: lngValue
					},
					mapPosition: {
						lat: latValue,
						lng: lngValue
					}
				},
				() => this.props.mapChangeHandler(this.state)
			);
		}
	};

	onMarkerDragEnd = event => {
		console.log('event', event);
		let newLat = event.latLng.lat(),
			newLng = event.latLng.lng();
		Geocode.fromLatLng(newLat, newLng).then(
			response => {
				const address = response.results[0].formatted_address,
					addressArray = response.results[0].address_components,
					city = this.getCity(addressArray),
					area = this.getArea(addressArray),
					state = this.getState(addressArray);
				this.setState(
					{
						address: address ? address : '',
						area: area ? area : '',
						city: city ? city : '',
						state: state ? state : '',
						mapPosition: {
							lat: response.results[0].geometry.location.lat,
							lng: response.results[0].geometry.location.lng
						},
						markerPosition: {
							lat: response.results[0].geometry.location.lat,
							lng: response.results[0].geometry.location.lng
						}
					},
					() => this.props.mapChangeHandler(this.state)
				);
			},
			error => {
				console.error(error);
			}
		);
	};

	createMapOptions = () => {
		return {
			panControl: false,
			mapTypeControl: false,
			streetViewControl: false,
			fullscreenControl: false,
			scrollwheel: false,
			styles: [{ stylers: [{ saturation: -100 }, { gamma: 0.8 }, { lightness: 4 }, { visibility: 'on' }] }]
		};
	};

	render() {
		const AsyncMap = withScriptjs(
			withGoogleMap(props => (
				<GoogleMap
					options={this.createMapOptions()}
					google={this.props.google}
					defaultZoom={this.props.zoom}
					defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
				>
					<Autocomplete
						className='autocomplete'
						style={{
							color: 'black',
							width: '100%',
							height: '40px',
							paddingLeft: '16px',
							marginTop: '2px',
							marginBottom: '100px'
						}}
						onPlaceSelected={this.onPlaceSelected}
						types={['geocode', 'establishment']}
					/>

					<Marker
						google={this.props.google}
						draggable={true}
						onDragEnd={this.onMarkerDragEnd}
						position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
					/>
					<Marker />

					<InfoWindow
						onClose={this.onInfoWindowClose}
						position={{ lat: this.state.markerPosition.lat + 0.0018, lng: this.state.markerPosition.lng }}
					>
						<div>
							<span style={{ color: 'black', padding: 0, margin: 0 }}>{this.state.address}</span>
						</div>
					</InfoWindow>
				</GoogleMap>
			))
		);
		let map;
		if (this.state.markerPosition.lat !== undefined) {
			map = (
				<div className={this.state.mapActive ? 'map active' : 'map deactive'}>
					<AsyncMap
						googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`}
						loadingElement={<div style={{ height: `100%` }} />}
						containerElement={<div style={{ height: this.props.height }} />}
						mapElement={<div style={{ height: `100%` }} />}
					/>
				</div>
			);
		} else {
			map = <div style={{ height: this.props.height }} />;
		}
		return map;
	}
}
export default Map;
