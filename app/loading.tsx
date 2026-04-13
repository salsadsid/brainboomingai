export default function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-[60vh] gap-4">
      <div className="pyramid-loader">
        <div className="wrapper">
          <span className="side side1"></span>
          <span className="side side2"></span>
          <span className="side side3"></span>
          <span className="side side4"></span>
          <span className="shadow"></span>
        </div>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400 animate-pulse">
        Loading...
      </p>
    </div>
  );
}
