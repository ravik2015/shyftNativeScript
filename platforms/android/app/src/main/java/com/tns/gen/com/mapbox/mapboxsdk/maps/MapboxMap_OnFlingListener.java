package com.tns.gen.com.mapbox.mapboxsdk.maps;

public class MapboxMap_OnFlingListener implements com.mapbox.mapboxsdk.maps.MapboxMap.OnFlingListener {
	public MapboxMap_OnFlingListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onFling()  {
		java.lang.Object[] args = null;
		com.tns.Runtime.callJSMethod(this, "onFling", void.class, args);
	}

}
