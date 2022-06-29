// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import { createApp } from "https://deno.land/x/servest@v1.3.4/mod.ts";

const app = createApp();

const colores: Array<string> = [];

app.handle("/", async (req) => {
    if (req.method === "POST") {
        const bodyForm = await req.formData();
        const color = bodyForm!.value("name");
        colores.push(color!)
    }
    await req.respond({
      status: 200,
      headers: new Headers({
            "content-type": "text/html; charset=UTF-8",
      }),
      body: ReactDOMServer.renderToString(
        <html>
            <head>
                <meta charSet="utf-8" />
                <title>servest</title>
            </head>
            <body style={{background: "black"}}>
                <b><p style={{color: "white"}}>Ingrese un color (En inglés): </p></b>
                <form action="/" method="post">
                    <input type="text" name="name" placeholder="Color" required/>
                    <input type="submit" value="Enviar" />
                </form>
            </body>
            <ul>
                {colores.map(color => <li key={color}><b><p style={{color: color}}>{color}</p></b></li>)}
            </ul>
        </html> 
      ),
    });
});

app.listen({ port: 8000 });