import { CheckCircle2, XCircle } from "lucide-react";

interface Props {
  inclusions: string | null;
  exclusions: string | null;
}

function parseItems(text: string | null) {
  if (!text) return [];

  return text
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export default function PackageInclusions({
  inclusions,
  exclusions,
}: Props) {
  const includedItems = parseItems(inclusions);
  const excludedItems = parseItems(exclusions);

  if (
    includedItems.length === 0 &&
    excludedItems.length === 0
  ) {
    return null;
  }

  return (
    <section className="bg-white rounded-2xl shadow-sm p-8">

      <h2 className="text-2xl font-bold mb-8">
        What's Included
      </h2>

      <div className="grid lg:grid-cols-2 gap-8">

        <div>
          <h3 className="text-lg font-semibold text-emerald-700 mb-5">
            Included
          </h3>

          <div className="space-y-4">
            {includedItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
              >
                <CheckCircle2
                  className="text-green-600 mt-0.5 flex-shrink-0"
                  size={20}
                />

                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-red-600 mb-5">
            Not Included
          </h3>

          <div className="space-y-4">
            {excludedItems.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
              >
                <XCircle
                  className="text-red-500 mt-0.5 flex-shrink-0"
                  size={20}
                />

                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </section>
  );
}