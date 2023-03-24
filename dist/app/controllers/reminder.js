"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var StatusCodes = require('http-status-codes').StatusCodes;
var db = require('../models');
var Reminder = db.reminder;
var createReminder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reminder;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Validate request
                if (!req.body.user) {
                    res.status(StatusCodes.BAD_REQUEST).send({
                        message: 'Content can not be empty!',
                    });
                    return [2 /*return*/];
                }
                reminder = {
                    user: req.body.user,
                    description: req.body.description,
                };
                return [4 /*yield*/, Reminder.create(reminder)
                        .then(function (data) {
                        res.status(StatusCodes.CREATED).send(data);
                    })
                        .catch(function (err) {
                        next(err);
                        res.status(500).send({
                            Message: err.message || 'Something went wrong',
                        });
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
// Retrieve all Reminders
var getAllReminder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var reminders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Reminder.findAll({})];
            case 1:
                reminders = _a.sent();
                res.status(StatusCodes.OK).json(reminders);
                return [2 /*return*/];
        }
    });
}); };
// Retrieve single Reminders
var getReminder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, reminders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, Reminder.findOne({ where: { id: id } })];
            case 1:
                reminders = _a.sent();
                console.log(reminders, 'reminder');
                if (!reminders) {
                    return [2 /*return*/, res
                            .status(StatusCodes.NOT_FOUND)
                            .json({ message: "No Reminders with id ".concat(id) })];
                }
                res.status(200).json(reminders);
                return [2 /*return*/];
        }
    });
}); };
//Up reminder
var updateReminder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, reminder;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, Reminder.update(req.body, { where: { id: id } })];
            case 1:
                reminder = _a.sent();
                res.status(StatusCodes.OK).json(reminder);
                return [2 /*return*/];
        }
    });
}); };
//Delete Reminder
var deleteReminder = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var id, reminder;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, Reminder.destroy({ where: { id: id } })];
            case 1:
                reminder = _a.sent();
                if (!reminder.length) {
                    return [2 /*return*/, res
                            .status(StatusCodes.NOT_FOUND)
                            .json({ message: "No Reminders with id ".concat(id) })];
                }
                res.status(StatusCodes.OK).send({ message: 'reminder deleted successfully' });
                return [2 /*return*/];
        }
    });
}); };
module.exports = {
    createReminder: createReminder,
    getAllReminder: getAllReminder,
    getReminder: getReminder,
    updateReminder: updateReminder,
    deleteReminder: deleteReminder,
};
//# sourceMappingURL=reminder.js.map