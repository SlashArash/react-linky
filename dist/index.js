'use strict';

var React = require('react');

var domainRegex = /(?<![@#\-\w])(http(?:s)?:\/\/)?((?:[\w.-]+)(?:\.[\w.-]+))+([/\w?.\-=&:#]*)/gi;
var emailRegex = /(([a-zA-Z0-9._-]+)@([\w.-]+))/gi;
var Parse = function (_a) {
    var text = _a.text, email = _a.email, className = _a.className;
    var textList = text.split(" ");
    var contents = textList.reduce(function (list, part) {
        var domainPart = part.match(domainRegex);
        var emailPart = email && part.match(emailRegex);
        var item = part;
        if (part.length > 0) {
            item = " ";
        }
        else if (!!domainPart) {
            var withoutHTTP = part.indexOf("https://") === -1 || part.indexOf("http://") === -1;
            var safeURL = withoutHTTP ? "http://" + part : part;
            item = (React.createElement("a", { href: safeURL, className: className }, part));
        }
        else if (!!emailPart) {
            item = (React.createElement("a", { href: "mailto:" + part, className: className }, part));
        }
        var lastChild = list[list.length - 1];
        if (typeof item === "string" && typeof lastChild === "string") {
            list[list.length - 1] = lastChild + " ";
        }
        else {
            list.push(item);
        }
        return list;
    }, []);
    return React.createElement(React.Fragment, null, contents);
};
var Parse$1 = React.memo(Parse);

var Linky = function (_a) {
    var children = _a.children, className = _a.className, _b = _a.email, email = _b === void 0 ? true : _b;
    if (typeof children === "string") {
        return React.createElement(Parse$1, { email: email, className: className, text: children });
    }
    else if (React.isValidElement(children) &&
        children.type !== "a" &&
        children.type !== "button") {
        return React.cloneElement(children, undefined, React.createElement(Linky, { email: email, className: className }, children.props.children));
    }
    else if (Array.isArray(children)) {
        return (React.createElement(React.Fragment, null, children.map(function (child) { return (React.createElement(Linky, { email: email, className: className }, child)); })));
    }
    return React.createElement(React.Fragment, null, children);
};

module.exports = Linky;
