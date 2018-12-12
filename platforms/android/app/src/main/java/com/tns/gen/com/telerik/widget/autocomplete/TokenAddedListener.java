package com.tns.gen.com.telerik.widget.autocomplete;

public class TokenAddedListener implements com.telerik.widget.autocomplete.TokenAddedListener {
	public TokenAddedListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onTokenAdded(com.telerik.widget.autocomplete.RadAutoCompleteTextView param_0, com.telerik.widget.autocomplete.TokenModel param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onTokenAdded", void.class, args);
	}

}
