"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialsError = exports.ValueError = exports.VoidError = exports.DuplicityError = exports.UnexistenceError = void 0;
class UnexistenceError extends Error {
    constructor(message) {
        super(message);
        this.name = "UnexistenceError";
    }
}
exports.UnexistenceError = UnexistenceError;
class DuplicityError extends Error {
    constructor(message) {
        super(message);
        this.name = "DuplicityError";
    }
}
exports.DuplicityError = DuplicityError;
class VoidError extends Error {
    constructor(message) {
        super(message);
        this.name = "VoidError";
    }
}
exports.VoidError = VoidError;
class ValueError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValueError";
    }
}
exports.ValueError = ValueError;
class CredentialsError extends Error {
    constructor(message) {
        super(message);
        this.name = "CredentialsError";
    }
}
exports.CredentialsError = CredentialsError;
