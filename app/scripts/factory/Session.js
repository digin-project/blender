"use strict";

app.factory("Session", function(API, $http, $session) {
	return {
		isAuth : function() {
			var _token = $session.get('token');
			return $http.post(API.HOST + '/isauth', { token : _token });
		}
	}
});
