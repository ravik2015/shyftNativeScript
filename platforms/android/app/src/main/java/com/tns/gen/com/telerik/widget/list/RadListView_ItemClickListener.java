package com.tns.gen.com.telerik.widget.list;

public class RadListView_ItemClickListener implements com.telerik.widget.list.RadListView.ItemClickListener {
	public RadListView_ItemClickListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onItemClick(int param_0, android.view.MotionEvent param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onItemClick", void.class, args);
	}

	public void onItemLongClick(int param_0, android.view.MotionEvent param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onItemLongClick", void.class, args);
	}

}
