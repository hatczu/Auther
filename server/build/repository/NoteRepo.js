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
exports.NoteRepo = void 0;
const Note_1 = require("../models/Note");
class NoteRepo {
    save(note) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield Note_1.Note.create({
                    name: note.name,
                    description: note.description,
                });
            }
            catch (error) {
                console.log(error);
                throw new Error("Failed to save note!");
            }
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Note_1.Note.findAll();
            }
            catch (error) {
                throw new Error("Failed to fetch all data!");
            }
        });
    }
}
exports.NoteRepo = NoteRepo;
