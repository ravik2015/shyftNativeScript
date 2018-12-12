package com.tns.gen.com.mapbox.mapboxsdk.maps;

public class MapboxMap_OnInfoWindowClickListener implements com.mapbox.mapboxsdk.maps.MapboxMap.OnInfoWindowClickListener {
	public MapboxMap_OnInfoWindowClickListener() {
		com.tns.Runtime.initInstance(this);
	}

	public boolean onInfoWindowClick(com.mapbox.mapboxsdk.annotations.Marker param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		return (boolean)com.tns.Runtime.callJSMethod(this, "onInfoWindowClick", boolean.class, args);
	}

}
