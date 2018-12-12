package com.tns.gen.com.mapbox.mapboxsdk.maps;

public class OnMapReadyCallback implements com.mapbox.mapboxsdk.maps.OnMapReadyCallback {
	public OnMapReadyCallback() {
		com.tns.Runtime.initInstance(this);
	}

	public void onMapReady(com.mapbox.mapboxsdk.maps.MapboxMap param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onMapReady", void.class, args);
	}

}
