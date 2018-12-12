package com.tns.gen.com.telerik.widget.calendar;

public class RadCalendarView_OnSelectedDatesChangedListener implements com.telerik.widget.calendar.RadCalendarView.OnSelectedDatesChangedListener {
	public RadCalendarView_OnSelectedDatesChangedListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onSelectedDatesChanged(com.telerik.widget.calendar.RadCalendarView.SelectionContext param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onSelectedDatesChanged", void.class, args);
	}

}
