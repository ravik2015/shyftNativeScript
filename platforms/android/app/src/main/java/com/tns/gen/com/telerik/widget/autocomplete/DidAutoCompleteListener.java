package com.tns.gen.com.telerik.widget.autocomplete;

public class DidAutoCompleteListener implements com.telerik.widget.autocomplete.DidAutoCompleteListener {
	public DidAutoCompleteListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onDidAutoComplete(com.telerik.widget.autocomplete.RadAutoCompleteTextView param_0, java.lang.String param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onDidAutoComplete", void.class, args);
	}

}
