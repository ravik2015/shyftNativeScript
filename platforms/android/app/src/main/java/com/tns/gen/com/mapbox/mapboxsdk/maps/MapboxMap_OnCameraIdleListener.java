package com.tns.gen.com.mapbox.mapboxsdk.maps;

public class MapboxMap_OnCameraIdleListener implements com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraIdleListener {
	public MapboxMap_OnCameraIdleListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onCameraIdle()  {
		java.lang.Object[] args = null;
		com.tns.Runtime.callJSMethod(this, "onCameraIdle", void.class, args);
	}

}
