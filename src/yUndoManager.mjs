import * as Y from "yjs";
import { YMultiDocUndoManager } from "y-utility/y-multidoc-undomanager";

import * as YGleamUndoManager from "./ygleam/y_undo_manager.mjs";

// YUndoManager functions

export function do_new(scope) {
  return new Y.UndoManager(scope.toArray());
}

export function undo(yUndoManager) {
  return yUndoManager.undo();
}

export function redo(yUndoManager) {
  return yUndoManager.redo();
}

export function stopCapturing(yUndoManager) {
  return yUndoManager.stopCapturing();
}

export function clear(yUndoManager) {
  return yUndoManager.clear();
}

export function onStackItemAdded(yUndoManager, cb) {
  return yUndoManager.on("stack-item-added", (event) => {
    const type =
      event.type == "undo"
        ? new YGleamUndoManager.Undo()
        : new YGleamUndoManager.Redo();

    return cb(event.stackItem, type);
  });
}

export function onStackItemUpdated(yUndoManager, cb) {
  return yUndoManager.on("stack-item-updated", (event) => {
    const type =
      event.type == "undo"
        ? new YGleamUndoManager.Undo()
        : new YGleamUndoManager.Redo();

    return cb(event.stackItem, type);
  });
}

export function onStackItemPopped(yUndoManager, cb) {
  return yUndoManager.on("stack-item-popped", (event) => {
    const type =
      event.type == "undo"
        ? new YGleamUndoManager.Undo()
        : new YGleamUndoManager.Redo();

    return cb(event.stackItem, type);
  });
}

export function onStackCleared(yUndoManager, cb) {
  return yUndoManager.on("stack-cleared", (event) => {
    const undoStackCleared = event?.undoStackCleared ?? false;
    const redoStackCleared = event?.redoStackCleared ?? false;

    return cb(undoStackCleared, redoStackCleared);
  });
}

// YMultiDocUndoManager functions

export function multi_doc_new(docs) {
  return new YMultiDocUndoManager(docs.toArray());
}

export function multi_doc_undo(yMultiDocUndoManager) {
  return yMultiDocUndoManager.undo();
}

export function multi_doc_redo(yMultiDocUndoManager) {
  return yMultiDocUndoManager.redo();
}

export function multi_doc_clear(yMultiDocUndoManager) {
  return yMultiDocUndoManager.clear();
}

export function multi_doc_stop_capturing(yMultiDocUndoManager) {
  return yMultiDocUndoManager.stopCapturing();
}

export function multi_doc_add_doc(yMultiDocUndoManager, doc) {
  return yMultiDocUndoManager.addDoc(doc);
}

export function multi_doc_remove_doc(yMultiDocUndoManager, doc) {
  return yMultiDocUndoManager.removeDoc(doc);
}

export function multi_doc_add_scope(yMultiDocUndoManager, scope) {
  return yMultiDocUndoManager.addScope(scope.toArray());
}

export function multi_doc_add_to_scope(yMultiDocUndoManager, scope) {
  return yMultiDocUndoManager.addToScope(scope);
}
