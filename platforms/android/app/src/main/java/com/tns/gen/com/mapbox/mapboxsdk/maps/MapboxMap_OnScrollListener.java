package com.tns.gen.com.mapbox.mapboxsdk.maps;

public class MapboxMap_OnScrollListener implements com.mapbox.mapboxsdk.maps.MapboxMap.OnScrollListener {
	public MapboxMap_OnScrollListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onScroll()  {
		java.lang.Object[] args = null;
		com.tns.Runtime.callJSMethod(this, "onScroll", void.class, args);
	}

}
