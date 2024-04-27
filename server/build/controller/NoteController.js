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
Object.defineProperty(exports, "__esModule", { value: true });
const Note_1 = require("../models/Note");
const NoteRepo_1 = require("../repository/NoteRepo");
class NoteController {
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description } = req.body;
                const new_note = new Note_1.Note();
                new_note.name = name;
                new_note.description = description;
                yield new NoteRepo_1.NoteRepo().save(new_note);
                return res.status(200).json({
                    status: "Ok!",
                    message: "Successfully created note!",
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    status: "Internal server error!",
                    message: "Internal server error!",
                });
            }
        });
    }
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp_data = yield new NoteRepo_1.NoteRepo().getAll();
                return res.status(200).json({
                    status: "Ok!",
                    message: "Successfully fetch all note data!",
                    result: resp_data,
                });
            }
            catch (error) {
                return res.status(500).json({
                    status: "Internal server error!",
                    message: "Internal server error!",
                });
            }
        });
    }
}
exports.default = new NoteController();
