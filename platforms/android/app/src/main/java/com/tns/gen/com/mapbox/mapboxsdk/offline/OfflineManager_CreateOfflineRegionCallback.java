package com.tns.gen.com.mapbox.mapboxsdk.offline;

public class OfflineManager_CreateOfflineRegionCallback implements com.mapbox.mapboxsdk.offline.OfflineManager.CreateOfflineRegionCallback {
	public OfflineManager_CreateOfflineRegionCallback() {
		com.tns.Runtime.initInstance(this);
	}

	public void onCreate(com.mapbox.mapboxsdk.offline.OfflineRegion param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onCreate", void.class, args);
	}

	public void onError(java.lang.String param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onError", void.class, args);
	}

}
