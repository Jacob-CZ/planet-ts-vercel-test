import ReportError from './report';
export default function ErrorHandler() {
    process.on('uncaughtException', (err) => {
        ReportError(err);
      });
      
      process.on('unhandledRejection', (reason, promise) => {
        ReportError(reason instanceof Error ? reason : new Error(`Promise rejected with value: ${reason}`));
      });
    return 
}