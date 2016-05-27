class SpeechRecognizer {
  constructor(props) {
    this.recognizer = this.initRecognizer(props);
    this.start = this.start.bind(this);
    this.stop = this.stop.bind(this);
    this.abort = this.abort.bind(this);
  }

  initRecognizer({onEnd, onError, onResult, onStart, continuous}) {
    const recognizer = new window.webkitSpeechRecognition();

    Object.assign(recognizer, {
      continuous,
      lang: 'es-AR',
      interimResults: true,
      onend: onEnd,
      onerror: onError,
      onresult: result => this.handleOnResult(result, onResult),
      onstart: onStart
    });

    return recognizer;
  }

  handleOnResult(result, cb) {
    if (!result || !result.results) {
      return;
    }
    const recognition = result.results[result.resultIndex];

    cb({
      text: recognition[0].transcript,
      confidence: recognition[0].confidence,
      final: recognition.isFinal
    });
  }

  start() {
    this.recognizer.start();
  }

  stop() {
    this.recognizer.stop();
  }

  abort() {
    this.recognizer.abort();
  }
}

export default SpeechRecognizer;
