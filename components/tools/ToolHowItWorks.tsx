import type { StepItem } from "./types";

export default function ToolHowItWorks({
  title,
  steps,
}: {
  title: string;
  steps: StepItem[];
}) {
  return (
    <section className="mt-20">
      <h2 className="text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      <ol className="relative mt-8 grid gap-6 md:grid-cols-3">
        {/* Connector, desktop only — drawn behind the numbered markers. */}
        <span
          aria-hidden="true"
          className="absolute left-[16.6%] right-[16.6%] top-5 hidden h-px bg-border md:block"
        />
        {steps.map((step, i) => (
          <li key={step.title} className="relative text-center">
            <span className="relative z-10 mx-auto flex size-10 items-center justify-center rounded-full border border-border bg-card font-mono text-sm font-semibold text-primary">
              {i + 1}
            </span>
            <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
            <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
