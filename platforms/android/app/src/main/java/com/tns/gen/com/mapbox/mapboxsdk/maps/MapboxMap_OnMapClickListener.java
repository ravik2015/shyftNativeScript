package com.tns.gen.com.mapbox.mapboxsdk.maps;

public class MapboxMap_OnMapClickListener implements com.mapbox.mapboxsdk.maps.MapboxMap.OnMapClickListener {
	public MapboxMap_OnMapClickListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onMapClick(com.mapbox.mapboxsdk.geometry.LatLng param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onMapClick", void.class, args);
	}

}
