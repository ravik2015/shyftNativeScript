package com.tns.gen.com.mapbox.mapboxsdk.maps;

public class MapboxMap_OnCameraMoveCanceledListener implements com.mapbox.mapboxsdk.maps.MapboxMap.OnCameraMoveCanceledListener {
	public MapboxMap_OnCameraMoveCanceledListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onCameraMoveCanceled()  {
		java.lang.Object[] args = null;
		com.tns.Runtime.callJSMethod(this, "onCameraMoveCanceled", void.class, args);
	}

}
