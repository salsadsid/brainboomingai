import type { FeatureItem } from "./types";

export default function ToolFeatures({
  title,
  features,
}: {
  title: string;
  features: FeatureItem[];
}) {
  return (
    <section className="mt-20">
      <h2 className="text-center text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {title}
      </h2>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="rounded-xl border border-border bg-card p-5"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
