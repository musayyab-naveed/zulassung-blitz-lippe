import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppInhalt } from "./App";

/** Wird nur beim Build genutzt: liefert das fertige HTML einer Seite. */
export const render = (url: string) =>
  renderToString(
    <StaticRouter location={url}>
      <AppInhalt />
    </StaticRouter>
  );
