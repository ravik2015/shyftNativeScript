package com.tns.gen.com.shripalsoni.natiescriptwebviewinterface;

public class WebViewInterface_f13_l1137_c96__ extends com.shripalsoni.natiescriptwebviewinterface.WebViewInterface implements com.tns.NativeScriptHashCodeProvider {
	public WebViewInterface_f13_l1137_c96__(java.lang.String param_0){
		super(param_0);
		com.tns.Runtime.initInstance(this);
	}

	public void onWebViewEvent(java.lang.String param_0, java.lang.String param_1, java.lang.String param_2)  {
		java.lang.Object[] args = new java.lang.Object[3];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		com.tns.Runtime.callJSMethod(this, "onWebViewEvent", void.class, args);
	}

	public boolean equals__super(java.lang.Object other) {
		return super.equals(other);
	}

	public int hashCode__super() {
		return super.hashCode();
	}

}
