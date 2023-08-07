"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  StreamInput: () => StreamInput,
  StreamOutput: () => StreamOutput
});
module.exports = __toCommonJS(src_exports);
var import_net = __toESM(require("net"));
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var counter = 0;
var UnixStream = class {
  static {
    __name(this, "UnixStream");
  }
  constructor(stream, onSocket) {
    if (process.platform === "win32") {
      const pipePrefix = "\\\\.\\pipe\\";
      const pipeName = `node-webrtc.${++counter}.sock`;
      this.socketPath = import_path.default.join(pipePrefix, pipeName);
      this.url = this.socketPath;
    } else {
      this.socketPath = "./" + ++counter + ".sock";
      this.url = "unix:" + this.socketPath;
    }
    try {
      import_fs.default.statSync(this.socketPath);
      import_fs.default.unlinkSync(this.socketPath);
    } catch (err) {
    }
    const server = import_net.default.createServer(onSocket);
    stream.on("finish", () => {
      server.close();
    });
    server.listen(this.socketPath);
  }
};
function StreamInput(stream) {
  return new UnixStream(stream, (socket) => stream.pipe(socket));
}
__name(StreamInput, "StreamInput");
function StreamOutput(stream) {
  return new UnixStream(stream, (socket) => socket.pipe(stream));
}
__name(StreamOutput, "StreamOutput");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StreamInput,
  StreamOutput
});
//# sourceMappingURL=index.js.map