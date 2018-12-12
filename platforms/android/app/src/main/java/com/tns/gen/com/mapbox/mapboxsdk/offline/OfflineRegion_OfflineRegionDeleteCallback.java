package com.tns.gen.com.mapbox.mapboxsdk.offline;

public class OfflineRegion_OfflineRegionDeleteCallback implements com.mapbox.mapboxsdk.offline.OfflineRegion.OfflineRegionDeleteCallback {
	public OfflineRegion_OfflineRegionDeleteCallback() {
		com.tns.Runtime.initInstance(this);
	}

	public void onDelete()  {
		java.lang.Object[] args = null;
		com.tns.Runtime.callJSMethod(this, "onDelete", void.class, args);
	}

	public void onError(java.lang.String param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onError", void.class, args);
	}

}
