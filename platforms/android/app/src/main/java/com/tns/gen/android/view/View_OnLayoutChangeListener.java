package com.tns.gen.android.view;

public class View_OnLayoutChangeListener implements android.view.View.OnLayoutChangeListener {
	public View_OnLayoutChangeListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onLayoutChange(android.view.View param_0, int param_1, int param_2, int param_3, int param_4, int param_5, int param_6, int param_7, int param_8)  {
		java.lang.Object[] args = new java.lang.Object[9];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		args[3] = param_3;
		args[4] = param_4;
		args[5] = param_5;
		args[6] = param_6;
		args[7] = param_7;
		args[8] = param_8;
		com.tns.Runtime.callJSMethod(this, "onLayoutChange", void.class, args);
	}

}
