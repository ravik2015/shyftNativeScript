package com.tns.gen.android.widget;

public class BaseExpandableListAdapter_frnal_ts_helpers_l58_c38__AccordionListAdapter extends android.widget.BaseExpandableListAdapter implements com.tns.NativeScriptHashCodeProvider {
	public BaseExpandableListAdapter_frnal_ts_helpers_l58_c38__AccordionListAdapter(){
		super();
		com.tns.Runtime.initInstance(this);
	}

	public java.lang.Object getChild(int param_0, int param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		return (java.lang.Object)com.tns.Runtime.callJSMethod(this, "getChild", java.lang.Object.class, args);
	}

	public java.lang.Object getGroup(int param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		return (java.lang.Object)com.tns.Runtime.callJSMethod(this, "getGroup", java.lang.Object.class, args);
	}

	public boolean hasStableIds()  {
		java.lang.Object[] args = null;
		return (boolean)com.tns.Runtime.callJSMethod(this, "hasStableIds", boolean.class, args);
	}

	public android.view.View getGroupView(int param_0, boolean param_1, android.view.View param_2, android.view.ViewGroup param_3)  {
		java.lang.Object[] args = new java.lang.Object[4];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		args[3] = param_3;
		return (android.view.View)com.tns.Runtime.callJSMethod(this, "getGroupView", android.view.View.class, args);
	}

	public int getGroupCount()  {
		java.lang.Object[] args = null;
		return (int)com.tns.Runtime.callJSMethod(this, "getGroupCount", int.class, args);
	}

	public long getGroupId(int param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		return (long)com.tns.Runtime.callJSMethod(this, "getGroupId", long.class, args);
	}

	public android.view.View getChildView(int param_0, int param_1, boolean param_2, android.view.View param_3, android.view.ViewGroup param_4)  {
		java.lang.Object[] args = new java.lang.Object[5];
		args[0] = param_0;
		args[1] = param_1;
		args[2] = param_2;
		args[3] = param_3;
		args[4] = param_4;
		return (android.view.View)com.tns.Runtime.callJSMethod(this, "getChildView", android.view.View.class, args);
	}

	public long getChildId(int param_0, int param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		return (long)com.tns.Runtime.callJSMethod(this, "getChildId", long.class, args);
	}

	public int getChildrenCount(int param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		return (int)com.tns.Runtime.callJSMethod(this, "getChildrenCount", int.class, args);
	}

	public boolean isChildSelectable(int param_0, int param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		return (boolean)com.tns.Runtime.callJSMethod(this, "isChildSelectable", boolean.class, args);
	}

	public boolean equals__super(java.lang.Object other) {
		return super.equals(other);
	}

	public int hashCode__super() {
		return super.hashCode();
	}

}
