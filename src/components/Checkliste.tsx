import { CheckCircle } from "lucide-react";
import { vorgangChecklists } from "@/content/faqs";

/** Unterlagen-Checkliste für einen Vorgang – Inhalte kommen aus faqs.ts */
const Checkliste = ({ schluessel }: { schluessel: string }) => {
  const liste = vorgangChecklists.find((eintrag) => eintrag.key === schluessel);
  if (!liste) return null;
  return (
    <div>
      <h3 className="mb-3 font-bold text-secondary">{liste.title}</h3>
      <ul className="space-y-2">
        {liste.items.map((punkt) => (
          <li key={punkt} className="flex items-start gap-2 text-sm text-secondary">
            <CheckCircle className="mt-0.5 h-4 w-4 flex-none text-trust-green" />
            <span>{punkt}</span>
          </li>
        ))}
      </ul>
      {liste.hint && <p className="mt-3 text-xs text-muted-foreground">{liste.hint}</p>}
    </div>
  );
};

export default Checkliste;
