"use strict";

app.service("$session", function() {
    this.get = function(key) {
        return localStorage.getItem(key);
    },

    this.set = this.put = function(key,value) {
        return localStorage.setItem(key,value);
    },

    this.remove = function(key) {
        return localStorage.removeItem(key);
    },

    this.removeAll = function() {
        return localStorage.clear();
    }
});
