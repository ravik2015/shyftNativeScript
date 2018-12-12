package com.tns.gen.com.telerik.widget.calendar.dayview;

public class CalendarDayView_EventViewTapListener implements com.telerik.widget.calendar.dayview.CalendarDayView.EventViewTapListener {
	public CalendarDayView_EventViewTapListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onEventViewTap(com.telerik.widget.calendar.events.Event param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onEventViewTap", void.class, args);
	}

}
