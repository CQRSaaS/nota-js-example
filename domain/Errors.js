function ValidationFailed(message) {
    this.name = "ValidationFailed";
    this.message = (message || "");
    this.code = "400";
}
ValidationFailed.prototype = Error.prototype;
module.exports.ValidationFailed = ValidationFailed;