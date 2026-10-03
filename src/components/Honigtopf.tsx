import { forwardRef } from "react";

/**
 * Unsichtbares Lockfeld gegen Spam-Programme: Menschen sehen es nicht und kommen per Tab-Taste nicht hinein,
 * Programme füllen es meist aus – solche Anfragen verwirft /api/lead, ohne eine E-Mail zu schicken.
 */
const Honigtopf = forwardRef<HTMLInputElement>((_props, ref) => (
  <div
    aria-hidden="true"
    style={{ position: "absolute", left: "-10000px", top: "auto", width: 1, height: 1, overflow: "hidden" }}
  >
    <label>
      Dieses Feld bitte leer lassen
      <input ref={ref} type="text" name="zusatz" tabIndex={-1} autoComplete="off" defaultValue="" />
    </label>
  </div>
));
Honigtopf.displayName = "Honigtopf";

export default Honigtopf;
