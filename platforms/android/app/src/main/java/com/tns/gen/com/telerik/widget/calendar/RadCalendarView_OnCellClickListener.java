package com.tns.gen.com.telerik.widget.calendar;

public class RadCalendarView_OnCellClickListener implements com.telerik.widget.calendar.RadCalendarView.OnCellClickListener {
	public RadCalendarView_OnCellClickListener() {
		com.tns.Runtime.initInstance(this);
	}

	public void onCellClick(com.telerik.widget.calendar.CalendarCell param_0)  {
		java.lang.Object[] args = new java.lang.Object[1];
		args[0] = param_0;
		com.tns.Runtime.callJSMethod(this, "onCellClick", void.class, args);
	}

}
