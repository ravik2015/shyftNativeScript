package com.tns.gen.com.telerik.widget.autocomplete;

public class ShowSuggestionListListener implements com.telerik.widget.autocomplete.ShowSuggestionListListener {
	public ShowSuggestionListListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onShowSuggestionList(com.telerik.widget.autocomplete.RadAutoCompleteTextView param_0, java.util.List param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onShowSuggestionList", void.class, args);
	}

}
