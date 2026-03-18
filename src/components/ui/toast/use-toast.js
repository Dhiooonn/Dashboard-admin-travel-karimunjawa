var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { computed, ref } from "vue";
var TOAST_LIMIT = 1;
var TOAST_REMOVE_DELAY = 1000000;
var actionTypes = {
    ADD_TOAST: "ADD_TOAST",
    UPDATE_TOAST: "UPDATE_TOAST",
    DISMISS_TOAST: "DISMISS_TOAST",
    REMOVE_TOAST: "REMOVE_TOAST",
};
var count = 0;
function genId() {
    count = (count + 1) % Number.MAX_VALUE;
    return count.toString();
}
var toastTimeouts = new Map();
function addToRemoveQueue(toastId) {
    if (toastTimeouts.has(toastId))
        return;
    var timeout = setTimeout(function () {
        toastTimeouts.delete(toastId);
        dispatch({
            type: actionTypes.REMOVE_TOAST,
            toastId: toastId,
        });
    }, TOAST_REMOVE_DELAY);
    toastTimeouts.set(toastId, timeout);
}
var state = ref({
    toasts: [],
});
function dispatch(action) {
    switch (action.type) {
        case actionTypes.ADD_TOAST:
            state.value.toasts = __spreadArray([action.toast], state.value.toasts, true).slice(0, TOAST_LIMIT);
            break;
        case actionTypes.UPDATE_TOAST:
            state.value.toasts = state.value.toasts.map(function (t) {
                return t.id === action.toast.id ? __assign(__assign({}, t), action.toast) : t;
            });
            break;
        case actionTypes.DISMISS_TOAST: {
            var toastId_1 = action.toastId;
            if (toastId_1) {
                addToRemoveQueue(toastId_1);
            }
            else {
                state.value.toasts.forEach(function (toast) {
                    addToRemoveQueue(toast.id);
                });
            }
            state.value.toasts = state.value.toasts.map(function (t) {
                return t.id === toastId_1 || toastId_1 === undefined
                    ? __assign(__assign({}, t), { open: false }) : t;
            });
            break;
        }
        case actionTypes.REMOVE_TOAST:
            if (action.toastId === undefined)
                state.value.toasts = [];
            else
                state.value.toasts = state.value.toasts.filter(function (t) { return t.id !== action.toastId; });
            break;
    }
}
function useToast() {
    return {
        toasts: computed(function () { return state.value.toasts; }),
        toast: toast,
        dismiss: function (toastId) { return dispatch({ type: actionTypes.DISMISS_TOAST, toastId: toastId }); },
    };
}
function toast(props) {
    var id = genId();
    var update = function (props) {
        return dispatch({
            type: actionTypes.UPDATE_TOAST,
            toast: __assign(__assign({}, props), { id: id }),
        });
    };
    var dismiss = function () { return dispatch({ type: actionTypes.DISMISS_TOAST, toastId: id }); };
    dispatch({
        type: actionTypes.ADD_TOAST,
        toast: __assign(__assign({}, props), { id: id, open: true, onOpenChange: function (open) {
                if (!open)
                    dismiss();
            } }),
    });
    return {
        id: id,
        dismiss: dismiss,
        update: update,
    };
}
export { toast, useToast };
