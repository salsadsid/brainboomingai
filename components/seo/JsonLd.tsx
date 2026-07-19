/**
 * Emits a JSON-LD structured-data block.
 *
 * Server component: the markup must be present in the initial HTML, because
 * crawlers that parse structured data do not wait for client hydration.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Escaping `<` closes the `</script>` breakout vector; any tool copy that
      // legitimately contains "<" still round-trips, since < is valid JSON.
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
