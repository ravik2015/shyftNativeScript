package com.tns.gen.com.mapbox.mapboxsdk.maps;

public class MapboxMap_OnMarkerClickListener implements com.mapbox.mapboxsdk.maps.MapboxMap.OnMarkerClickListener {
	public MapboxMap_OnMarkerClickListener() {
		com.tns.Runtime.initInstance(this);
	}

	public boolean onMarkerClick(com.mapbox.mapboxsdk.annotations.Marker param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		return (boolean)com.tns.Runtime.callJSMethod(this, "onMarkerClick", boolean.class, args);
	}

}
