async function handleDataAvailable(event:any) {
    console.log("data-available");
    if (event.data.size > 0) {
      setRecordedChunks([...recordedChunks, event.data]);
      console.log(recordedChunks);
      while(recordedChunks.length = 0){
        console.log('recording');
      }
      download();
    } else {
      // …
    }
  }
  function download() {
    const blob = new Blob(recordedChunks, {
      type: "video/webm",
    });
    const url = URL.createObjectURL(blob);
    const a = aRef.current;
    if (a){
    a.href = url;
    a.download = "test.webm";
    a.click();
  }
    if (!(typeof window === 'undefined')) window.URL.revokeObjectURL(url);
  
  }
  Recorder.current?.stop();