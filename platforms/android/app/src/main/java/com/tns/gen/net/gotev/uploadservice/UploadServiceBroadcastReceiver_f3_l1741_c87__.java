package com.tns.gen.net.gotev.uploadservice;

public class UploadServiceBroadcastReceiver_f3_l1741_c87__ extends net.gotev.uploadservice.UploadServiceBroadcastReceiver implements com.tns.NativeScriptHashCodeProvider {
	public UploadServiceBroadcastReceiver_f3_l1741_c87__(){
		super();
		com.tns.Runtime.initInstance(this);
	}

	public void onProgress(android.content.Context param_0, net.gotev.uploadservice.UploadInfo param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onProgress", void.class, args);
	}

	public void onCancelled(android.content.Context param_0, net.gotev.uploadservice.UploadInfo param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onCancelled", void.class, args);
	}

	public void onError(android.content.Context param_0, net.gotev.uploadservice.UploadInfo param_1, net.gotev.uploadservice.ServerResponse param_2, java.lang.Exception param_3)  {
		java.lang.Object[] args = new java.lang.Object[4];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		args[3] = param_3;
		com.tns.Runtime.callJSMethod(this, "onError", void.class, args);
	}

	public void onCompleted(android.content.Context param_0, net.gotev.uploadservice.UploadInfo param_1, net.gotev.uploadservice.ServerResponse param_2)  {
		java.lang.Object[] args = new java.lang.Object[3];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		com.tns.Runtime.callJSMethod(this, "onCompleted", void.class, args);
	}

	public boolean equals__super(java.lang.Object other) {
		return super.equals(other);
	}

	public int hashCode__super() {
		return super.hashCode();
	}

}
