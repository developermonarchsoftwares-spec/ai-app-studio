import { createFileRoute } from "@tanstack/react-router";
import OpenAI from "openai";
import { CLINIC, HOURS, TREATMENTS, FAQS } from "@/lib/clinic";

const SYSTEM = `You are the friendly front-desk assistant for ${CLINIC.name} in RS Puram, Coimbatore.
Lead doctor: ${CLINIC.doctor}, ${CLINIC.credentials}. Address: ${CLINIC.address}. Phone/WhatsApp: ${CLINIC.phone}. Email: ${CLINIC.email}. Google rating ${CLINIC.rating} from ${CLINIC.reviews} reviews. Walk-ins welcome.
Hours (to be confirmed with the clinic): ${HOURS.map((h) => `${h.day}: ${h.time}`).join("; ")}.
Treatments with indicative prices (always say "indicative, confirmed at your visit"):
${TREATMENTS.map((t) => `- ${t.name}: ${t.price}. ${t.desc}`).join("\n")}
FAQ: ${FAQS.map((f) => `${f.q} ${f.a}`).join(" ")}
Rules: be warm, brief (under 120 words), use simple English (reply in Tamil if the patient writes in Tamil). Never diagnose; for pain, swelling or bleeding suggest visiting soon, and for a severe emergency go to the nearest hospital. Never invent facts not listed. When the patient wants to book, invite them to tap "Book on WhatsApp" or call ${CLINIC.phone}.`;

type Msg = { role: "user" | "assistant"; content: string };

export const Route = createFileRoute("/api/public/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let messages: Msg[];
        try {
          const body = (await request.json()) as { messages?: Msg[] };
          messages = (body.messages ?? [])
            .filter(
              (m) =>
                (m.role === "user" || m.role === "assistant") &&
                typeof m.content === "string",
            )
            .slice(-20)
            .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }));
        } catch {
          return new Response("Bad request", { status: 400 });
        }
        if (
          !messages.length ||
          messages[messages.length - 1]?.role !== "user"
        ) {
          return new Response("Bad request", { status: 400 });
        }

        const apiKey = process.env["OPENAI_API_KEY"];
        if (!apiKey) {
          return new Response("AI assistant is not configured.", {
            status: 503,
          });
        }

        try {
          const client = new OpenAI({ apiKey });
          const stream = await client.chat.completions.create({
            model: "gpt-4o-mini",
            stream: true,
            max_tokens: 300,
            messages: [
              { role: "system", content: SYSTEM },
              ...messages.map((m) => ({
                role: m.role as "user" | "assistant",
                content: m.content,
              })),
            ],
          });

          const enc = new TextEncoder();
          const body = new ReadableStream<Uint8Array>({
            async start(controller) {
              try {
                for await (const chunk of stream) {
                  const delta = chunk.choices[0]?.delta?.content;
                  if (delta) controller.enqueue(enc.encode(delta));
                }
              } catch (err) {
                console.error("chat stream error", err);
                controller.enqueue(
                  enc.encode(
                    "\n\n_Sorry, I lost connection. Please call or WhatsApp us._",
                  ),
                );
              }
              controller.close();
            },
          });

          return new Response(body, {
            headers: { "Content-Type": "text/plain; charset=utf-8" },
          });
        } catch (err) {
          console.error("chat error", err);
          return new Response("The assistant is unavailable right now.", {
            status: 500,
          });
        }
      },
    },
  },
});
