package com.tns.gen.com.mapbox.mapboxsdk.offline;

public class OfflineRegion_OfflineRegionObserver implements com.mapbox.mapboxsdk.offline.OfflineRegion.OfflineRegionObserver {
	public OfflineRegion_OfflineRegionObserver() {
		com.tns.Runtime.initInstance(this);
	}

	public void onStatusChanged(com.mapbox.mapboxsdk.offline.OfflineRegionStatus param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onStatusChanged", void.class, args);
	}

	public void onError(com.mapbox.mapboxsdk.offline.OfflineRegionError param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onError", void.class, args);
	}

	public void mapboxTileCountLimitExceeded(long param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "mapboxTileCountLimitExceeded", void.class, args);
	}

}
