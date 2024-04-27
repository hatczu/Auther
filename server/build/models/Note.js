"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Note = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Note = class Note extends sequelize_typescript_1.Model {
};
exports.Note = Note;
Note.VAR_TABLE_NAME = "note";
Note.VAR_ID = "id";
Note.VAR_NAME = "name";
Note.VAR_DESCRIPTION = "description";
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Note.VAR_ID,
    }),
    __metadata("design:type", Number)
], Note.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: Note.VAR_NAME,
    }),
    __metadata("design:type", String)
], Note.prototype, "name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        field: Note.VAR_DESCRIPTION,
    }),
    __metadata("design:type", String)
], Note.prototype, "description", void 0);
exports.Note = Note = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: Note.VAR_TABLE_NAME,
    })
], Note);
