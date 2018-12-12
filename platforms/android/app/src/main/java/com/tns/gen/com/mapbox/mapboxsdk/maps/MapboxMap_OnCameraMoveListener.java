package com.tns.gen.com.mapbox.mapboxsdk.maps;

public class MapboxMap_OnCameraMoveListener implements com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraMoveListener {
	public MapboxMap_OnCameraMoveListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onCameraMove()  {
		java.lang.Object[] args = null;
		com.tns.Runtime.callJSMethod(this, "onCameraMove", void.class, args);
	}

}
