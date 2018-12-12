package com.tns.gen.com.telerik.widget.calendar;

public class RadCalendarView_OnDisplayModeChangedListener implements com.telerik.widget.calendar.RadCalendarView.OnDisplayModeChangedListener {
	public RadCalendarView_OnDisplayModeChangedListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onDisplayModeChanged(com.telerik.widget.calendar.CalendarDisplayMode param_0, com.telerik.widget.calendar.CalendarDisplayMode param_1)  {
		java.lang.Object[] args = new java.lang.Object[2];
		args[0] = param_0;
		args[1] = param_1;
		com.tns.Runtime.callJSMethod(this, "onDisplayModeChanged", void.class, args);
	}

}
