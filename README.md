# fluent-ffmpeg-multistream-ts

This is a fork of https://github.com/dank074/fluent-ffmpeg-multistream-ts

## Installation
```
npm install @aikochan2k6/fluent-ffmpeg-multistream-ts
```

## Usage

```javascript
const ffmpeg = require('fluent-ffmpeg')
const { StreamInput, StreamOutput } = require('@aikochan2k6/fluent-ffmpeg-multistream-ts')

ffmpeg()
  .input(StreamInput(readableStream1).url)
  .input(StreamInput(readableStream2).url)
  .output(StreamOutput(writableStream1).url)
  .output(StreamOutput(writableStream2).url)
```

