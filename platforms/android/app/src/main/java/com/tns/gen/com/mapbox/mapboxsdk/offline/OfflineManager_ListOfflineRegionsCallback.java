package com.tns.gen.com.mapbox.mapboxsdk.offline;

public class OfflineManager_ListOfflineRegionsCallback implements com.mapbox.mapboxsdk.offline.OfflineManager.ListOfflineRegionsCallback {
	public OfflineManager_ListOfflineRegionsCallback() {
		com.tns.Runtime.initInstance(this);
	}

	public void onList(com.mapbox.mapboxsdk.offline.OfflineRegion[] param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onList", void.class, args);
	}

	public void onError(java.lang.String param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onError", void.class, args);
	}

}
